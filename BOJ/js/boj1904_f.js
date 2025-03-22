/**
 * 1타일 || 00 타일
 *
 * 📌 순서를 고려해야하나 고민했는데,  + 1 || 00 타일로 끝나면 겹치지 않는다.
 
 *
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = +require("fs").readFileSync(path).toString().trim();
const dp = Array.from({ length: input }, () => 0);

dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= input; i++) {
  dp[i] = (dp[i - 2] + dp[i - 1]) % 15746;
}

console.log(dp[input]);
