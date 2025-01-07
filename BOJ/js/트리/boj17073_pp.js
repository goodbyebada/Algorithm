const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, w] = input.shift().split(" ").map(Number);

const list = input.map((elem) => elem.split(" ").map(Number));
const graph = Array.from({ length: n }, () => []);
const visted = Array.from({ length: n }, () => false);

for (let [u, v] of list) {
  graph[u - 1].push(v - 1);
  graph[v - 1].push(u - 1);
}

const leafCnt = BFS(0, graph);
console.log(w / leafCnt);

function BFS(node, graph) {
  let idx = 0;
  const queue = [];
  queue.push(node);
  visted[node] = true;

  let leafCnt = 0;

  while (queue.length - idx > 0) {
    const next = queue[idx];
    idx++;
    let isLeaf = true;

    for (let neighbor of graph[next]) {
      if (visted[neighbor]) continue;
      queue.push(neighbor);
      visted[neighbor] = true;
      isLeaf = false;
    }

    if (isLeaf) leafCnt++;
  }

  return leafCnt;
}
