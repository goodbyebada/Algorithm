const [in1, in2, ...in3] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const [peopleNum, complimentNum] = in1.split(" ").map(Number);
const parentArr = in2.split(" ").map(Number);
const data = in3.map((el) => el.split(" ").map(Number));
const memo = Array(peopleNum).fill(0);

class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addEdge(v1, v2) {
    if (!this.adjacencyList[v1]) this.adjacencyList[v1] = [];
    this.adjacencyList[v1].push(v2);
  }

  dfs(start) {
    const stack = [start];
    while (stack.length) {
      const currentVertex = stack.pop();
      if (this.adjacencyList[currentVertex]) {
        this.adjacencyList[currentVertex].forEach((neighbor) => {
          stack.push(neighbor);
          memo[neighbor - 1] += memo[currentVertex - 1];
        });
      }
    }
  }
}

const g = new Graph();

for (let i = 1; i < peopleNum; i++) {
  g.addEdge(parentArr[i], i + 1);
}

for (let i = 0; i < complimentNum; i++) {
  const [person, weight] = data[i];
  memo[person - 1] += weight;
}
g.dfs(1);

console.log(memo.join(" "));