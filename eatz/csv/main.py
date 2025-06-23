from fastapi import FastAPI, File, UploadFile, Form, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
import uuid
import tempfile


app = FastAPI(
    title="Eatz Utils API",
    description="Eatz Utils API",
    version="1.0.0"
)

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 실제 배포 환경에서는 특정 도메인으로 제한하세요
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/process_and_download")
async def process_and_download(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    outputFormat: str = Form("csv"),
    eventNo: str = Form(""),
    rewardNm: str = Form(""),
    rewardCd: str = Form(""),
    useYn: str = Form("Y"),
    count: int = Form(10)
):
    temp_files = []  # 정리해야 할 임시 파일 목록
    
    try:
        if not file.filename:
            raise HTTPException(status_code=400, detail="파일이 선택되지 않았습니다.")
        
        # 임시 파일 생성
        temp_path = os.path.join(tempfile.gettempdir(), f"{uuid.uuid4()}_{file.filename}")
        temp_files.append(temp_path)
        
        # 업로드된 파일을 임시 위치에 저장
        with open(temp_path, "wb") as temp_file:
            content = await file.read()
            temp_file.write(content)
        
        # 파일 포인터 위치 초기화
        await file.seek(0)
        
        win_numbers = []
        
        # 파일 형식에 따라 처리
        filename = file.filename.lower()
        try:
            if filename.endswith('.csv'):
                # 다양한 인코딩 시도
                encodings = ['utf-8', 'cp949', 'euc-kr']
                for encoding in encodings:
                    try:
                        df = pd.read_csv(temp_path, encoding=encoding)
                        break
                    except UnicodeDecodeError:
                        continue
                    except Exception as e:
                        print(f"CSV 읽기 오류 (인코딩: {encoding}): {str(e)}")
                        continue
                
                if 'WIN_NO' in df.columns:
                    win_numbers = df['WIN_NO'].dropna().astype(str).tolist()
                else:
                    # 다양한 인코딩으로 헤더 없이 시도
                    for encoding in encodings:
                        try:
                            df = pd.read_csv(temp_path, header=None, encoding=encoding)
                            break
                        except UnicodeDecodeError:
                            continue
                        except Exception as e:
                            print(f"헤더 없는 CSV 읽기 오류 (인코딩: {encoding}): {str(e)}")
                            continue
                    
                    if len(df.columns) > 1:
                        win_numbers = df.iloc[:, 1].dropna().astype(str).tolist()
            
            elif filename.endswith(('.xlsx', '.xls')):
                df = pd.read_excel(temp_path)
                if 'WIN_NO' in df.columns:
                    win_numbers = df['WIN_NO'].dropna().astype(str).tolist()
                else:
                    df = pd.read_excel(temp_path, header=None)
                    if len(df.columns) > 1:
                        win_numbers = df.iloc[:, 1].dropna().astype(str).tolist()
            
            else:  # .txt 파일 등
                # 다양한 인코딩 시도
                encodings = ['utf-8', 'cp949', 'euc-kr']
                file_content = None
                
                for encoding in encodings:
                    try:
                        with open(temp_path, 'r', encoding=encoding) as f:
                            file_content = f.read()
                            break
                    except UnicodeDecodeError:
                        continue
                    except Exception as e:
                        print(f"텍스트 파일 읽기 오류 (인코딩: {encoding}): {str(e)}")
                        continue
                
                if file_content:
                    lines = [line.strip() for line in file_content.splitlines() if line.strip()]
                    if lines and "WIN_NO" in lines[0]:
                        delimiter = '\t' if '\t' in lines[0] else ','
                        data = [line.split(delimiter) for line in lines[1:]]
                        header = lines[0].split(delimiter)
                        win_no_idx = header.index("WIN_NO") if "WIN_NO" in header else 1
                        win_numbers = [row[win_no_idx] for row in data if len(row) > win_no_idx]
                    else:
                        data = [line.split() for line in lines]
                        if data and len(data[0]) > 1:
                            win_numbers = [row[1] for row in data if len(row) > 1]
                        
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"파일 처리 중 오류가 발생했습니다: {str(e)}")
        
        # 필요한 데이터 수 조정
        if not win_numbers:
            raise HTTPException(status_code=400, detail="파일에서 WIN_NO 데이터를 추출할 수 없습니다.")
        
        count = min(count, len(win_numbers))
        
        # 데이터프레임 생성
        df = pd.DataFrame({
            'EVENT_NO': [eventNo] * count,
            'WIN_NO': win_numbers[:count],
            'REWARD_NM': [rewardNm] * count,
            'REWARD_CD': [rewardCd] * count,
            'USE_YN': [useYn] * count
        })
        
        # 출력 파일 생성
        file_uuid = uuid.uuid4()
        temp_dir = tempfile.gettempdir()
        
        if outputFormat.lower() == 'xlsx':
            output_path = os.path.join(temp_dir, f"{file_uuid}_output.xlsx")
            df.to_excel(output_path, index=False)
            download_name = "generated_data.xlsx"
            mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        else:  # CSV 형식 (기본값)
            output_path = os.path.join(temp_dir, f"{file_uuid}_output.csv")
            df.to_csv(output_path, index=False)
            download_name = "generated_data.csv"
            mimetype = 'text/csv'
        
        temp_files.append(output_path)
        
        # 임시 파일 정리 함수
        def cleanup():
            for temp_file in temp_files:
                try:
                    if os.path.exists(temp_file):
                        os.remove(temp_file)
                except Exception as e:
                    print(f"파일 삭제 중 오류 발생: {e}")
        
        # 배경 태스크로 정리 함수 추가
        background_tasks.add_task(cleanup)
        
        # 파일 직접 다운로드 제공
        return FileResponse(
            path=output_path,
            filename=download_name,
            media_type=mimetype
        )
    
    except HTTPException as e:
        # 임시 파일 정리
        for temp_file in temp_files:
            try:
                if os.path.exists(temp_file):
                    os.remove(temp_file)
            except:
                pass
        raise e
    except Exception as e:
        # 임시 파일 정리
        for temp_file in temp_files:
            try:
                if os.path.exists(temp_file):
                    os.remove(temp_file)
            except:
                pass
        raise HTTPException(status_code=500, detail=f"데이터 생성 중 오류가 발생했습니다: {str(e)}")
    
    
# 영양성분 excel 받아서 html로 변환하는 API  
@app.post("/api/gradient")
async def gradient(
    file: UploadFile = File(...),
    outputFormat: str = Form("html")
):
    pass


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)