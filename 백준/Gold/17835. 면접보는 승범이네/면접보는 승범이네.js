const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number);

// 인접 리스트: 역방향 저장 (V → U)
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  graph[v].push([u, w]); // 역방향
}

const starts = input[M + 1].split(" ").map(Number);

// 최소 힙 (거리 기준)
class MinHeap {
  constructor() {
    this.heap = [];
  }
  push([dist, node]) {
    this.heap.push([dist, node]);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p][0] <= this.heap[i][0]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
  pop() {
    if (!this.heap.length) return null;
    const ret = this.heap[0];
    const last = this.heap.pop();
    if (!this.heap.length) return ret;
    this.heap[0] = last;
    let i = 0;
    while (true) {
      let l = 2 * i + 1, r = 2 * i + 2, smallest = i;
      if (l < this.heap.length && this.heap[l][0] < this.heap[smallest][0]) smallest = l;
      if (r < this.heap.length && this.heap[r][0] < this.heap[smallest][0]) smallest = r;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
    return ret;
  }
  size() {
    return this.heap.length;
  }
}

const dist = Array(N + 1).fill(Infinity);
const heap = new MinHeap();

// 면접장들을 시작점으로
for (const s of starts) {
  dist[s] = 0;
  heap.push([0, s]);
}

// 단일 다익스트라
while (heap.size()) {
  const [d, u] = heap.pop();
  if (d > dist[u]) continue;
  for (const [v, w] of graph[u]) {
    if (dist[v] > d + w) {
      dist[v] = d + w;
      heap.push([dist[v], v]);
    }
  }
}

// 결과 계산
let maxDist = -1;
let ansCity = 0;
for (let i = 1; i <= N; i++) {
  if (dist[i] > maxDist) {
    maxDist = dist[i];
    ansCity = i;
  }
}

console.log(ansCity);
console.log(maxDist);
