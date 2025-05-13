const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const i = require("fs").readFileSync(path).toString().trim().split("\n");

// 틀린코드

const N = +i[0];
const inOrder = i[1].split(" ").map(Number);
const postOrder = i[2].split(" ").map(Number);

/**
 * 1. postOrder[postOrderIndex]는 루트 노드이다.
 * 2. inOrder[i] == postOrder[postOrderIndex]를 찾는다.
 * 3. [0, i-1] , [i+1, end] 는 left, right이다.
 * 4.  postOrder : left -> right -> root 이기 때문에 우리는 rigth tree 부터 방문할 것이다.
 */

// 전역 말고 다르게 안되나??
let postOrderIndex = N - 1;

function findInOrderRootIndex(start, end, postOrderIndex) {
  let inOrderRootIndex = 0;
  const rootNode = postOrder[postOrderIndex];

  for (let i = start; i <= end; i++) {
    if (inOrder[i] === rootNode) {
      inOrderRootIndex = i;
      break;
    }
  }

  return inOrderRootIndex;
}

// N=> 연결
const graph = Array(N + 1)
  .fill(0)
  .map(() => []);

function recursive(start, end, rootNode) {
  let inOrderRootIndex;

  if (start > end) {
    return;
  }

  inOrderRootIndex = findInOrderRootIndex(start, end, postOrderIndex);
  postOrderIndex--;

  // 리프노드라면 rootNode에 넣어야한다.
  // 리프노드라는 건 어떻게 아냐?
  if (start === end) {
    graph[rootNode].push(inOrder[start]);
    postOrderIndex--;
  }

  recursive(inOrderRootIndex + 1, end, inOrder[inOrderRootIndex]);
  recursive(start, inOrderRootIndex - 1, inOrder[inOrderRootIndex]);
}

// rootNode -< 노드 번호 출력
function preOrder(rootNode, answer) {
  answer.push(rootNode);

  if (graph[rootNode].length <= 0) return;

  if (graph[rootNode].length === 1) {
    preOrder(graph[rootNode][0], answer);
    return;
  }

  preOrder(graph[rootNode][1], answer);
  preOrder(graph[rootNode][0], answer);
}

function sol(N) {
  let answer = [];

  const rootNode = postOrder[N - 1];

  recursive(0, N - 1, rootNode);
  console.log(graph);
  preOrder(rootNode, answer);
  console.log(answer.join(" "));
}

sol(N);
