const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [M, N] = input[0].split(" ").map(Number); // M: 가로, N: 세로
const map = input.slice(1).map((row) => row.split("").map(Number));

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function bfs() {
  // visited[r][c] = 지금까지 벽 부순 최소 횟수
  const visited = Array.from({ length: N }, () => Array(M).fill(Infinity));
  const deque = [[0, 0, 0]]; // [row, col, 부순벽횟수]
  visited[0][0] = 0;

  while (deque.length) {
    const [r, c, cnt] = deque.shift();

    if (r === N - 1 && c === M - 1) return cnt; // 목표 도착

    for (let [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;

      const nextCnt = cnt + map[nr][nc]; // 벽이면 +1

      if (visited[nr][nc] > nextCnt) {
        visited[nr][nc] = nextCnt;

        if (map[nr][nc] === 1) {
          // 벽이면 뒤로
          deque.push([nr, nc, nextCnt]);
        } else {
          // 빈칸이면 앞으로
          deque.unshift([nr, nc, nextCnt]);
        }
      }
    }
  }
}

console.log(bfs());
