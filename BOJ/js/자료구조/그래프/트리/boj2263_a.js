const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const i = require("fs").readFileSync(path).toString().trim().split("\n");

const N = +i[0];
const inOrder = i[1].split(" ").map(Number);
const postOrder = i[2].split(" ").map(Number);

function sol() {
  let answer = [];
  let stack = [[0, N - 1, 0, N - 1]];

  while (stack.length > 0) {
    const [inStart, inEnd, postStart, postEnd] = stack.pop();

    //       불가
    if (inStart > inEnd || postStart > postEnd) continue;

    answer.push(postOrder[postEnd]);

    let rootIndex = 0;

    for (let i = inStart; i <= inEnd; i++) {
      if (postOrder[postEnd] === inOrder[i]) {
        rootIndex = i;
        break;
      }
    }

    //       postOrderlist 왼쪽 트리 마지막 인덱스
    let leftInEnd = postStart + rootIndex - 1 - inStart;

    //       오른쪽 트리
    stack.push([rootIndex + 1, inEnd, leftInEnd + 1, postEnd - 1]);

    //       왼쪽 트리
    stack.push([inStart, rootIndex - 1, postStart, leftInEnd]);
  }

  console.log(answer.join(" "));
}

sol();
