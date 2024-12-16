/**
 * 피보나치 수 5
 */

// n이 20보다 작거나 같다. 따라서 굳이 bigInt를 사용할 필요가 없다.

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const n = +input;
const dp = [0, 1];

for (let i = 2; i <= n; i++) {
  //  push가 더 느리다.
  //   dp.push(dp[i - 1] + dp[i - 2]);

  dp[i] = dp[i - 1] + dp[i - 2];
}

console.log(dp[n]);
