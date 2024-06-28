/**
 * 1. 각 경로간의 관계를 표현한다.
 * 2. 각 경로의 하위 path가 뭐가 있는지 만든다.
 * 2. 만들어진 path를 이용해서 root로 부터 시작해서 하위 경로가 있는 경우 하위 경로를 돌면서 길이를 더한다.
 * 3. 더이상 하위 경로가 없는 경우 Math.max를 사용해서 최대값으로 업데이트한다.
 */

function makePath(relation, dirname) {
  const path = {};

  for (let i = 0; i < relation.length; i++) {
    const parent_name_idx = relation[i][0] - 1;
    const child_name_idx = relation[i][1] - 1;

    const parent_name = dirname[parent_name_idx];
    const child_name = dirname[child_name_idx];

    if (!path[parent_name]) {
      path[parent_name] = [child_name];
    } else {
      path[parent_name].push(child_name);
    }
  }

  return path;
}

function solution(N, relation, dirname) {
  var answer = 0;
  const path = makePath(relation, dirname);

  console.log(path);

  const dfs = (parent_name, str_path) => {
    if (!path[parent_name] || path[parent_name].length === 0) {
      console.log(str_path);
      answer = Math.max(answer, str_path.length);
      return;
    }

    for (let i = 0; i < path[parent_name].length; i++) {
      dfs(path[parent_name][i], str_path + "/" + path[parent_name][i]);
    }
  };

  dfs("root", "root");

  return answer;
}
console.log(
  solution(
    7,
    [
      [1, 2],
      [2, 5],
      [2, 6],
      [1, 3],
      [1, 4],
      [3, 7],
    ],
    ["root", "abcd", "cs", "hello", "etc", "hello", "solution"]
  )
);

console.log(
  solution(
    7,
    [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [1, 6],
      [6, 7],
    ],
    ["root", "a", "b", "c", "d", "efghij", "k"]
  )
);
