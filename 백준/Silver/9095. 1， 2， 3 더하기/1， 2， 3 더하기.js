/**
 * 1, 2, 3 더하기
 *
 */

const [T, ...targets] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

for (let i = 0; i < T; i++) {
  let num = targets[i];

  const dp = new Array(num + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let j = 4; j <= num; j++) {
    dp[j] = dp[j - 1] + dp[j - 2] + dp[j - 3];
  }

  console.log(dp[num]);
}
