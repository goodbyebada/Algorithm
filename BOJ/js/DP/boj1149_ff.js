// 답 보고 다시 풀었다.
//각 단계의 최적의 값을 계산해 모든 경우의 최적의 값을 계산한다.

// 각 집마다의 최적의 값을 계산한다.
// 현재 집 (>=2) 을 R G B로 각각 칠했을때의 최소 비용을 이전의 값중 가장 작은 값과 합해 갱신한다.

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let N = +input.shift();
const rgb = input.map((ele) => ele.split(" ").map(Number));
const dp = Array(N)
  .fill()
  .map(() => Array(3).fill(0));

dp[0] = rgb[0];

for (let i = 1; i < N; i++) {
  // 집이 red일때
  //   이전의 최적값 + 현재
  dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + rgb[i][0];
  // 집이 green일때
  dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + rgb[i][1];
  //  집이 blue일때
  dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + rgb[i][2];
}

console.log(Math.min(...dp[N - 1]));
