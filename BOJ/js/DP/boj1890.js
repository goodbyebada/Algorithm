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
const [line, ...rest] = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n");

const N = Number(line);

const map = rest.map((elem) => elem.split(" ").map(Number));

const visted = new Array(N).fill(0).map(() => new Array(N).fill(false));
const dp = new Array(N).fill(0).map(() => new Array(N).fill(BigInt(0)));

//1. 가장 오른쪽 아래칸에서 시작해 Map을 순회한다. [N-1][N-1]
// 2. 각 칸의 숫자만큼 왼쪽 오른쪽 이동한다.
// 0을 만난다면 true 처리를 한다. -> dp에 true count 기록 || visted [x][y] === true이면 +dp[x][y]
// 아니라면 continue
// 순회하고 난 뒤  dp[0][0]을 출력한다.

// 이동한 좌표 나갔는지 검사
function isValid(num) {
  return 0 <= num && num < N;
}

function canVisit(prev, moved, visited, dp) {
  const [prevX, prevY] = prev;
  const [currX, currY] = moved;

  if (currX === N - 1 && currY === N - 1) {
    visited[prevX][prevY] = true;
    dp[prevX][prevY] = BigInt(dp[prevX][prevY]) + BigInt(1);
    return;
  }

  if (visited[currX][currY]) {
    visited[prevX][prevY] = true;
    dp[prevX][prevY] = BigInt(dp[prevX][prevY]) + BigInt(dp[currX][currY]);
    return;
  }
}

function update() {
  for (let x = N - 1; x >= 0; x--) {
    for (let y = N - 1; y >= 0; y--) {
      // 0일 때 제외

      if (map[x][y] > 0) {
        const prev = [x, y];
        const moveCount = map[x][y];

        // 오른쪽 -> 열이 바뀜
        const newY = y + moveCount;

        // 아래 -> 행 바뀜
        const newX = x + moveCount;

        if (isValid(newY)) {
          const moved = [x, newY];
          canVisit(prev, moved, visted, dp);
        }
        if (isValid(newX)) {
          const moved = [newX, y];
          canVisit(prev, moved, visted, dp);
        }
      }
    }
  }
}

function sol() {
  update();

  console.log(dp[0][0].toString());
}

sol();
