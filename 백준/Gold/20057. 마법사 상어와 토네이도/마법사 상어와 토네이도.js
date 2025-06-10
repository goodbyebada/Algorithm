const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const data = input.slice(1).map((line) => line.split(" ").map(Number));
let sr = Math.floor(N / 2);
let sc = Math.floor(N / 2);

// 허리케인 이동방향 (좌 하 우 상)
const dir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

// 비율 배열 (좌측 기준)
const p = [
  [0, 0, 0.02, 0, 0],
  [0, 0.1, 0.07, 0.01, 0],
  [0.05, 0, 0, 0, 0],
  [0, 0.1, 0.07, 0.01, 0],
  [0, 0, 0.02, 0, 0],
];

// 90도 반시계 회전 함수
function rotate90(arr) {
  const N = arr.length;
  const newArr = Array.from({ length: N }, () => Array(N).fill(0));
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      newArr[N - c - 1][r] = arr[r][c];
    }
  }
  return newArr;
}

const proportions = [p];
for (let i = 0; i < 3; i++) {
  proportions.push(rotate90(proportions[i]));
}

// 알파 위치 (토네이도 방향에 따라 모래 남은 위치)
const alphas = [
  [2, 1],
  [3, 2],
  [2, 3],
  [1, 2],
];

function solution() {
  let outerSand = 0;
  let tr = sr;
  let tc = sc;
  let curl = 0;
  let turn = 2;
  let now = 0;
  let proportion = proportions[0];

  while (!(tr === 0 && tc === 0)) {
    // 1. 토네이도 이동
    tr += dir[curl][0];
    tc += dir[curl][1];
    now += 1;

    // 옮겨놓고 sand 있던 자리 초기화
    let sand = data[tr][tc];
    data[tr][tc] = 0;

    let left = sand;

    // 2. 비율에 따라 모래 이동
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const amount = Math.floor(sand * proportion[r][c]);
        left -= amount;

        // proportion는 중앙좌표 (2,2)로 고정 되어있음
        // ex)  0.02 (1,2)라면, 실제로 (1-2, 2-2) 만큼 이동했기 때문에
        const nr = tr + r - 2;
        const nc = tc + c - 2;

        if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
          // board 안이라면 누적
          data[nr][nc] += amount;
        } else {
          // board 밖이라면
          outerSand += amount;
        }
      }
    }

    // 3. 알파 위치에 남은 모래 이동
    // const ar = tr + alphas[curl][0] - 2;
    // const ac = tc + alphas[curl][1] - 2;
    const ar = tr + dir[curl][0];
    const ac = tc + dir[curl][1];

    if (ar >= 0 && ar < N && ac >= 0 && ac < N) {
      data[ar][ac] += left;
    } else {
      outerSand += left;
    }

    // 4. 방향 회전 여부
    if (now === Math.floor(turn / 2) || now === turn) {
      curl = (curl + 1) % 4;
      proportion = proportions[curl];

      if (now === turn) {
        // 0으로 초기화
        now = 0;

        // 2씩 증가
        //길이는 계속 확장
        turn += 2;
      }
    }
  }

  console.log(outerSand);
}

solution();
