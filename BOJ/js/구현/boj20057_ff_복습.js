const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const board = input.slice(1).map((line) => line.split(" ").map(Number));

// 정중앙
let sr = Math.floor(N / 2);
let sc = Math.floor(N / 2);

const dir = [
  [0, -1], // ←
  [1, 0], // ↓
  [0, 1], // →
  [-1, 0], // ↑
];

// 비율 배열 (좌측 기준)
// 좌 하 우 상 기준으로 => 반시계 방향
const p = [
  [0, 0, 0.02, 0, 0],
  [0, 0.1, 0.07, 0.01, 0],
  [0.05, 0, 0, 0, 0],
  [0, 0.1, 0.07, 0.01, 0],
  [0, 0, 0.02, 0, 0],
];

/**
 *
 * 반시계 방향으로 회전
 * 
  90도 회전일 시 행과 열은 무조건 바뀜
  [r,c] => [c,r]
  방향에 따라 [N-c-1,r] [c,N-r-1]

  반시계 방향 [0,0] => [4,0]
 */
function rotate(p) {
  const array = Array.from({ length: 5 }, () => Array(5).fill(0));
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      array[5 - c - 1][r] = p[r][c];
    }
  }
  return array;
}

// 방향에 따라 참고할 비율 배열
const proportion = [p];
for (let i = 0; i < 3; i++) {
  // 🔑 바로 직전 방향의 비율의 반시계 방향임
  proportion.push(rotate(proportion[i]));
}

function solution() {
  let tr = sr;
  let tc = sc;

  let count = 0;
  let flag = 0;
  let dirIndex = 0;
  let count_max = 1;

  // 보드 밖에 있는 모래의 양
  let answer = 0;

  while (!(tr === 0 && tc === 0)) {
    // 1. 이동
    tr += dir[dirIndex][0];
    tc += dir[dirIndex][1];

    count += 1;

    // 2. 모래 옮기기, 초기화 잊으면 안됨
    const sand = board[tr][tc];
    board[tr][tc] = 0;

    // 모래가 있다면 수행~
    if (sand !== 0) {
      let left = sand;

      // a. 비율 있는 칸 옮기기, board에 누적
      const propMap = proportion[dirIndex];
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          if (propMap[r][c]) {
            const cr = tr + r - 2;
            const cc = tc + c - 2;
            const currentSand = Math.floor(sand * propMap[r][c]);

            // 맞는 좌표
            if (cr >= 0 && cr < N && cc >= 0 && cc < N) {
              board[cr][cc] += currentSand;
            } else {
              answer += currentSand;
            }

            left -= currentSand;
          }
        }
      }

      // b. 알파 자리 옮기기 (현재 위치 기준: 방향이랑 똑같음)

      const alpahR = tr + dir[dirIndex][0];
      const alpahC = tc + dir[dirIndex][1];

      // 맞는 좌표
      if (alpahR >= 0 && alpahR < N && alpahC >= 0 && alpahC < N) {
        board[alpahR][alpahC] += left;
      } else {
        answer += left;
      }
    }

    //마지막 단계 ~ : 한 dir이 바뀔 때
    if (count === count_max) {
      count = 0;
      dirIndex = (dirIndex + 1) % 4;

      // count_max 업데이트
      if (flag === 0) flag = 1;
      else {
        flag = 0;
        count_max += 1;
      }
    }
  }

  console.log(answer);
}

solution();
