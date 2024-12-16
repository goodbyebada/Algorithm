/**
 * 다른 사람 코드
 * 출처 :https://chamdom.blog/boj-21608/
 */

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input.shift(), 10);
const students = input.map((line) => line.split(" ").map(Number));

const board = Array.from({ length: N }, () => Array(N).fill(null));
const likes = Array.from({ length: N * N + 1 }, () => []);

// const directions = [
//   [-1, 0],
//   [1, 0],
//   [0, -1],
//   [0, 1],
// ];

// 상하좌우 접근 일차원 배열로 변경
const drow = [0, 1, 0, -1];
const dcol = [1, 0, -1, 0];

const scores = {
  0: 0,
  1: 1,
  2: 10,
  3: 100,
  4: 1000,
};

// 좌표 유효성 검사
function isValid(x, y) {
  return x >= 0 && x < N && y >= 0 && y < N;
}

// 한 case에 대한 수행
function arrageStudent(student, likeFriends) {
  let maxLikes = -1;
  let maxEmpty = -1;
  let bestPosition = null;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      // 값이 존재한다면 continue
      if (board[r][c] !== null) continue;

      let likeCount = 0;
      let emptyCount = 0;

      //상하좌우에 대한 확인
      //   emptyCount : 비어있는 칸의 개수
      //   likeCount : 해당 좌표의 (nr,nc)의 상하좌우의 좋아하는 학생 개수
      //   for (const [dr, dc] of directions) {
      for (let i = 0; i < 4; i++) {
        const nr = r + drow[i];
        const nc = c + dcol[i];

        if (!isValid(nr, nc)) continue;
        if (board[nr][nc] === null) emptyCount++;
        if (likeFriends.includes(board[nr][nc])) likeCount++;
      }

      if (
        likeCount > maxLikes ||
        (likeCount === maxLikes && emptyCount > maxEmpty)
      ) {
        // likeCount === maxLikes
        // 좋아하는 학생의 개수를 우선한다.
        // 만약 같다면, emptyCount를 기준으로 센다

        // 업데이트
        maxLikes = likeCount;
        maxEmpty = emptyCount;

        // 매번 업데이트 🌟
        bestPosition = [r, c];
      }
    }
  }

  //  최종 bestPostion 확정
  const [bestR, bestC] = bestPosition;
  board[bestR][bestC] = student;
}

//  ✨ for문에서 student ...likeFriends로 바로 접근할 수 있다.
// 굳이 splice || shift 사용안해도 된다.

//모든 studentsCase에 대해 수행한다.
for (const [student, ...likeFriends] of students) {
  likes[student] = likeFriends;
  arrageStudent(student, likeFriends);
}

let answer = 0;

// 만족도 계산 로직
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    const student = board[r][c];
    const likeFriends = likes[student];
    let likeCount = 0;

    // 확정 좌표의 상하좌우에  접근해 likeFreinds의 count를 센다.

    for (let i = 0; i < 4; i++) {
      const nr = r + drow[i];
      const nc = c + dcol[i];

      //   범위가 유효하고 likeFriends에 포함될때
      if (isValid(nr, nc) && likeFriends.includes(board[nr][nc])) {
        likeCount++;
      }
    }
    answer += scores[likeCount];
  }
}

console.log(answer);
