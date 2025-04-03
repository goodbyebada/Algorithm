/**
 * 가장 왼쪽 -> 가장 오른쪽 아래칸으로 이동할 수 있는 경로의 개수를 구해라
 * 모든 경로의 개수
 *
 * 1. 방향은 오른쪽 , 아래 두 개
 * 2. 0은 종착지
 * 3. 칸의 수에 적혀있는만큼 이동할 수 있다.
 *
 * 경로의 개수는 2^63-1보다 작거나 같다.
 *
 */

// 1H 15M
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const inputs = require("fs").readFileSync(path).toString().trim().split("\n");

const N = +inputs[0];

const map = [];

for (let i = 1; i <= N; i++) {
  map.push(inputs[i].split(" ").map(Number));
}

const dp = Array(N)
  .fill(0)
  .map(() => Array(N).fill(0n));

dp[0][0] = 1n;

// 이전에 했던 방법
//1. 가장 오른쪽 아래칸에서 시작해 Map을 순회한다. [N-1][N-1]
// 2. 각 칸의 숫자만큼 왼쪽 오른쪽 이동한다.
// 0을 만난다면 true 처리를 한다. -> dp에 true count 기록 || visted [x][y] === true이면 +dp[x][y]
// 아니라면 continue
// 순회하고 난 뒤  dp[0][0]을 출력한다.

// refactor
// 순방향이 더 빠르다!
// 역방향으로 하면 출발 지점이 거쳐가지 않는 좌표도 방문해야한다.

function update() {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      // 0일 때 제외
      if (map[x][y] === 0) continue;

      const moveCount = map[x][y];

      // 오른쪽 -> 열이 바뀜
      const newY = y + moveCount;

      // 아래 -> 행 바뀜
      const newX = x + moveCount;

      if (0 <= newY && newY < N) dp[x][newY] += dp[x][y];
      if (0 <= newX && newX < N) dp[newX][y] += dp[x][y];
    }
  }
}

function sol() {
  update();

  console.log(dp[N - 1][N - 1].toString());
}

sol();
