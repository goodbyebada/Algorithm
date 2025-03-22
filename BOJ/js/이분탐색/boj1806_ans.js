const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim().split(" ").map(Number));

const [n, s] = input.shift();
let nums = input.shift();
let head = 0;
let tail = 0;
let sum = nums[0];
let answer = Infinity;

while (tail < nums.length) {
  if (sum >= s) {
    answer = Math.min(answer, tail - head + 1);
    // 더 작으면 update

    sum -= nums[head];
    head++;
    // 오른쪽으로 이동
  } else {
    tail++;
    sum += nums[tail];
    // 작아진다면 끝을 더한다.
  }
}
console.log(answer !== Infinity ? answer : 0);
