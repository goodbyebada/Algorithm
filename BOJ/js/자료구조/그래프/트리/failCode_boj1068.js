const fs = require("fs");

/**
 * 트리
 * 골드 5
 *
 * 리프 노드의 개수를 구해라
 *
 * 트리 노드의 개수 N
 * 0 ~ N-1번 노드 각 부모의 노드가 주어진다. 부모가 없다면 -1
 * 지울 노드의 번호
 *
 * 이중 배열을 사용한다 dfs처럼 방문
 * tree[0] = [1, 2];
 * 0번 노드의 자식들을 의미한다.
 * 자식들의 길이만큼 순회하며, 자식 노드의 노드를 본다.
 * tree[1] = [3,4];
 * 삭제해야하는 노드를 자식으로 두고 있는 노드에 접근해 해당 노드를 제거한다.
 *
 *
 */

// 루트 노드가 꼭 0 시작이 아닐 수 있다.

let leafNodeCount = 0;

// 후위 순회
function dfs(arr, idx) {
  const nodes = arr[idx];

  if (nodes.length == 0) {
    leafNodeCount++;
    return;
  }

  for (let i = 0; i < nodes.length; i++) {
    const nodeIdx = nodes[i];
    dfs(arr, nodeIdx);
  }
}

function main() {
  const input = fs
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n");

  const N = Number(input[0]);

  // 루트 노드가 0이 아닐 수도 있기 때문에
  const tree = new Array(N + 1);

  for (let i = 0; i <= N; i++) {
    tree[i] = [];
  }

  const parentNodes = input[1].split(" ").map(Number);
  const removeNode = Number(input[2]);

  for (let i = 0; i < N; i++) {
    const parentNode = parentNodes[i];

    //i === i번 노드
    if (i == removeNode || parentNode == i) {
      continue;
      //  아예 제거한다.
    }

    // 실제 노드 번호보다 1보다 큰 인덱스에 접근한다.
    tree[parentNode + 1].push(i);
  }

  dfs(tree, 0);

  console.log(leafNodeCount);
}

main();
