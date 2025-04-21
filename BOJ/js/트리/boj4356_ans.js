/**
 * 가장 빠른 코드 !
 */

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let idx = 0;

const T = parseInt(input[idx++]); // 테스트 케이스 수
let sb = "";

function findPostOrder(rootIdx, begin, end, N, preOrder, inOrder) {
  if (rootIdx >= N) return;
  // base case: 루트 인덱스가 배열 범위를 벗어나면 리턴

  const rootValue = preOrder[rootIdx];
  // 전위 순회의 첫 번째 값은 루트 노드 값

  for (let i = begin; i <= end; i++) {
    // 🛑 rootValue undefined일때를 방지함
    if (rootValue === inOrder[i]) {
      // 왼쪽 서브트리 탐색 (전위 순회는 루트 바로 다음이 왼쪽 서브트리 루트)
      findPostOrder(rootIdx + 1, begin, i - 1, N, preOrder, inOrder);

      // 오른쪽 서브트리 탐색
      //  ✨ 전위 순회에서 왼쪽 서브트리의 크기만큼 건너뜀
      // => rootIdx + (i - begin) + 1 (idx)

      findPostOrder(
        rootIdx + (i - begin) + 1,
        i + 1,
        end,
        N,
        preOrder,
        inOrder
      );
      sb += rootValue + " "; // 후위 순회는 left -> right -> root이므로 마지막에 루트 추가
      return;
    }
  }
}

for (let test = 0; test < T; test++) {
  const N = parseInt(input[idx++]); // 노드의 개수
  const preOrder = input[idx++].split(" ").map(Number); // 전위 순회 결과
  const inOrder = input[idx++].split(" ").map(Number); // 중위 순회 결과

  findPostOrder(0, 0, N - 1, N, preOrder, inOrder); // 재귀적으로 후위 순회 결과 구함
  sb += "\n"; // 테스트 케이스 구분을 위한 개행
}

console.log(sb.trim()); // 최종 결과 출력
