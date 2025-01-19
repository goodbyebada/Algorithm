// 두 정점 중 부모 노드 리스트를 만든다
// 다른 정점 bottom up 할때 부모 노드 리스트에 포함되는지확인하고 있다면 바로 return한다.
// 거리순으로 노드 리스트를 만든다.
// 무조건 포함하게 되어있기 떄문에 출력할때까지 반복한다.

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let inputs = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((elem) => elem.split(" ").map(Number));

let countIdx = 1;
let T = +inputs[0][0];

while (T--) {
  const nodeCount = inputs[countIdx][0];

  const p = new Array(nodeCount + 1).fill(0).map((_, key) => key);
  const visited = new Array(nodeCount + 1).fill(false);

  for (let i = countIdx; i < countIdx + nodeCount; i++) {
    const [parent, child] = inputs[i];
    p[child] = parent;
  }

  const [a, b] = inputs[countIdx + nodeCount];
  console.log(findCommonParent(a, b, p, visited));
  countIdx += nodeCount + 1;
}

function findCommonParent(a, b, p, visited) {
  let node1 = a;
  let node2 = b;

  while (1) {
    visited[node1] = true;
    if (p[node1] === node1) break;
    node1 = p[node1];
  }

  while (1) {
    if (visited[node2]) break;
    node2 = p[node2];
  }

  return node2;
}
