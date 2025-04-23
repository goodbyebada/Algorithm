const [N, M] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function comb(N, M) {
  const DP = Array.from({ length: M + 1 }, () => Array(N + 2).fill(BigInt(0)));

  // DP[0][*] = 1 (빈 조합은 항상 1개)
  for (let i = 0; i <= N + 1; i++) {
    DP[0][i] = BigInt(1);
  }

  for (let len = 1; len <= M; len++) {
    for (let start = N; start >= 1; start--) {
      DP[len][start] = DP[len][start + 1] + DP[len - 1][start + 1];
    }
  }

  console.log(DP[M][1].toString());
}

comb(N, M);
