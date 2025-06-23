from flask import Flask, render_template, request, send_file, jsonify
import pandas as pd
import os
import io
import tempfile
import uuid
import atexit
import time
import shutil
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = tempfile.gettempdir()
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB 제한

# 임시 파일 저장을 위한 메모리 디렉토리
# 메모리상에 임시 저장소 활용 (tempfile 모듈 사용)
TEMP_SESSION_DATA = {}  # 세션 ID를 키로 하고 데이터를 값으로 저장하는 딕셔너리

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"success": False, "message": "파일이 업로드되지 않았습니다."})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"success": False, "message": "파일이 선택되지 않았습니다."})
    
    try:
        # 안전한 파일명으로 변환하고 임시 저장
        filename = secure_filename(file.filename)
        temp_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{uuid.uuid4()}_{filename}")
        file.save(temp_path)
        
        win_numbers = []
        try:
            # 파일 형식에 따라 처리
            if filename.lower().endswith('.csv'):
                df = pd.read_csv(temp_path)
                if 'WIN_NO' in df.columns:
                    win_numbers = df['WIN_NO'].dropna().astype(str).tolist()
                else:
                    df = pd.read_csv(temp_path, header=None)
                    win_numbers = df.iloc[:, 1].dropna().astype(str).tolist()
            
            elif filename.lower().endswith(('.xlsx', '.xls')):
                df = pd.read_excel(temp_path)
                if 'WIN_NO' in df.columns:
                    win_numbers = df['WIN_NO'].dropna().astype(str).tolist()
                else:
                    df = pd.read_excel(temp_path, header=None)
                    win_numbers = df.iloc[:, 1].dropna().astype(str).tolist()
            
            else:  # .txt 파일 등
                with open(temp_path, 'r', encoding='utf-8') as f:
                    lines = [line.strip() for line in f if line.strip()]
                    if lines and "WIN_NO" in lines[0]:
                        delimiter = '\t' if '\t' in lines[0] else ','
                        data = [line.split(delimiter) for line in lines[1:]]
                        header = lines[0].split(delimiter)
                        win_no_idx = header.index("WIN_NO") if "WIN_NO" in header else 1
                        win_numbers = [row[win_no_idx] for row in data if len(row) > win_no_idx]
                    else:
                        data = [line.split() for line in lines]
                        win_numbers = [row[1] for row in data if len(row) > 1]
        finally:
            # 임시 파일 처리가 끝난 후 반드시 삭제
            if os.path.exists(temp_path):
                os.remove(temp_path)
        
        # 메모리에 데이터 저장
        session_id = str(uuid.uuid4())
        TEMP_SESSION_DATA[session_id] = {
            'win_numbers': win_numbers,
            'timestamp': time.time()
        }
        
        return jsonify({
            "success": True,
            "message": f"{len(win_numbers):,}개의 WIN_NO 데이터가 로드되었습니다.",
            "count": len(win_numbers),
            "session_id": session_id,
            "preview": win_numbers[:10]
        })
    
    except Exception as e:
        # 오류 발생 시에도 임시 파일 삭제 보장
        if 'temp_path' in locals() and os.path.exists(temp_path):
            os.remove(temp_path)
        return jsonify({"success": False, "message": f"파일 처리 중 오류가 발생했습니다: {str(e)}"})

