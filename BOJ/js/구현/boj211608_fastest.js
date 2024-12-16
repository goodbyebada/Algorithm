/**
 * 1등 코드
 */

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = Number(input.shift());

const studentInfoList = input.map((row) => row.split(" ").map(Number));
const space = Array.from(Array(n), () => Array(n).fill(0));

const drow = [0, 1, 0, -1];
const dcol = [1, 0, -1, 0];

const isRange = (row, col) => {
  return 0 <= row && row < n && 0 <= col && col < n;
};

const findBestPosition = (student, friendList) => {
  let maxLike = -1;
  let maxEmpty = -1;
  let bestPosition = null;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (space[row][col] !== 0) {
        continue;
      }

      let likeCount = 0;
      let emptyCount = 0;

      for (let i = 0; i < 4; i++) {
        const nrow = row + drow[i];
        const ncol = col + dcol[i];

        if (!isRange(nrow, ncol)) {
          continue;
        }

        if (space[nrow][ncol] === 0) {
          emptyCount++;
        }

        if (friendList.includes(space[nrow][ncol])) {
          likeCount++;
        }
      }

      if (
        maxLike < likeCount ||
        (maxLike === likeCount && maxEmpty < emptyCount)
      ) {
        maxLike = likeCount; // 수정된 부분
        maxEmpty = emptyCount;
        bestPosition = [row, col];
      }
    }
  }

  if (bestPosition) {
    const [row, col] = bestPosition;
    space[row][col] = student;
  }
};

const map = {};
for (const [studentInfo, ...friendList] of studentInfoList) {
  map[studentInfo] = friendList;
  //   map update
  //  boj21608_ans는 likes 배열을 만들어했는데, 여기는 map 사용
  //   나머지 로직은 다 동일함

  findBestPosition(studentInfo, friendList);
}

let ans = 0;

const scores = {
  0: 0,
  1: 1,
  2: 10,
  3: 100,
  4: 1000,
};

for (let row = 0; row < n; row++) {
  for (let col = 0; col < n; col++) {
    const student = space[row][col];

    // ✨map 사용해 접근함
    const friendList = map[student];
    let likeCount = 0;

    for (let i = 0; i < 4; i++) {
      const nrow = row + drow[i];
      const ncol = col + dcol[i];

      if (!isRange(nrow, ncol)) {
        continue;
      }

      if (friendList.includes(space[nrow][ncol])) {
        likeCount++;
      }
    }

    ans += scores[likeCount];
  }
}

console.log(ans);
