const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const board = input.slice(1).map((line) => line.split(" ").map(Number));
let sr = Math.floor(N / 2);
let sc = Math.floor(N / 2);

// ← ↓ → ↑
const dir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

// 좌측 기준 비율 배열
const baseProportion = [
  [0, 0, 0.02, 0, 0],
  [0, 0.1, 0.07, 0.01, 0],
  [0.05, 0, 0, 0, 0],
  [0, 0.1, 0.07, 0.01, 0],
  [0, 0, 0.02, 0, 0],
];

// 알파 위치 상대 좌표 (각 방향별로)
// ??
const alphas = [
  [2, 1], // ←
  [3, 2], // ↓
  [2, 3], // →
  [1, 2], // ↑
];

// 90도 반시계 회전
function rotate(p) {
  const res = Array.from({ length: 5 }, () => Array(5).fill(0));
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      res[5 - c - 1][r] = p[r][c];
    }
  }
  return res;
}

// 방향별 비율 배열 생성
function createProportions(base) {
  const result = [base];
  for (let i = 0; i < 3; i++) {
    result.push(rotate(result[i]));
  }
  return result;
}

// 범위 체크
function isInBoard(r, c) {
  return r >= 0 && r < N && c >= 0 && c < N;
}

const proportions = createProportions(baseProportion);

//  전역으로 설정
let totalOutSand = 0;

// 비율에 따라 모래 퍼뜨리기
function spreadByProportion(r, c, dirIndex) {
  const sand = board[r][c];
  board[r][c] = 0;

  const map = proportions[dirIndex];
  let left = sand;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const percent = map[i][j];
      if (percent > 0) {
        const nr = r + i - 2;
        const nc = c + j - 2;
        const spread = Math.floor(sand * percent);
        left -= spread;

        if (isInBoard(nr, nc)) {
          board[nr][nc] += spread;
        } else {
          totalOutSand += spread;
        }
      }
    }
  }

  return left; // 남은 모래 반환
}

// 알파 위치로 남은 모래 이동
function moveAlphaSand(r, c, dirIndex, remainingSand) {
  const [alphaR, alphaC] = alphas[dirIndex];
  const nr = r + alphaR - 2;
  const nc = c + alphaC - 2;

  if (isInBoard(nr, nc)) {
    board[nr][nc] += remainingSand;
  } else {
    totalOutSand += remainingSand;
  }
}

// 토네이도 이동 시뮬레이션
function moveTornado() {
  let r = sr;
  let c = sc;
  let len = 1;
  let dirIndex = 0;

  while (1) {
    // (우 하) (좌 상) 두 개씩 이동
    for (let repeat = 0; repeat < 2; repeat++) {
      // 한 방향에 대한 로직 수행
      for (let i = 0; i < len; i++) {
        r += dir[dirIndex][0];
        c += dir[dirIndex][1];

        // 한 위치에 대한 로직 수행

        const left = spreadByProportion(r, c, dirIndex);
        moveAlphaSand(r, c, dirIndex, left);

        // 목표에 도달시 종료
        // len이 (-1,0)이 될때까지 가기 때문에 미리 return 해야한다.
        if (r === 0 && c === 0) return;
      }

      //한 방향 끝나고 다른 방향 업데이트
      dirIndex = (dirIndex + 1) % 4;
    }

    // (우 하) (좌 상) 두 개씩 이동 -> 한 세트 끝나면 len에 대한 길이 업데이트
    len++;
  }
}

moveTornado();
console.log(totalOutSand);
