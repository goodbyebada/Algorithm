// BFS를 적용한다면 경로의 수가 아니라 value를 비교하는 것이기에
// 방문할때마다 값을 갱신해야함 => 중복 연산 증가 => O(2^N)

// 1463번(1로 만들기 문제)은 "최소 연산 횟수" 문제 → BFS 적합
// 2579(계단 오르기)번은 "최대 점수" 문제 + 경로 제약 많다 → BFS로 경우의 수가 너무 많아 비효율적

/**
 * 계단 오르기
 * 실버 3
 *
 * 1. 마지막 계단을 방문 해야한다.
 * 2. 3번 연속 계단 밟기 안된다 -> 1번 || 2번
 * 조건 어떻게 처리할지 모르겠음
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [T, ...stairs] = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const dp = new Array(T).fill(0);

// (idx+1) 계단
dp[0] = stairs[0];
dp[1] = stairs[0] + stairs[1];
dp[2] = Math.max(dp[0], stairs[1]) + stairs[2];

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

for (let i = 3; i < T; i++) {
  dp[i] = stairs[i] + Math.max(dp[i - 3] + stairs[i - 1], dp[i - 2]);
}

console.log(dp[T - 1]);
