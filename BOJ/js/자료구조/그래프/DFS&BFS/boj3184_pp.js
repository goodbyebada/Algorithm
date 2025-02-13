const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [r, c] = input[0].split(" ").map(Number);
const board = input.splice(1).map((elem) => elem.split(""));
const visited = Array.from(Array(r), () => Array(c).fill(false));

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let oCnt = 0;
let vCnt = 0;

for (let row = 0; row < r; row++) {
  for (let col = 0; col < c; col++) {
    if (visited[row][col]) continue;

    const [o, v] = DFS(row, col);

    oCnt += o;
    vCnt += v;
  }
}

console.log(oCnt, vCnt);

function DFS(initX, initY) {
  const stack = [];
  let oCnt = 0;
  let vCnt = 0;

  stack.push([initX, initY]);

  while (stack.length !== 0) {
    const [currX, currY] = stack.pop();
    if (visited[currX][currY]) continue;

    // 📌` 처음에 dir 바꿀때 이 로직을 넣어 중복으로 세어졌다. DFS일때는 pop할때 visited 체크,val 체크를 해야한다.
    if (board[currX][currY] === "o") {
      oCnt++;
    }
    if (board[currX][currY] === "v") vCnt++;

    visited[currX][currY] = true;

    for (let dir = 0; dir < 4; dir++) {
      let mx = currX + dx[dir];
      let my = currY + dy[dir];

      if (mx < 0 || my < 0 || mx >= r || my >= c) continue;
      if (visited[mx][my]) {
        continue;
      }

      if (board[mx][my] === "#") continue;

      stack.push([mx, my]);
    }
  }

  if (oCnt > vCnt) {
    vCnt = 0;
  } else {
    oCnt = 0;
  }

  return [oCnt, vCnt];
}
