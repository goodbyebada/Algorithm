// 두 정점 중 부모 노드 리스트를 만든다
// 다른 정점 bottom up 할때 부모 노드 리스트에 포함되는지확인하고 있다면 바로 return한다.
// 거리순으로 노드 리스트를 만든다.
// 무조건 포함하게 되어있기 떄문에 출력할때까지 반복한다.

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let inputs = require("fs").readFileSync(path).toString().trim().split("\n");

let countIdx = 1;
let caseT = +inputs[0];

while (caseT--) {
  const nodeCount = +inputs[countIdx];

  const p = Array.from({ length: nodeCount + 1 }, (_) => -1);

  for (let i = countIdx; i < countIdx + nodeCount; i++) {
    const [parent, child] = inputs[i].split(" ").map((elem) => Number(elem));
    p[child] = parent;
  }

  const [a, b] = inputs[countIdx + nodeCount]
    .split(" ")
    .map((elem) => Number(elem));

  console.log(findCommonParent(a, b, p, nodeCount));
  countIdx += nodeCount + 1;
}

function findCommonParent(a, b, p, nodeCount) {
  const visited = Array.from({ length: nodeCount + 1 }, () => false);

  let node1 = a;
  let node2 = b;
  visited[node1] = true;

  while (1) {
    if (p[node1] === -1) break;
    node1 = p[node1];
    visited[node1] = true;
  }

  while (1) {
    if (visited[node2]) break;
    node2 = p[node2];
  }

  return node2;
}
