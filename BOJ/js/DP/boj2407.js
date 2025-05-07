const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const comb = (n, k) => {
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(BigInt(0)));

  for (let i = 0; i <= n; i++) {
    dp[i][0] = BigInt(1); // nC0 = 1
    dp[i][i] = BigInt(1); // nCn = 1
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
    }
  }

  return dp[n][k].toString();
};

const [N, M] = input;
console.log(comb(N, M));

//   1.M이 0 || N => 1출력
//   2. 1 || N-1 => N출력
//  3. M이 N/2s보다 크다면 N-M으로 갱신
// 3. 2 초기화 [i] = N-i
// 4. level = 3  Math.floor(N/2) 반복
// j= N 1까지 sum에 누적
// j == N일때는 DP[level][j] = 0
// N보다 작아질 때 sum +  DP[level-1][j+1] sum 갱신

function comFail() {
  if (M === 0 || M === N) {
    return 1;
  }

  if (M === 1 || M === N - 1) {
    return N;
  }

  // index 1 ~ N
  let m = M;
  if (m > Math.floor(N / 2)) {
    m = N - M;
  }

  const DP = Array(Math.floor(N / 2) + 1)
    .fill(0)
    .map(() => Array(N + 1).fill(BigInt(0)));

  console.log(DP);

  // 길이가 2일때 초기화
  for (let i = 1; i <= N; i++) {
    DP[2][i] = BigInt(N - i);
  }

  // 길이가 3이상 Math.floor(N/2)
  for (let len = 3; len <= Math.floor(N / 2); len++) {
    for (let num = N; num >= 1; num--) {
      if (num === N) continue;

      DP[len][num] = DP[len - 1][num + 1] + DP[len][num + 1];
    }
  }

  console.log(DP[m][1].toString());
}
