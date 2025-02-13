/**
 * 계단 오르기
 * 실버 3
 *
 * 1. 마지막 계단을 방문 해야한다.
 * 2. 3번 연속 계단 밟기 안된다 -> 1번 || 2번
 * 조건 어떻게 처리할지 모르겠음
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const T = input[0];

// 0번째 stair
const stairs = input;
const dp = new Array(T + 1).fill(0);

dp[1] = stairs[1];
dp[2] = dp[1] + stairs[2];

// init
// dp[0] dp[1] dp[2]

// 📌 현재 n번째 계단에서 생각할 것
// 1. n-1 번째 계단을 밟는 경우 (+1)
// =>  n-3번째 계단을 밟고, n-1 계단 + n 계단
// dp[n-3] + staris[n-1] + stairs[n]

// 2.  n-2 번째 계단을 밟는 경우 (+2)
// => n-2 계단 + n 계단
// dp[n-2] + stairs[n]

// dp[i] = Math.max(1연속, 2연속) 업데이트

for (let i = 3; i <= T; i++) {
  dp[i] = Math.max(
    dp[i - 3] + stairs[i - 1] + stairs[i],
    dp[i - 2] + stairs[i]
  );
}

console.log(dp[T]);
