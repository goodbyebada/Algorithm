/**
 * 상어 초등학교 재풀이
 *
 * 1. 좋아하는 학생이 가장 많이 인접한  칸
 * 2. 여러개라면 빈칸이 많은 칸
 * 3. 행의 번호가 가장 작은 칸 -> 열의 번호가 가장 작은 칸
 *
 * 📌 map을 모두 탐색해야한다. 모든 칸을 탐색하며 위 로직을 수행하는 것이다.
 *  ✨ 전부 배열로 관리할 필요가 없었다.
 * - 탐색한 칸에 좋아하는 학생의 개수와, 빈칸의 개수를 같이 센다.
 * - 각각 max를 지정해, max인 좌표 하나만 들고 다닌다.
 * 좋아하는 학생의 수가 같다면, 빈칸의 개수를 비교한다
 * max가 같은 좌표라면 row를 비교한다. 같다면 col비교를 한다;
 *
 *
 * 🥲 복습하는데도 1시간이 걸렸다.
 * map의 모든 칸을 검사해 좋아하는 학생 수, 빈칸을 세어 그 중 조건에 맞는 한 좌표만 업데이트 하는건데,
 * 나도 모르게 좋아하는 학생의 칸 기준 상하좌우 탐색이라고 생각하고 있었다.
 * 이외에도, score 계산할때 board에서 s를 어떻게 찾나 막막해함.. map 이 있다고 니가 어제 적어놨자너..
 *
 */

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const students = input.map((elem) => elem.split(" ").map(Number));
const board = Array.from(Array(n), () => Array(n).fill(0));

// 시계방향
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let score = 0;
const map = {};

function unvalid(x, y) {
  return x < 0 || y < 0 || x >= n || y >= n;
}

// 📌 ...students라고 해야 나머지 원소들을 복사한 새 배열이  된다.
for (let [s, ...likeStudents] of students) {
  let maxLiked = -1;
  let maxEmpty = -1;
  let bestPostion = null;

  // board 순회
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      let liked = 0;
      let empty = 0;

      // 이미 다른 좌표가 있는 경우
      if (board[row][col] !== 0) continue;

      //board[row][col] 상하좌우의 empty와 liked 학생 개수 센다.
      for (let i = 0; i < 4; i++) {
        const nx = row + dx[i];
        const ny = col + dy[i];

        if (unvalid(nx, ny)) continue;

        if (board[nx][ny] === 0) {
          empty++;
        }

        if (likeStudents.includes(board[nx][ny])) {
          liked++;
        }
      }

      // 📌 위에서 적은 잘못된 사고로 이걸 dir for문안에 적어 놓음 그래서 헤맴
      // 이중 for문이니까 자동으로 row 우선, 그 다음 열 우선
      if (maxLiked < liked || (maxLiked === liked && maxEmpty < empty)) {
        maxLiked = liked;
        maxEmpty = empty;
        bestPostion = [row, col];
      }
    }
  }

  // 📌 bestPostion이 undefined일 수 있다.
  if (bestPostion) {
    const [row, col] = bestPostion;
    board[row][col] = s;
    map[s] = [row, col];
    // debug();
  }
}

const scores = {
  0: 0,
  1: 1,
  2: 10,
  3: 100,
  4: 1000,
};

// 마지막 만족도 구하는 로직
// ✨map 사용해 접근함
for (let [s, ...likeStudents] of students) {
  const [row, col] = map[s];

  let likedCnt = 0;
  for (let i = 0; i < 4; i++) {
    const nx = row + dx[i];
    const ny = col + dy[i];

    if (unvalid(nx, ny)) continue;
    if (likeStudents.includes(board[nx][ny])) {
      likedCnt++;
    }
  }

  score += scores[likedCnt];
}

console.log(score);

// debug();
// function debug() {
//   board.forEach((elem) => console.log(elem.join(" ")));
// }
