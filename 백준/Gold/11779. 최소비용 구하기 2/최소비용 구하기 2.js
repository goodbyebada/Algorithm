const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

class Node {
  constructor(value, node) {
    this.value = value;
    this.node = node;
  }
}

class MinHeap {
  constructor() {
    this.arr = [];
  }

  empty() {
    return this.arr.length <= 0;
  }

  push(nodeObj) {
    this.arr.push(nodeObj);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.arr.length - 1;
    let parentIdx = Math.floor((index - 1) / 2);

    while (parentIdx >= 0 && this.arr[parentIdx][0] > this.arr[index][0]) {
      let parent = this.arr[parentIdx];
      this.arr[parentIdx] = this.arr[index];
      this.arr[index] = parent;

      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }

  pop() {
    if (this.arr.length <= 0) return null;
    if (this.arr.length === 1) return this.arr.pop();

    const root = this.arr[0];
    const lastNode = this.arr.pop();

    this.arr[0] = lastNode;
    this.bubbleDown();

    return root;
  }

  bubbleDown() {
    let index = 0;

    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let smallest = index;

      if (
        leftChildIdx < this.arr.length &&
        this.arr[leftChildIdx][0] < this.arr[smallest][0]
      ) {
        smallest = leftChildIdx;
      }

      if (
        rightChildIdx < this.arr.length &&
        this.arr[rightChildIdx][0] < this.arr[smallest][0]
      ) {
        smallest = rightChildIdx;
      }

      if (smallest === index) break;

      const temp = this.arr[index];
      this.arr[index] = this.arr[smallest];
      this.arr[smallest] = temp;

      index = smallest;
    }
  }
}

let index = 0;
const n = +input[index++];
const m = +input[index++];

const graph = Array(n + 1)
  .fill(0)
  .map(() => []);

// 수정: 정확히 m개의 간선만 처리
for (let i = 0; i < m; i++) {
  const [start, target, value] = input[index + i].split(" ").map(Number);
  graph[start].push(new Node(value, target));
}

const table = Array(n + 1)
  .fill(0)
  .map(() => [Infinity, []]);

const [start, target] = input[input.length - 1].split(" ").map(Number);

function ds(startNodeName, graph, table) {
  const q = new MinHeap();


  table[startNodeName] = [0, [startNodeName]];
  q.push([0, startNodeName, [startNodeName]]);

  while (!q.empty()) {
//    console.log(JSON.stringify(q));
    const [value, nodeName, arr] = q.pop();

    // 이미 더 좋은 경로가 있으면 스킵
    if (table[nodeName][0] < value) continue;

    for (let adjNode of graph[nodeName]) {
      const dist = value + adjNode.value;

      if (dist < table[adjNode.node][0]) {
        table[adjNode.node] = [dist, [...arr, adjNode.node]];
        q.push([dist, adjNode.node, [...arr, adjNode.node]]);
      }
    }
  }
}

function main() {
  ds(start, graph, table);
  console.log(table[target][0]);
  console.log(table[target][1].length);
  console.log(table[target][1].join(" "));
}

main();
