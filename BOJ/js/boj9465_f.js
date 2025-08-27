const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split("\n");

// 실버1
// 답지보고 다시 품
// 2H

function main() {
  let index = 0;
  let T = +input[index++];

  while (T--) {
    let n = +input[index++];
    const sticker = Array().fill(0);

    // [2][n]
    const dp = Array.from({ length: 2 }, () => Array(n).fill(0));

    // init
    for (let i = 0; i < 2; i++) {
      const line = input[index++].split(" ").map(Number);
      sticker.push(line);
    }

    const answer = sol(dp, n, sticker);

    console.log(answer);
  }
}

function sol(dp, n, sticker) {
  dp[0][0] = sticker[0][0];
  dp[1][0] = sticker[1][0];

  if (n === 1) {
    return Math.max(dp[0][n - 1], dp[1][n - 1]);
  }

  dp[0][1] = dp[1][0] + sticker[0][1];
  dp[1][1] = dp[0][0] + sticker[1][1];

  if (n === 2) {
    return Math.max(dp[0][n - 1], dp[1][n - 1]);
  }

  for (let i = 2; i < n; i++) {
    dp[0][i] = Math.max(dp[1][i - 1], dp[1][i - 2]) + sticker[0][i];
    dp[1][i] = Math.max(dp[0][i - 1], dp[0][i - 2]) + sticker[1][i];
  }

  return Math.max(dp[0][n - 1], dp[1][n - 1]);
}

main();
