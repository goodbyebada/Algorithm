const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.replace(/\r/, ""));

console.log(input);

const solution = (input) => {
  const [rowN, colN] = input[0].split(" ").map((v) => Number(v));
  const grid = [];

  for (let i = 1; i <= rowN; i++) {
    grid.push(input[i].split(""));
  }

  const visited = Array(rowN)
    .fill(0)
    .map((v) => Array(colN).fill(false));

  let curSheep = 0;
  let curWolf = 0;
  let totalSheep = 0;
  let totalWolf = 0;

  const dfs = (x, y) => {
    // 재귀 종료 condition
    if (
      x < 0 ||
      x >= rowN ||
      y < 0 ||
      y >= colN ||
      visited[x][y] ||
      grid[x][y] === "#"
    )
      return;

    visited[x][y] = true;

    if (grid[x][y] === "o") curSheep += 1;
    if (grid[x][y] === "v") curWolf += 1;

    // 상 하 좌 우 dfs 탐색
    dfs(x - 1, y);
    dfs(x + 1, y);
    dfs(x, y - 1);
    dfs(x, y + 1);
  };

  for (let i = 0; i < rowN; i++) {
    for (let j = 0; j < colN; j++) {
      if (!visited[i][j]) {
        curSheep = 0;
        curWolf = 0;

        dfs(i, j);

        if (curSheep > curWolf) totalSheep += curSheep;
        else totalWolf += curWolf;
      }
    }
  }

  console.log(totalSheep, totalWolf);
};

solution(input);
