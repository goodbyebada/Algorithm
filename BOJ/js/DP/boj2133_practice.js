/**
 * 타일 채우기
 */

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const dp = new Array(31).fill(0);
const n = +input;
dp[2] = 3;

if (n % 2 !== 0) {
  console.log(0);
  return;
}

for (let i = 4; i <= n; i += 2) {
  dp[i] = dp[i - 2] * dp[2] + 2;
  for (let j = i - 4; j >= 0; j -= 2) {
    dp[i] += dp[j] * 2;
  }
}

console.log(dp[n]);
