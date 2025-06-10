const [N, list] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const dp = list.split(" ").map(Number);
const A = list.split(" ").map(Number);

for (let i = 1; i < Number(N); i++) {
  for (let j = 0; j < i; j++) {
    if (A[i] > A[j]) {
      dp[i] = Math.max(dp[i], dp[j] + A[i]);
      // 앞에서부터 계속 업데이트 -> 비교를 통해 가장 큰 값을 최종 dp
      //   dp[i] += dp[j];
      //   누적된 값을 차례 차례 더하는 것이기 때문에 틀린 답
    }
  }
}

console.log(Math.max(...dp));
