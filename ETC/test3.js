/**
 * 1번 타일의 영역 개수 및 최대 넓이를 구해야한다.
 * 0,0번 타일부터 시작해서 1로 되어있을 경우 탐색 가능, 방문을 안했을 경우 탐색 가능
 * 만약 탐색 가능하면 width값을 구하기 위해서 현재 width값을 1로 설정 후 dfs에 넣어준다.
 * dfs 내에서는 좌우 탐색을 하면서 유효한 범위면서 아직 방문하지 않은 곳이라면 재귀함수를 통해서 탐색하도록 한다.
 * 더 이상 움직일 수 있는 영역이 없다면 현재 width값을 리턴한다.
 */

function solution(v) {
  let answer_count = 0;
  let answer_width = 0;

  const rows = v.length;
  const cols = v[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  const d_row = [0, 0, 1, -1];
  const d_col = [1, -1, 0, 0];

  const dfs = (row, col, width) => {
    visited[row][col] = true;

    for (let i = 0; i < 4; i++) {
      const move_row = d_row[i] + row;
      const move_col = d_col[i] + col;

      if (
        move_row >= 0 &&
        move_row < rows &&
        move_col >= 0 &&
        move_col < cols &&
        !visited[move_row][move_col] &&
        v[move_row][move_col] === 1
      ) {
        dfs(move_row, move_col, width + 1);
      }
    }

    answer_width = Math.max(answer_width, width);

    return;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!visited[row][col] && v[row][col] === 1) {
        dfs(row, col, 1);
        answer_count++;
      }
    }
  }

  return [answer_count, answer_width];
}

const result = solution([
  [1, 1, 0, 1, 1],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1],
]);

console.log("1로 이루어진 영역의 개수:", result[0]);
console.log("각 영역의 최대 너비:", result[1]);
