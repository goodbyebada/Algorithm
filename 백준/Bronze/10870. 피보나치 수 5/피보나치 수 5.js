const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const n = +input;
const dp = [0, 1];

for (let i = 2; i <= n; i++) {
  //📌 js 배열은 동적 배열이다.
  dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2]);
}

console.log(dp[n].toString());
