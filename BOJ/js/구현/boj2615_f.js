/**
 * 오목
 * 대각선을 어떻게 처리해야할지 모르겠심더
 */
const board = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((elem) => elem.split(" "));

//   시계방향 상우하좌
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
const blackResult = [];
const whiteResult = [];

for (let i = 0; i < 19; i++) {
  for (let j = 0; j < 19; j++) {
    if (board[i][j] !== "0") {
      DFS(i, j, board[i][j]);
    }
  }
}

console.log(blackResult);
console.log(whiteResult);

/**
 * 0이 아닌 숫자가 있다면 시계방향탐색을 한다.
 * 상부터 탐색을 한다.
 * 0이 나온다면 방향을 바꾼다.
 * 숫자가 5개가 넘어간다면 방향을 바꾼다.
 * 만난 숫자와 다르다면 다시 처음으로 돌아온다.
 * 만난 숫자와 같은 숫자의 개수가가 5개라면 승패를 내린다.
 *
 */

function DFS(nx, ny, val) {
  for (let i = 0; i < 4; i++) {
    let mx = nx + dx[i];
    let my = ny + dy[i];
    let pos = [];

    console.log(`dir: ${i}`);

    while (1) {
      if (mx < 0 || my < 0 || mx >= 19 || my >= 19) break;
      if (board[mx][my] === "0" || board[mx][my] !== val) break;

      pos.push([mx, my]);
      mx += dx[i];
      my += dy[i];

      console.log(pos);

      if (pos.length >= 6) break;
    }

    if (pos.length === 5) {
      //   가장 왼쪽
      //   다섯개의 바둑알 중 가장 왼쪽 + 가장 위쪽
      pos.sort((a, b) => {
        if (a[0] === b[0]) {
          return a[1] - b[1];
        } else {
          return a[0] - b[0];
        }
      });

      console.log(pos);
      val === "1" ? blackResult.push(pos[0]) : whiteResult.push(pos[0]);
    }
  }
}

function checkDiagonalLeft(nx, ny, val) {
  let pos = [];
  let dir = [-1, 1];
  let mx = nx;
  let my = ny;
  // 왼 -> 오른

  for (let i of dir) {
    while (1) {
      if (mx < 0 || my < 0 || mx >= 19 || my >= 19) break;
      if (board[mx][my] === "0" || board[mx][my] !== val) break;

      pos.push([mx, my]);
      mx += i;
      my += i;
      if (pos.length >= 5) return;
    }
  }
}

function checkDiagonalRight(nx, ny, val) {
  let pos = [];
  let res = Math.abs(nx - ny);
  let dir = [-1, 1];
  let mx = nx;
  let my = my;
  // 왼 -> 오른

  for (let i of dir) {
    while (1) {
      if (mx < 0 || my < 0 || mx >= 19 || my >= 19) break;
      if (board[mx][my] === "0" || board[mx][my] !== val) break;

      pos.push([mx, my]);
      mx += i;
      my = abs - mx;
      if (pos.length >= 5) return;
    }
  }
}
