const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((elem) => elem.split(" ").map(Number));

const [n, k] = input[0];

// 비교해해야하는 무게
const dp = new Array(n + 1).fill(null).map((_) => new Array(k + 1).fill(0));
// index 1부터 시작하기 위해 dummy 넣기
const board = [{ w: 0, v: 0 }];

for (let i = 1; i < input.length; i++) {
  const [w, v] = input[i];
  board.push({ w, v });
}

// 물건을 0개 넣을때와, 0Kg일때는 제외하고 계산한다. 이미 0으로 초기화 되어있기 때문에
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= k; j++) {
    // board는 index가 0부터 시작
    if (board[i].w <= j) {
      dp[i][j] = Math.max(board[i].v + dp[i - 1][j - board[i].w], dp[i - 1][j]);
    } else {
      dp[i][j] = dp[i - 1][j];
    }
  }
}

console.log(dp[n][k]);
