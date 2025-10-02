const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

// 수열
// A1*Aj 의 합을 구해라
// 모든 i j의 쌍에 대해서

// A1 * Aj
// 겹치지 않는 모든 조합
// 합 계속 1_000_000_007로 나눠야함

// N <= 10^6
// N^2 => 시간 초과
// N or NlogN logN
// => 이분탐색..왜 이분탐색이지..?

// 투포인터?
// N + N-1 + => N(N-1)/2 => 10^12

// 누적합?
// A1 * (A2 + A3 + ... + AN)
// A2 * (A3 + A4 + ... + AN)
// ...
// AN-1 * AN

/**
 * 누적합 구한다.
 * 하나씩 뺀다.
 * 차례대로 곱한다.
 *
 *
 * 초기 누적합 구할때마다 1_000_000_007로 나눠야함
 
 */

function sol() {
  const N = +input[0];
  const A = input[1].split(" ").map(Number);
  const MOD = 1000000007;

  let answer = 0;
  let sum = 0;

  // 초기 누적합 계산
  for (let i = 0; i < N; i++) {
    sum = (sum + A[i]) % MOD;
  }

  for (let i = 0; i < N - 1; i++) {
    sum = (sum - A[i] + MOD) % MOD; // 음수 방지
    answer = (answer + (A[i] % MOD) * (sum % MOD)) % MOD; // 매번 MOD 처리
  }

  console.log(answer);
}
sol();
