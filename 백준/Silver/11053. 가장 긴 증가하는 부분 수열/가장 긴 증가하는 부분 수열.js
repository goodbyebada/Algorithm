// 가장 긴 증가하는 부분 수열
// 실버 2

// -> 부분 수열
// 이전 값 보다 커야한다.
// 가장 작은 값에서 출발한다.
// 중간에 가장

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim();
solution(input);
// wrongSol(input);

function solution(s) {
  const [N, list] = s.split("\n");
  const A = list.split(" ").map(Number);

  // 주어지는 N NUMBER로 바꿨는지 확인할 것! 조심!
  const dp = new Array(+N).fill(1);

  for (let i = 0; i < A.length; i++) {
    for (let prev = 0; prev < i; prev++) {
      //         작다면
      if (A[prev] < A[i]) {
     
        dp[i] = Math.max(dp[i], dp[prev] + 1);
      }
    }
  }

  const max = Math.max(...dp);
  console.log(max);
}