@app.route('/generate', methods=['POST'])
def generate_data():
    try:
        data = request.json
        session_id = data.get('session_id')
        output_format = data.get('outputFormat', 'csv')
        
        # WIN_NO 생성 방식에 따른 처리
        if data.get('winNoType') == 'file' and session_id:
            # 메모리에서 WIN_NO 가져오기
            session_data = TEMP_SESSION_DATA.get(session_id)
            if not session_data:
                return jsonify({"success": False, "message": "세션이 만료되었습니다. 파일을 다시 업로드해주세요."})
            
            win_numbers = session_data['win_numbers']
        elif data.get('winNoType') == 'sequential':
            start_number = int(data.get('startNumber', 1))
            count = int(data.get('count', 10))
            win_numbers = [str(start_number + i) for i in range(count)]
        elif data.get('winNoType') == 'prefix':
            prefix = data.get('prefix', '')
            digit_count = int(data.get('digitCount', 3))
            count = int(data.get('count', 10))
            win_numbers = [f"{prefix}{str(i+1).zfill(digit_count)}" for i in range(count)]
        else:
            return jsonify({"success": False, "message": "유효하지 않은 WIN_NO 생성 방식입니다."})
        
        # 데이터 생성에 필요한 파라미터
        event_no = data.get('eventNo', '')
        reward_nm = data.get('rewardNm', '')
        reward_cd = data.get('rewardCd', '')
        use_yn = data.get('useYn', 'Y')
        count = min(int(data.get('count', 10)), len(win_numbers))
        
        # 데이터프레임 생성
        df = pd.DataFrame({
            'EVENT_NO': [event_no] * count,
            'WIN_NO': win_numbers[:count],
            'REWARD_NM': [reward_nm] * count,
            'REWARD_CD': [reward_cd] * count,
            'USE_YN': [use_yn] * count
        })
        
        # 임시 디렉토리에 파일 저장
        file_uuid = uuid.uuid4()
        temp_dir = tempfile.gettempdir()  # 시스템 임시 디렉토리 사용
        
        if output_format.lower() == 'xlsx':
            output_path = os.path.join(temp_dir, f"{file_uuid}_output.xlsx")
            df.to_excel(output_path, index=False)
            download_name = "generated_data.xlsx"
            mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        else:  # CSV 형식 (기본값)
            output_path = os.path.join(temp_dir, f"{file_uuid}_output.csv")
            df.to_csv(output_path, index=False)
            download_name = "generated_data.csv"
            mimetype = 'text/csv'
        
        return jsonify({
            "success": True,
            "message": f"{count:,}개의 데이터가 생성되었습니다.",
            "file_path": output_path,
            "download_url": f"/download?file={os.path.basename(output_path)}&name={download_name}&type={mimetype}&temp_dir={temp_dir}"
        })
    
    except Exception as e:
        return jsonify({"success": False, "message": f"데이터 생성 중 오류가 발생했습니다: {str(e)}"})

@app.route('/download')
def download_file():
    file_name = request.args.get('file')
    download_name = request.args.get('name', 'generated_data.csv')
    mimetype = request.args.get('type', 'text/csv')
    temp_dir = request.args.get('temp_dir', tempfile.gettempdir())
    
    if not file_name:
        return "파일이 지정되지 않았습니다.", 400
    
    file_path = os.path.join(temp_dir, file_name)
    if not os.path.exists(file_path):
        return "파일을 찾을 수 없습니다.", 404
    
    # 데코레이터 없이 파일을 전송하고, 응답 후에 파일을 삭제하는 일회용 함수 생성
    def remove_file_after_request(response):
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"파일 삭제 중 오류 발생: {e}")
        return response
    
    # 파일 다운로드 응답 생성
    response = send_file(
        file_path,
        as_attachment=True,
        download_name=download_name,
        mimetype=mimetype
    )
    
    # 응답 후 파일 삭제 함수 등록
    response.call_on_close(lambda: remove_file_after_request(response))
    
    return response

# 세션 데이터 정리 함수
def cleanup_session_data():
    current_time = time.time()
    expired_sessions = []
    
    for session_id, data in TEMP_SESSION_DATA.items():
        # 1시간 이상 지난 세션 데이터 삭제
        if current_time - data['timestamp'] > 3600:
            expired_sessions.append(session_id)
    
    for session_id in expired_sessions:
        TEMP_SESSION_DATA.pop(session_id, None)

# 1시간마다 세션 정리 작업 실행
def schedule_cleanup():
    import threading
    cleanup_session_data()
    threading.Timer(3600, schedule_cleanup).start()

# 앱 시작 시 세션 정리 스케줄러 시작
schedule_cleanup()

if __name__ == '__main__':
    app.run(debug=True)