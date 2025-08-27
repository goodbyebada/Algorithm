const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split("\n");

//   골드 5

// Ti 걸리는 기간
// Pi 받을 수 있는 금액
// 중복으로 겹칠 수 없다.
//  N+1일째에는 회사에 없다. 기간을 초과하면 제거
// 최대 수익을 구해야한다.

// 10^6 완탐 O(n^2) -> 시간초과
// 그리디 -> 최적해를 보장하지 못함
// 다 해야됨 -> 시간 확보 -> 누적 => cache -> DP
// 1. N번째를 선택했을때의 최댓값
// 2. N까지 선택했을때의 최댓값 => O

function main() {
  let n = +input[0];

  const work = Array();
  const dp = Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    const [day, money] = input[i].split(" ").map(Number);

    work.push([day, money]);
  }

  //   dp[n] => n일까지 일한 급여

  // 맨마지막날에 누적 n일에 누적
  // i =0 부터 차례대로 계산

  for (let i = 0; i < n; i++) {
    const [t, p] = work[i];

    let final = i + t;

    // 이전까지 번 돈 vs 현재 존재하는 돈(앞에서 갱신된 최댓값)
    if (i > 0) dp[i] = Math.max(dp[i - 1], dp[i]);

    //
    if (final <= n) {
      // i일가지 번 돈 + 추가로 번 돈, 원래 i+t에 있던 값
      dp[i + t] = Math.max(dp[i] + p, dp[i + t]);
    }

    // if (final >= n) {
    //   // n일을 넘어간다면 못함
    //   // 0인 맨 처음의 초기화된 값이라면 dp[current - 1]을 넣는다. current일까지 번 금액
    //   if (dp[current] === 0 && current > 0) {
    //     // current일까지 번 값
    //     dp[current] = dp[current - 1];
    //   }
    //   continue;
    // }

    // // 현재 있는 값, 갱신된 값을 비교
    // // 전날까지 번 값
    // dp[updatedDay] = Math.max(dp[current] + money, dp[updatedDay]);

    // // 0인 맨 처음의 초기화된 값이라면 dp[current - 1]을 넣는다. current일까지 번 금액
    // if (current > 0) dp[current] = Math.max(dp[current], dp[current - 1]);
  }

  dp[n] = Math.max(dp[n - 1], dp[n]);

  //   최종금액 누적
//  console.log(dp);
  console.log(dp[n]);
}

main();
