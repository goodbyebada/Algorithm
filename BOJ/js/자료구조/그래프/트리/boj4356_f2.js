const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
let preOrderList;
let inOrderList;
let answer = [];
let preOrderIdx;
let inOrderMap = new Map();
let idx = 0;

// for문 사용
function main() {
  let T = parseInt(input[idx++]);
  while (T--) {
    const N = parseInt(input[idx++]);
    preOrderIdx = 0;
    preOrderList = input[idx++].split(" ").map(Number);
    inOrderList = input[idx++].split(" ").map(Number);

    // 중위 순회의 인덱스를 빠르게 찾을 수 있도록 Map 사용
    inOrderMap.clear();
    for (let i = 0; i < N; i++) {
      inOrderMap.set(inOrderList[i], i);
    }

    postOrder(0, N - 1, N);

    console.log(answer.join(" "));

    answer = [];
  }
}

function postOrder(start, end, N) {
  if (preOrderIdx >= N) return;

  if (start > end) return;

  let root = preOrderList[preOrderIdx++];
  let inOrderIdx = inOrderMap.get(root);

  if (inOrderIdx === undefined) return;

  // 왼쪽 서브트리 탐색
  postOrder(start, inOrderIdx - 1, N);
  // 오른쪽 서브트리 탐색
  postOrder(inOrderIdx + 1, end, N);

  // 후위 순회이므로 루트 노드를 마지막에 추가
  answer.push(root);
}

main();
