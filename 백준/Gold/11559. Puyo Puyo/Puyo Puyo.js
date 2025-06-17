const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const R = 12;
const C = 6;

const EMPTY = ".";

function show(board) {
  board.forEach((row) => console.log(row.join("")));
}

// 1. 다른 값이 나올때까지 바닥을 하강
function drop(board) {
  // 각 열마다 .을 제외한 뿌요 리스트를 만든다.

  for (let col = 0; col < C; col++) {
    const list = [];
    for (let row = 0; row < R; row++) {
      if (board[row][col] !== EMPTY) list.push(board[row][col]);
    }

    let idx = list.length - 1;

    for (let row = R - 1; row >= 0; row--) {
      if (idx >= 0) board[row][col] = list[idx--];
      else board[row][col] = EMPTY;
    }

    // show(board);
  }
}

// 2. 순회하며 뿌요가 있는지 확인, => 뿌요 같은 색 4개 이상 상하좌우 연결 탐색
// bfs => 하나씩!
function bfs(startX, startY, board) {
  const targetChar = board[startX][startY];
  const visited = Array(R)
    .fill(0)
    .map(() => Array(C).fill(0));

  const stack = [[startX, startY]];
  visited[startX][startY] = 1;

  let index = 0;

  while (index < stack.length) {
    let [r, c] = stack[index++];

    for (let dir of dirs) {
      let cr = r + dir[0];
      let cc = c + dir[1];

      if (cr < 0 || cc < 0 || cr >= R || cc >= C || visited[cr][cc]) continue;
      if (board[cr][cc] === targetChar) {
        visited[cr][cc] = 1;
        stack.push([cr, cc]);
      }
    }
  }

  if (stack.length >= 4) {
    // 4개 이상일때 터트린다.
    pop(board, stack);
    return true;
  }

  //   아니라면 아무 일도 없다..
  return false;
}

// 3. 된다면 터트리기 => 해당 자리 "."으로 바꿔야함
function pop(board, stack) {
  for (let [r, c] of stack) {
    board[r][c] = EMPTY;
  }
}

// 4. 여러 그룹이 발견되어도 1연쇄 +1
// 5. 1로 돌아간다. 뿌요가 발견되지 않을때까지

function sol(input) {
  // 문자열은 immutable 👹
  const board = input.map((line) => line.split(""));
  let answer = 0;

  let cantPop = false;

  while (1) {
    // 초기화
    drop(board);
    cantPop = false;

    // 한 판
    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        // 뿌요찾음
        if (board[row][col] !== EMPTY) {
          // pop 가능함
          if (bfs(row, col, board)) {
            cantPop = true;
          }
        }
      }
    }

    if (!cantPop) break;

    answer++;
  }

  console.log(answer);
}
sol(input);
