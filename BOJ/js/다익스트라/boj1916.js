// 05:01~
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(path).toString().trim().split("\n");

//N개의 도시
//  A -> B 도시까지 버스 비용 최소화
// N
//  M 버스 개수 => 간선

//출발도시번호, 도착지도시번호, 버스비용

let index = 0;
const N = +input[index++].split(" ");
const M = +input[index++].split(" ");

const dist = Array(N + 1).fill(Infinity);

const graph = Array(N + 1)
  .fill(0)
  .map(() => Array(N + 1).fill(Infinity));

for (let i = 1; i < N + 1; i++) {
  graph[i][i] = 0;
}

for (let i = index; i <= M + 2; i++) {
  const [start, end, cost] = input[i].split(" ").map(Number);
  //   제일 작은 비용만 업데이트
  if (graph[start][end] > cost) graph[start][end] = cost;
}

const [start, end] = input[M + 2].split(" ").map(Number);

function dijks(start, dist) {
  const mh = new MinHeap();
  mh.push(start, 0);

  //   최단거리 갱신
  dist[start] = 0;

  while (mh.arr.length > 0) {
    const [node, cost] = mh.pop();

    // 레거시 값이기 때문에
    if (dist[node] < cost) continue;

    for (let i = 1; i < N + 1; i++) {
      if (graph[node][i] === Infinity) continue;
      //   node 전까지의 거리 +  graph[node][i] (node-i 거리)
      const nextCost = cost + graph[node][i];

      if (dist[i] > nextCost) {
        dist[i] = nextCost;
        mh.push(i, nextCost);
      }
    }
  }
}

class MinHeap {
  // 0: node
  // 1 : dist
  constructor() {
    this.arr = [];
  }

  push(node, cost) {
    this.arr.push([node, cost]);
    this.siftUp();
  }

  pop() {
    if (this.arr.length === 0) return null;

    if (this.arr.length === 1) return this.arr.pop();
    const root = this.arr[0];
    const child = this.arr.pop();

    this.arr[0] = child;

    this.siftDown();

    return root;
  }

  swap(a, b) {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
  }

  siftUp() {
    let index = this.arr.length - 1;

    while (index > 0) {
      let p = Math.floor((index - 1) / 2);

      if (this.arr[p][1] > this.arr[index][1]) {
        this.swap(index, p);
        index = p;
      }

      break;
    }
  }

  siftDown() {
    let idx = 0;
    while (1) {
      let l = idx * 2 + 1;
      let r = idx * 2 + 2;
      let sm = idx;

      if (l < this.arr.length && this.arr[l] < this.arr[sm]) {
        sm = l;
      }

      if (r < this.arr.length && this.arr[r] < this.arr[sm]) {
        sm = r;
      }

      if (sm === idx) break;

      this.swap(idx, sm);

      //   update
      idx = sm;
    }
  }
}

//..?
// class MinHeap {
// arr = [];
// }

function main() {
  dijks(start, dist);
  console.log(dist[end]);
}

main();
