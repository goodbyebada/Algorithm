/**
 * 답지 보고 다시 풀기
 *
 * 루트 노드가 0이 아닐 수 있다는 점을 고려하지 않았다.
 * 1. 입력에 따라 트리를 구성한다.
 * 2. rootNode에 대한 정보를 기억해둔다.
 * 3. rootNode부터 접근해 dfs 탐색을 한다.
 * 4. 만약 자식 노드가 removeNode라면 return 한다. 이 때 removeNode만을 가지고 있는 노드라면,
 *  리프 노드로 간주해 cnt++을 하고 return한다.
 * 5. 만약 빈 배열이라면 cnt++ 후 return한다.
 *
 * 단항 더하기를 이용해
 * 숫자로 변환할 수 있다.
 * parseInt()와 유사하지만,
 *
 * "5개"
 * parseInt("5개") :5
 * +"5개" : NaN을 반환한다.
 *
 * "5.51"
 * parseInt("5.51") : 5
 * +"5.51" : 5.51
 *  */

const fs = require("fs");
function main() {
  const input = fs
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n");

  input.shift();
  const parentNodes = input.shift().split(" ").map(Number);
  const removeNode = +input.shift();

  const tree = [];
  let rootNode = 0;
  let cnt = 0;

  parentNodes.forEach((parentNode, node) => {
    if (parentNode === -1) {
      rootNode = node;
      return;
    }
    // undefined라면 배열로 만든뒤 push해준다.
    if (!tree[parentNode]) tree[parentNode] = [];
    tree[parentNode].push(node);
  });

  const dfs = (node) => {
    if (rootNode === node) {
      return;
    }

    // 트리의 길이가 0이라면 leafNode ++ dfs 탈출
    if (!tree[node]) {
      cnt++;
      return;
    }

    tree[node].forEach((childNode) => {
      if (childNode === removeNode) {
        // childNode를 removeNode를 하나만 가지고 있다면
        // leafNode이기 때문에 cnt++하고 종료한다.
        // 한번 더 depth가 깊어지는 것을 막을 수 있다.

        if (tree[childNode] && tree[childNode].length === 1) {
          cnt++;
        }
        return;
      }
      dfs(childNode);
    });
  };

  dfs(rootNode);
  console.log(cnt);
}
main();
