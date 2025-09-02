const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

let index = 0;

//  N M X (목표 지점)
// 계속 최단 거리만 갱신할 것이니까
const [N, M, X] = input[index++].split(" ").map(Number);

const graph = Array(N + 1)
  .fill(0)
  .map(() => []);

for (let i = 1; i < M + 1; i++) {
  const [start, end, t] = input[i].split(" ").map(Number);
  graph[start].push({ end, t });
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  empty() {
    return this.heap.length <= 0;
  }

  push(node) {
    // node  {vertex, dist}
    this.heap.push(node);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    const last = this.heap.pop();
    this.heap[0] = last;

    this.bubbleDown();
    return root;
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);

      if (this.heap[index].dist > this.heap[parent].dist) {
        [this.heap[parent], this.heap[index]] = [
          this.heap[index],
          this.heap[parent],
        ];

        index = parent;
      }

      break;
    }
  }

  bubbleDown() {
    let index = 0;

    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let smallest = index;

      if (
        leftChildIdx < this.heap.length &&
        this.heap[leftChildIdx].dist < this.heap[index].dist
      ) {
        smallest = leftChildIdx;
      }

      if (
        rightChildIdx < this.heap.length &&
        this.heap[rightChildIdx].dist < this.heap[index].dist
      ) {
        smallest = rightChildIdx;
      }

      if (smallest === index) break;

      //   swap
      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];

      index = smallest;
    }
  }
}

function ds(start, graph, table) {
  const heap = new MinHeap();

  // node  {vertex, dist}
  heap.push({ vertex: start, dist: 0 });
  table[start] = 0;

  while (!heap.empty()) {
    // 최단 거리 노드
    const { vertex: nowVertex, dist } = heap.pop();

    // { end, t }
    for (let adjNode of graph[nowVertex]) {
      const { end, t } = adjNode;

      if (table[end] > dist + t) {
        // 갱신
        table[end] = dist + t;
        heap.push({ dist: table[end], vertex: end });
      }
    }
  }
}

function main() {
  // 각 학생이 본인 집으로 돌아가는 최소 거리 테이블
  const backTable = Array(N + 1).fill(Infinity);

  // 각 학생의 돌아가는 길
  ds(X, graph, backTable);

  // 나머지 학생들이 집에 거리 갱신
  for (let i = 0; i < graph.length; i++) {
    if (i === X) continue;

    const table = Array(N + 1).fill(Infinity);
    ds(i, graph, table);
    backTable[i] += table[X];
  }

  let maxDist = -1;
  for (let dist of backTable) {
    if (dist === Infinity || dist === 0) continue;
    if (dist > maxDist) {
      maxDist = dist;
    }
  }

  console.log(maxDist);
}

main();
