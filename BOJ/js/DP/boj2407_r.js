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
