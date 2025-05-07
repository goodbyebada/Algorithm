// 최단 경로
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

// 정점의 개수
// 간선의 개수

class Node {
  constructor(dist, v) {
    this.dist = dist;
    this.v = v;
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  pop() {
    const node = this.heap[0];
    this.heapifyDown();
    return node;
  }

  heapifyUp() {
    let childIdx = this.heap.length - 1;

    while (childIdx > 0) {
      const parentIdx = Math.floor((childIdx - 1) / 2);

      if (this.heap[parentIdx].dist < this.heap[childIdx].dist) break;

      [this.heap[childIdx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[childIdx],
      ];

      childIdx = parentIdx;
    }
  }

  heapifyDown() {
    // 실행 x
    if (this.heap.length <= 1) {
      this.heap.pop();
      return;
    }

    const leaf = this.heap[this.heap.length - 1];
    this.heap.pop();
    let index = 0;
    this.heap[index] = leaf;

    const length = this.heap.length;

    // 언제 break?
    // 자식 노드랑 비교 후에 바뀌지 않은 index
    while (true) {
      let smallest = index;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex].dist < this.heap[smallest].dist
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].dist < this.heap[smallest].dist
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];

      index = smallest;
      //   index 재 갱신
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function ds(startNode, graph, table) {
  const queue = new MinHeap();
  queue.push(new Node(0, startNode));
  table[startNode] = 0;

  //   1. 우선순위 큐에 방문할 노드를 넣는다
  //   2. 큐에서 뺀 노드의 인접 노드를 갱신한다. 만약 현재 테이블의 값보다 작다면 갱신하지 않는다.
  //   3. 테이블을 업데이트 한다.
  //   4. 큐에 넣는다.
  //    반복한다.

  while (!queue.isEmpty()) {
    const curr = queue.pop();
    const currVal = curr.v;
    const currDist = curr.dist;

    if (table[currVal] < currDist) continue;

    for (let adjNode of graph[currVal]) {
      const currAdjDist = table[currVal] + adjNode.dist;
      if (table[adjNode.v] > currAdjDist) {
        table[adjNode.v] = currAdjDist;
        queue.push(new Node(currAdjDist, adjNode.v));
      }
    }
  }
}

function sol(input) {
  const [V, E] = input.shift().split(" ").map(Number);
  const startNode = +input.shift();
  const table = Array(V + 1).fill(Infinity);

  //   1번째부터 시작
  const graph = Array(V + 1)
    .fill(0)
    .map(() => []);

  for (let item of input) {
    const [u, v, w] = item.split(" ").map(Number);
    graph[u].push(new Node(w, v));
  }

  ds(startNode, graph, table);

  let result = "";
  for (let i = 1; i <= V; i++) {
    result += (table[i] === Infinity ? "INF" : table[i]) + "\n";
  }
  console.log(result);
}

sol(input);
