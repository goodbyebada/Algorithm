let fs = require("fs");
let input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = parseInt(input[0]);
const targetList = input.slice(1).map(Number);

//   마지막에 stack에 push한 값
let current = 1;
const stack = [];
const result = [];
let isPossible = true;

for (let i = 0; i < n; i++) {
  // ✨ 마지막에 있는 push한 값 기준으로 비교한다.
  while (current <= targetList[i]) {
    stack.push(current);
    result.push("+");
    current++;
  }

  //   depth가 하나 차이 나야함
  // 그렇지 않으면 이미 뺐던 수를 push 해야함 -> 오름차순 규칙을 파괴함
  if (stack[stack.length - 1] === targetList[i]) {
    stack.pop();
    result.push("-");
  } else {
    isPossible = false;
  }
}

// for문으로 출력하지 말고 join을 사용하자
isPossible ? console.log(result.join("\n")) : console.log("NO");
