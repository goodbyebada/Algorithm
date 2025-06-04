//6.39
// 달이 차오른다, 가자.

// .
// # 이동 불가
// 소문자 abcdef 이동 가능  => 열쇠
// 문 대문자 알파벳 대응하는 열쇠가 있어야함
// 0 => start
// -> 1 출구

// N, M 50
// # 이동 불가, 지역 범위 벗어남 이동불가
// 대문자를 마주치면 -> 대응하는 소문자가 있으면 이동 가능
// 소문자는 이동 가능 , 열쇠 주워야함
// 0 출발
// 1이 탈출인데

//비트 마스킹을 이용해 여러개의 열쇠가 있을때

// 1. "a"를 기준으로 fedcba =>543210
// => key c a 둘 다 가지고 있다면 000101
// visited[N][M][key]

// BFS
// 소문자 만날때 visited[N][M][key]
// 대문자를 만나면 key인덱스에 해당 대문자에 대응되는 key가 있는지 & 연산으로 확인
// 1을 만나면 min 값 갱신
// stack이 없을때까지 반복

const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [numbers, ...rest] = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n");

const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

// 소문자만 가능
function isKey(char) {
  return char.charCodeAt(0) >= "a".charCodeAt(0);
}

// 대문자만 가능
function isDoor(char) {
  const nowCharCode = char.charCodeAt(0);
  return "A".charCodeAt(0) <= nowCharCode && nowCharCode <= "F".charCodeAt(0);
}

function bfs(board, startPos, N, M, visited) {
  // key에 대한 정보 함께 담아야함
  //   현재 움직임 정보도 함께

  const stack = [[startPos, 0, 0]];
  let min = Infinity;

  let index = 0;
  while (index < stack.length) {
    const [currentPos, currentLen, currentKey] = stack[index++];

    // 4방향 방문
    // 숫자도 문자열인 상태
    for (let dir of dirs) {
      // 새좌표
      const nx = Number(currentPos[0]) + dir[0];
      const ny = Number(currentPos[1]) + dir[1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

      //   이미 방문했다면
      if (visited[nx][ny][currentKey]) continue;

      const val = board[nx][ny];
      if (val === "#") continue;

      const nowPos = [nx, ny];
      //   일반 .일때
      if (val === "." || val === "0") {
        stack.push([nowPos, currentLen + 1, currentKey]);
        visited[nx][ny][currentKey] = 1;
        continue;
      }

      //   도착지점
      if (val === "1") {
        if (min > currentLen + 1) min = currentLen + 1;
        stack.push([nowPos, currentLen + 1, currentKey]);
        visited[nx][ny][currentKey] = 1;
        continue;
      }

      //    key일때
      if (isKey(val)) {
        // 기존 키와 새로운 키의 | => 여러개 있을 수 있기 때문에

        // 알파벳에 따라 다름
        // a 기준으로  a 이면 0만큼 민다.
        const n = val.charCodeAt(0) - "a".charCodeAt(0);
        const newKey = currentKey | (1 << n);
        stack.push([nowPos, currentLen + 1, newKey]);
        visited[nx][ny][newKey] = 1;
        continue;
      }

      if (isDoor(val)) {
        // 현재 문과 맞는 열쇠가 있는지 확인 해야한다.
        // 있다면 방문 가능
        // 없다면 방문 불 가

        const n = val.charCodeAt(0) - "A".charCodeAt(0);
        const hasKey = currentKey & (1 << n);

        // hasKey >0이라면 해당 키를 가지고 있다.
        if (hasKey) {
          stack.push([nowPos, currentLen + 1, currentKey]);
          visited[nx][ny][currentKey] = 1;
        }
        continue;
      }

      // 문 일때 (대문자라면)
    }
  }

  return min === Infinity ? -1 : min;
}

function getStartPos(board, N, M) {
  for (let row = 0; row <= N; row++) {
    for (let col = 0; col <= M; col++) {
      if (board[row][col] === "0") return [row, col];
    }
  }
}
function sol(numbers, rest) {
  const [N, M] = numbers.split(" ").map(Number);

  const board = rest;

  const visited = Array(N)
    .fill(0)
    .map(() =>
      Array(M)
        .fill(0)
        .map(() => Array(Math.pow(2, 6)))
    );

  const startPos = getStartPos(board, N - 1, M - 1);

  const answer = bfs(board, startPos, N, M, visited);
  console.log(answer);

  // visited 시 1 표시
}
sol(numbers, rest);
