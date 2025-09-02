const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

let index = 0;

//  N M X (목표 지점)
// 계속 최단 거리만 갱신할 것이니까

const [N, M, X] = input[index++].split(" ").map(Number);

// 기존에 했던 풀이 -> 각 학생 집 출발점으로 설정해 다익스트라 수행
// 🌟 역방향 그래프로 만든다면, 다익스트라 2번으로 로직 끝
//   역방향 그래프로 만든다면 도착점에서 다익스트라 수행한다면 각 학생 집 -> 도착점으로의 최단거리 갱신!
//  A -> 도착점  => A <- 도착점 방향이 바뀌기 때문이다.

// 📌 704ms => 196ms 로 단축 댐잇!
const graph = Array(N + 1)
  .fill(0)
  .map(() => []);

const reverseGraph = Array(N + 1)
  .fill(0)
  .map(() => []);

for (let i = 1; i < M + 1; i++) {
  const [start, end, t] = input[i].split(" ").map(Number);
  graph[start].push({ vertex: end, t });
  reverseGraph[end].push({ vertex: start, t });
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

    for (let adjNode of graph[nowVertex]) {
      const { vertex, t } = adjNode;

      if (table[vertex] > dist + t) {
        // 갱신
        table[vertex] = dist + t;
        heap.push({ dist: table[vertex], vertex });
      }
    }
  }
}

function main() {
  // 각 학생이 본인 집으로 돌아가는 최소 거리 테이블
  const backTable = Array(N + 1).fill(Infinity);

  // 각 학생의 돌아가는 길
  ds(X, graph, backTable);

  // 도착점에서 출발 => 학생 집 노드의 최단 거리 갱신
  const table = Array(N + 1).fill(Infinity);
  ds(X, reverseGraph, table);

  let maxDist = -1;

  for (let i = 1; i <= N; i++) {
    const dist = backTable[i] + table[i];
    maxDist = Math.max(maxDist, dist);
  }

  console.log(maxDist);
}

main();
