/**
 * 제일 빠른 코드
 */
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = +inputs[0];
const arr = [];

for (let i = 1; i <= N; i++) {
  arr.push(inputs[i].split(" ").map(Number));
}

// BigInt value로 넣기 -> 매번 BigInt()  사용할 필요없다.
const dp = Array(N)
  .fill()
  .map(() => Array(N).fill(0n));

dp[0][0] = 1n;

// 순방향으로 계산한다.
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 0) continue;

    //0n이 아니라면 시작점에서 거쳐야하는 지점이다. 굳이 visted를 사용할 필요가 없다.
    if (dp[i][j] !== 0n) {
      const ny1 = i + arr[i][j];
      const nx1 = j;

      const ny2 = i;
      const nx2 = j + arr[i][j];

      if (0 <= ny1 && ny1 < N) dp[ny1][nx1] += dp[i][j];
      if (0 <= nx2 && nx2 < N) dp[ny2][nx2] += dp[i][j];
    }
  }
}

// N^N 모두 방문 후 도착 지점에서의 값 출력
console.log(dp[N - 1][N - 1].toString());
