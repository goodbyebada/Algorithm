/**
 * 배열돌리기
 * 실버 1
 * 10:38~
 *
 *
 *
 * t 테스트 케이스
 * n  배열의 크기 d 각도
 *
 */

const diag = (origin, n) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(origin[i][i]);
  }
  return result;
};
const midCol = (origin, n) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(origin[i][Math.floor(n / 2)]);
  }
  return result;
};

const rightDiag = (origin, n) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(origin[i][n - i - 1]);
  }
  return result;
};
const midRow = (origin, n) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(origin[Math.floor(n / 2)][i]);
  }
  return result;
};

// 반대방향이라면 dir에 n-1이 들어가야함, 아니라면 0
const newDiag = (origin, board, dir, n) => {
  for (let i = 0; i < n; i++) {
    let pos = (dir - i + n) % n;
    board[pos][pos] = origin[i];
  }
  return board;
};

const newMidCol = (origin, board, dir, n) => {
  let mid = Math.floor(n / 2);
  for (let i = 0; i < n; i++) {
    let pos = (dir - i + n) % n;
    board[pos][mid] = origin[i];
  }
  return board;
};

// 반대방향이라면 dir에 n-1이 들어가야함, 아니라면 0
const newRightDiag = (origin, board, dir, n) => {
  for (let i = 0; i < n; i++) {
    let pos = (dir - i + n) % n;
    board[n - 1 - pos][pos] = origin[i];
  }
  return board;
};

const newMidRow = (origin, board, dir, n) => {
  let mid = Math.floor(n / 2);
  for (let i = 0; i < n; i++) {
    let pos = (dir - i + n) % n;
    board[mid][pos] = origin[i];
  }
  return board;
};

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input.shift());

for (let i = 0; i < T; i++) {
  let [n, d] = input.shift().split(" ").map(Number);

  const localInput = input.splice(0, n);
  const origin = makeBoard(localInput, n);
  let board = [...origin];

  let index = ((d + 360) % 360) / 45;

  board = changeDir(origin, board, index, n);
  console.log(board.map((elem) => elem.join(" ")).join("\n"));

  console.log("   ");
}

function makeBoard(input, n) {
  const originBoard = [];

  for (let i = 0; i < n; i++) {
    originBoard.push(input.shift().split(" ").map(Number));
  }

  return originBoard;
}

function changeDir(orign, board, index, n) {
  if (!index) {
    return board;
  }

  const originFunctionList = [diag, midCol, rightDiag, midRow];
  const functionsList = [newDiag, newMidCol, newMidRow, newRightDiag];

  let id = index;
  let functionIdx = index;

  for (let cnt = 0; cnt < 4; cnt++) {
    const list = originFunctionList[cnt](orign, n);
    let dir = id < 4 ? 0 : n - 1;

    console.log(functionIdx);
    board = functionsList[functionIdx](list, board, dir, n);
    functionIdx = functionIdx++ % 4;
    id = id++ % 8;
  }

  return board;
}
