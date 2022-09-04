import React, { useMemo } from "react";
import styled from "styled-components";

interface Props {
  totalPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  split: number;
  jump: number;
}

function Pagination({
  totalPage,
  currentPage,
  setCurrentPage,
  split,
  jump,
}: Props) {
  const PageMode = {
    front: {
      start: 0,
      end: split,
    },
    back: {
      start: totalPage - split,
      end: totalPage,
    },
    middle: {
      start: currentPage - 3,
      end: currentPage + split - 3,
    },
  };

  const currentMode = (currentPage: number) => {
    if (currentPage <= 3) return "front";
    if (currentPage >= 7 && currentPage >= totalPage - 2) return "back";
    return "middle";
  };

  const { start, end } = PageMode[currentMode(currentPage)];

  const makeButtons = (totalPage: number) => {
    console.log("렌더링");
    let ButtonsNumArr = [];
    for (let i = 1; i < totalPage + 1; i++) {
      ButtonsNumArr.push(i);
    }
    return ButtonsNumArr;
  };

  const ButtonsNumArr = useMemo(() => {
    return makeButtons(totalPage);
  }, [totalPage]);

  return (
    <div>
      <Button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage <= 1 ? true : false}
      >
        {"<<"}
      </Button>
      <Button
        onClick={() => {
          if (currentPage - jump <= 1) {
            setCurrentPage(1);
          } else setCurrentPage(currentPage - jump);
        }}
        disabled={currentPage <= 1 ? true : false}
      >
        {"<"}
      </Button>
      {ButtonsNumArr.slice(start, end).map((num, i) => (
        <Button
          key={num}
          aria-current={currentPage === num ? "page" : null}
          onClick={() => {
            setCurrentPage(num);
          }}
        >
          {num}
        </Button>
      ))}
      <Button
        onClick={() => {
          if (currentPage + jump >= totalPage) {
            setCurrentPage(totalPage);
          } else {
            setCurrentPage(currentPage + jump);
          }
        }}
        disabled={currentPage >= totalPage ? true : false}
      >
        {">"}
      </Button>
      <Button
        onClick={() => setCurrentPage(totalPage)}
        disabled={currentPage >= totalPage ? true : false}
      >
        {">>"}
      </Button>
    </div>
  );
}

export default Pagination;

const Button = styled.button<{ [key: string]: any }>`
  border: none;
  border-radius: 4px;
  padding: 8px;
  margin: 0;
  color: black;
  font-size: 1rem;
  border: solid 1px lightgray;

  &:hover {
    background: skyblue;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: skyblue;
    color: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
