const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let N = +input.shift();
let numbers = input[0].split(" ").map(Number);
let count = 0;
for (let i = 0; i < N; i++) {
  let flag = 1;
  if (numbers[i] == 1) continue;
  for (let j = 2; j <= Math.floor(Math.sqrt(numbers[i])); j++) {
    if (numbers[i] % j === 0) flag = 0;
  }
  if (flag) count++;
}

console.log(count);
