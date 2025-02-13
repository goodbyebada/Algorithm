// 두 정점 중 부모 노드 리스트를 만든다
// 다른 정점 bottom up 할때 부모 노드 리스트에 포함되는지확인하고 있다면 바로 return한다.
// 거리순으로 노드 리스트를 만든다.
// 무조건 포함하게 되어있기 떄문에 출력할때까지 반복한다.

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [T, ...inputs] = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n");

inputs = inputs.map((elem) => elem.split(" ").map(Number));

class Node {
  constructor(val) {
    this.val = val;
    this.parent = -1;
  }

  addParent(parent) {
    this.parent = parent;
  }
}

let countIdx = 0;

while (T--) {
  const nodeCount = inputs[countIdx][0];

  //  1부터 idx 시작
  const nodeList = new Array(nodeCount + 1).fill(0).map((_, key) => {
    if (!key) return;
    return new Node(key);
  });

  for (let i = countIdx + 1; i <= countIdx + nodeCount; i++) {
    if (i === countIdx + nodeCount) {
      const [a, b] = inputs[i];

      console.log(findCommonParent(nodeList[a], nodeList[b], nodeList));
      continue;
    }
    const [parent, child] = inputs[i];

    nodeList[child].addParent(parent);
  }

  countIdx = nodeCount + 1;
}

function findCommonParent(node1, node2, nodeList) {
  const parentList = findParentList(node1, nodeList);

  if (parentList.includes(node2)) {
    return node2.val;
  }

  const parentList2 = findParentList(node2, nodeList);

  if (parentList2.includes(node1)) {
    return node1.val;
  }

  let result = parentList.filter((elem) => parentList2.includes(elem));
  return result[0].val;
}

function findParentList(node, nodeList) {
  const parentList = [];

  let parentNode = nodeList[node.parent];

  while (1) {
    parentList.push(parentNode);
    if (parentNode.parent === -1) {
      break;
    }
    parentNode = nodeList[parentNode.parent];
  }

  return parentList;
}
