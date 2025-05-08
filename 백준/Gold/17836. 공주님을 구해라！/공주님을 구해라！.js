const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [nmt, ...input] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, m, t] = nmt.split(" ").map(Number);
const graph = [new Array(m + 1).fill(1)];
for (let i = 0; i < n; i++) {
  graph.push([1, ...input[i].split(" ").map(Number), 1]);
}
graph.push(new Array(m + 1).fill(1));

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];
const queue = [];
let head = 0;

const bfs = () => {
  let minTime = Infinity;
  queue.push([1, 1, 0]);
  graph[1][1] = 1;

  while (queue.length > head) {
    const [y, x, time] = queue[head++];
    if (time >= t) {
      if (minTime <= t) return minTime;
      else return "Fail";
    }

    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (ny == n && nx == m) return Math.min(minTime, time + 1);

      if (graph[ny][nx] == 1) continue;

      if (graph[ny][nx] == 2)
        minTime = time + 1 + Math.abs(n - ny) + Math.abs(m - nx);

      queue.push([ny, nx, time + 1]);
      graph[ny][nx] = 1;
    }
  }
  if (minTime <= t) return minTime;
  else return "Fail";
};

console.log(bfs());