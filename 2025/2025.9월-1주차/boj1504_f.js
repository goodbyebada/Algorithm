// 1: 41

// 최단 경로 구하되 -> 임의로 주어진 두 정점 반드시 통과해야한다.
// 중복 방문 가능, 하지만 반드시 최단 경로를 거쳐야함.
// 방향성 없는 그래프

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const [N, E] = input[0].split(" ").map(Number);

// const graph = Array(N + 1)
//   .fill(0)
//   .map(() => Array());

//init
// for (let i = 1; i <= E; i++) {
//   const [a, b, c] = input[i].split(" ").map(Number);

//   //   양방향
//   graph[a].push({ vertex: b, dist: c });
//   graph[b].push({ vertex: a, dist: c });
// }

// 🚨 E = 2*10^5 N =800
// O(N^2 * logN) < O(E*logN) => N^2 행렬 그래프가 더 유리하다.
// 대신 [start][end] 와 항상 비교해 더 작은 값만 넣는다.

const graph = Array(N + 1)
  .fill(0)
  .map(() => Array(N + 1).fill(Infinity));

for (let i = 1; i <= E; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);

  if (graph[a][b] > c) {
    graph[a][b] = c;
  }

  if (graph[b][a] > c) {
    graph[b][a] = c;
  }
}

const [v1, v2] = input[E + 1].split(" ").map(Number);

class MinHeap {
  constructor() {
    this.arr = [];
  }

  push(vertex, dist) {
    this.arr.push({ vertex, dist });
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

  siftUp() {
    let index = this.arr.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);

      if (this.arr[parent].dist > this.arr[index].dist) {
        [this.arr[parent], this.arr[index]] = [
          this.arr[index],
          this.arr[parent],
        ];
        index = parent;
      }

      break;
    }
  }

  siftDown() {
    let index = 0;

    while (1) {
      let right = index * 2 + 2;
      let left = index * 2 + 1;
      let smallest = index;

      if (
        left < this.arr.length &&
        this.arr[left].dist < this.arr[smallest].dist
      ) {
        smallest = left;
      }

      if (
        right < this.arr.length &&
        this.arr[right].dist < this.arr[smallest].dist
      ) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.arr[index], this.arr[smallest]] = [
        this.arr[smallest],
        this.arr[index],
      ];
      index = smallest;

      // 🚨 swap 부분 놓침..
    }
  }
}

function ds(start, graph) {
  const minTable = Array(N + 1).fill(Infinity);

  const pq = new MinHeap();
  pq.push(start, 0);

  // 🚨 초기화 놓침
  minTable[start] = 0;

  //  아래는, O (N + logN) => N개의 노드를 거치니까 O(N² + N log N)
  while (pq.arr.length !== 0) {
    // O(logN)
    const { vertex: nowV, dist: nowD } = pq.pop();

    // O(N)
    for (let vertex = 1; vertex < graph[nowV].length; vertex++) {
      const dist = graph[nowV][vertex];

      if (minTable[vertex] > nowD + dist) {
        minTable[vertex] = nowD + dist;
        pq.push(vertex, nowD + dist);
      }
    }
  }

  return minTable;
}

function main() {
  const dist0 = ds(1, graph);
  const dist1 = ds(v1, graph);
  const dist2 = ds(v2, graph);

  //  1-> v1 -> v2 -> N
  const d1 = dist0[v1] + dist1[v2] + dist2[N];

  //  1-> v2 -> v1 -> N
  //🚨 틀린 부분 v1 -> N이기 때문에 dist1 써야함. 배열 잘못 씀..
  const d2 = dist0[v2] + dist2[v1] + dist1[N];

  if (d1 == Infinity && d2 == Infinity) return -1;
  return d1 < d2 ? d1 : d2;
}

console.log(main());
