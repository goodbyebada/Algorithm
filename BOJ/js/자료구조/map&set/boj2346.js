const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let numbers = input[1].split(" ").map(Number);
let indexs = Array.from({ length: +input[0] }, (_, key) => key + 1);
// splice를 이용한다.
const answer = [];

while (numbers.length !== 0) {
  answer.push(num + 1);
  let prevNum = num;
  num = indexs[monveCnt];
  monveCnt = Number(numbers[num]);
  indexs = indexs.filter((elem) => elem !== indexs[prevNum]);
}

console.log(answer.join(" "));
