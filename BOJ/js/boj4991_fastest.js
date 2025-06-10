const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const answer = [];

class Queue {
  items = [];
  start = 0;
  end = 0;

  push(value) {
    this.items.push(value);
    this.end++;
  }

  pop() {
    return this.items[this.start++];
  }

  isEmpty() {
    return this.start === this.end;
  }
}

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function BFS(startX, startY, w, h, graph) {
  const q = new Queue();

  //   visited에 dist를 누적한다.

  const visited = Array.from({ length: h }, () => Array(w).fill(-1));
  q.push([startX, startY]);
  visited[startX][startY] = 0;

  while (!q.isEmpty()) {
    const [x, y] = q.pop();

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + path[i][0], y + path[i][1]];

      //   방문하지 않았고, 방해물이 없다면
      if (
        0 <= nx &&
        nx < h &&
        0 <= ny &&
        ny < w &&
        graph[nx][ny] !== "x" &&
        visited[nx][ny] === -1
      ) {
        q.push([nx, ny]);
        visited[nx][ny] = visited[x][y] + 1;
      }
    }
  }

  return visited;
}

while (true) {
  const [w, h] = input.shift().split(" ").map(Number);
  if (w === 0 && h === 0) break;

  const graph = [];
  const dust = [];
  let [startX, startY] = [0, 0];

  for (let i = 0; i < h; i++) {
    graph.push(input.shift().split(""));
    for (let j = 0; j < w; j++) {
      if (graph[i][j] === "*") {
        dust.push([i, j]);
      } else if (graph[i][j] === "o") {
        [startX, startY] = [i, j];
      }
    }
  }

  // 로청 +  더러운 곳들 좌표
  const points = [[startX, startY], ...dust];

  //   모든 필요한 좌표들 사이의 거리 (N*N MAP)
  const distMap = Array.from({ length: points.length }, () =>
    Array(points.length).fill(Infinity)
  );

  // 거리 미리 계산
  let impossible = false;
  for (let i = 0; i < points.length; i++) {
    const [sx, sy] = points[i];

    // W*H 배열
    const visited = BFS(sx, sy, w, h, graph);

    // 거리 확인하며 impossible인지 확인, 가능하다면 distMap에 갱신
    for (let j = 0; j < points.length; j++) {
      // 확인해야하는 곳 거리 갱신
      const [ex, ey] = points[j];
      const d = visited[ex][ey];

      if (d === -1) {
        impossible = true;
        break;
      } else distMap[i][j] = d;
    }
  }

  //   ⛑️ 한 곳 못가면 전부 못 가니까 바로 답 출력
  if (impossible) {
    answer.push(-1);
    continue;
  }

  //   가능하다면 최단 거리 깨산
  let finalResult = Infinity;

  function dfs(depth, used, prevIdx, cost) {
    if (cost >= finalResult) return; // 가지치기

    // 끝나는 조건
    if (depth === dust.length) {
      finalResult = Math.min(finalResult, cost);
      return;
    }

    // 재귀 dfs로 -> 최대 10개니까 ㄱㅊㄱㅊ
    for (let i = 0; i < dust.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      const nextIdx = i + 1; // dust는 points[1]부터 시작 -> 더 빨리 시작한다. 앞에서부터 계산할 필요 없으니까!
      dfs(depth + 1, used, nextIdx, cost + distMap[prevIdx][nextIdx]);
      used[i] = false;
    }
  }

  dfs(0, Array(dust.length).fill(false), 0, 0);
  answer.push(finalResult);
}

console.log(answer.join("\n"));
