// 사다리 조작
// 8:00~

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const [N, M, H] = input[0].split(" ").map(Number);

/**
 * N 세로선, M 가로선, H는 왜..
 * 목표:
 * i번 세로선이 결과가 i번 나오도록 조작 => 추가해야하는 가로선의 개수
 */

// 1. 사다리타기
// a. col로 순회를 한다.
// b. (0,col) 부터 시작
// ladder[][] === 1 좌우 확인 좌표 이동
// 0이라면 밑으로 내려간다.
// M이 될때까지
// M이 되곤 난 후, col이 최종 도착이다.

// 움직여야하는 거리
function getDist(startCol, ladder) {
  let col = startCol;
  let row = 0;

  while (1) {
    if (row === M) {
      return startCol - col;
    }

    if (ladder[row][col]) {
      // 좌우로 이동 -> col의 경계를 조심해야한다.
      // 좌 확인

      if (col - 1 >= 0 && ladder[row][col - 1]) {
        col -= 1;
        row++;
        continue;
      }

      // 👹 실수지점 ,col 값 바꾸고 또 아래 연산해서 ,,이걸 동시에 하면 안되지..
      if (col + 1 < N && ladder[row][col + 1]) {
        col += 1;
        row++;
        continue;
      }
    }

    // 없다면
    row++;
  }
}

// 백트래킹
// 1. 사다리 타기를 한다.
//  - i -> i 면 패스한다.
// 2. 되지 않는다면 i로 연결 될 수 있는 선을 그려본다. => 될 수 있는지 어케암!?
//  - 가로선 연속하거나 접하면 안된다.
//  - col -1 혹은 col+1 에 가로선이 있는지 확인
// 3. 선을 그렸다고 가정하고, 그 다음 세로선을 탄다 (dfs)
// 4. 개수가 3보다 많아지면 그만 알아보자. (가지 치기)
function backTracking() {}

// 방향 고절하자
// 오른쪽으로 가로선 긋기
function isImpossible(row, col, ladder) {
  return ladder[row][col] == 0 && col + 1 < N && ladder[row][col + 1] === 0;
}

// 가능한 가로선 구하기
function getPossibleHori(col, dist, ladder) {
  const newLadder = ladder.map((row) => [...row]);

  if (dist < 0) {
    for (let i = col - dist; i < dist; i++) {
      for (let row = 0; row < M; row++) {
        if (isImpossible(row, i, newLadder)) {
          // 가로선 놓기
          newLadder[row][i] = 1;
          newLadder[row][i + 1] = 1;
        }
      }
    }

    return;
  }

  for (let i = col; i < col + dist; i++) {}
}

function excute(col, count) {
  const stack = [[col, count]];
  let index = 0;

  for (let i = 0; i < M; i++) {
    //  i -> i 매칭 ok
    // 근데 사실 하나 틀어지면 전부 다 틀어져서 matching 의미없음
    const dist = getDist(startCol, ladder);
    if (dist === 0) continue;
  }
}

function solve() {
  if (M === 0) return 0;

  const ladder = Array.from({ length: M }, () => Array(N).fill(0));

  // ladder 초기화
  // 0번 index 부터 시작할 것임
  for (let i = 1; i < 1 + M; i++) {
    // a 가로선
    // b 세로선
    const [a, b] = input[i].split(" ").map(Number);
    ladder[a - 1][b - 1] = 1;
    ladder[a - 1][b] = 1;
  }

  backTracking();
}
solve(input);
