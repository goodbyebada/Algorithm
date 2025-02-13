// 7과 3의 촌수를 계산해라
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const [target1, target2] = input[1].split(" ").map(Number);
const m = +input[0];
const relation = input.splice(3).map((elem) => elem.split(" ").map(Number));
const visited = new Array(m + 1).fill(false);
const graph = new Array(m + 1).fill(0).map((_) => new Array());

for (let elem of relation) {
  const [x, y] = elem;
  graph[x].push(y);
  graph[y].push(x);
}

console.log(BFS(target1, target2));

// DFS
function BFS(target1, target2) {
  let queue = [];
  let depth = 0;
  queue.push(target1);
  visited[target1] = true;

  while (queue.length !== 0) {
    const curr = queue.shift();

    for (let node of graph[curr]) {
      if (visited[node]) continue;

      console.log(`방문하는 node ${node}`);
      if (node === target2) {
        depth++;
        break;
      }
      queue.push(node);
      visited[node] = true;
      depth++;
    }
  }

  return depth === 0 ? -1 : depth;
}
