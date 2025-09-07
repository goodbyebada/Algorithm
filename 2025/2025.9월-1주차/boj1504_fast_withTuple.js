const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, E] = input[0].split(" ").map(Number);
// TODO 왜 튜플이 객체보다 빠르냐!??!?!?!

const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));

for (let i = 1; i <= E; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  if (c < graph[a][b]) graph[a][b] = c;
  if (c < graph[b][a]) graph[b][a] = c;
}

const [v1, v2] = input[E + 1].split(" ").map(Number);

// ✅ 배열 튜플 MinHeap
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(arr) {
    this.heap.push(arr);
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent][1] <= this.heap[idx][1]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let idx = 0;
    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;

      if (
        left < this.heap.length &&
        this.heap[left][1] < this.heap[smallest][1]
      )
        smallest = left;
      if (
        right < this.heap.length &&
        this.heap[right][1] < this.heap[smallest][1]
      )
        smallest = right;
      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
    return top;
  }

  empty() {
    return this.heap.length === 0;
  }
}

// ✅ 배열 튜플 다익스트라
function dijkstra(start) {
  const dist = Array(N + 1).fill(Infinity);
  dist[start] = 0;
  const pq = new MinHeap();
  pq.push([start, 0]);

  while (!pq.empty()) {
    const [cur, curDist] = pq.pop();
    if (curDist > dist[cur]) continue;

    for (let next = 1; next <= N; next++) {
      if (graph[cur][next] === Infinity) continue;
      const nextDist = curDist + graph[cur][next];
      if (nextDist < dist[next]) {
        dist[next] = nextDist;
        pq.push([next, nextDist]);
      }
    }
  }

  return dist;
}

// ✅ 최종 경로 계산
const dist0 = dijkstra(1);
const dist1 = dijkstra(v1);
const dist2 = dijkstra(v2);

const path1 = dist0[v1] + dist1[v2] + dist2[N];
const path2 = dist0[v2] + dist2[v1] + dist1[N];

const ans = Math.min(path1, path2);
console.log(ans === Infinity ? -1 : ans);
