/**
 * binary Search
 */
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

let [N, A, M, B] = input.map((v) => v.split(" ").map(Number));

A = A.sort((a, b) => a - b);
const answer = new Array(B.length).fill(0);

function bs(target, answerIdx) {
  let start = 0;
  let end = A.length;

  while (start <= end) {
    let targetIdx = Math.floor((start + end) / 2);
    const value = A[targetIdx];

    if (value === target) {
      answer[answerIdx] = 1;
      break;
    }

    if (value < target) {
      start = targetIdx + 1;
    } else {
      end = targetIdx - 1;
    }
  }
}

for (let i = 0; i < B.length; i++) {
  bs(B[i], i);
}

console.log(answer.join("\n"));
