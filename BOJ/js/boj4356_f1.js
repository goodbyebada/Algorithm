const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
let preOrderList;
let inOrderList;
let answer = [];

let preOrderIdx = 0;

main();

// ✨ for문 vs map 이용한 풀이 => 반복문이 오히려 빠르다.

// for문 사용
function main() {
  let T = +input[0];
  let testCaseIdx = 1;
  while (T--) {
    preOrderList = input[testCaseIdx + 1].split(" ").map(Number);
    inOrderList = input[testCaseIdx + 2].split(" ").map(Number);

    postOrder(0, +input[testCaseIdx] - 1);

    console.log(answer.join(" "));

    testCaseIdx += 3;
    answer = [];
    inOrderIdx = 0;
    preOrderIdx = 0;
  }
}

// TODO  무한 루프 원인 찾을 것

// 🛑 무한루프 이유 2가지
function postOrder(start, end) {
  // 🛑 1. inOrderIdx가 전역 변수로 선언되어, 지역적으로 관리되어야 할 고유한 값들이 전체적으로 공유되고 있었다.
  let inOrderIdx = 0;

  // 🛑 2. preOrderIdx 가 리스트의 길이를 초과해 undefined가 나오는 경우가 있다.
  // preOrderIdx의 값이 undefined라면 inOrderIdx가 업데이트 되지 않는다. 이전의 행동을 계속 반복  => 무한루프
  if (preOrderList[preOrderIdx] === undefined) return;

  if (start > end) return;

  let root;
  // 성능 저하
  for (let i = start; i <= end; i++) {
    if (inOrderList[i] === preOrderList[preOrderIdx]) {
      inOrderIdx = i;
      root = preOrderList[preOrderIdx];
      break;
    }
  }

  //   루트 노드를 찾은 뒤 증가해야함
  if (root === undefined) return;
  preOrderIdx++;

  postOrder(start, inOrderIdx - 1);
  postOrder(inOrderIdx + 1, end);

  answer.push(root);
}
