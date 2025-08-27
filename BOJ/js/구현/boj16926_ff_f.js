const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split("\n");

const [N, M, R] = input[0].split(" ").map(Number);
const map = [];

for (let i = 1; i < input.length; i++) {
  const line = input[i].split(" ").map(Number);
  map.push(line);
}

//   골드 5 구현

// 1. rotate 반시계 방향 함수

// 옮기려고 하는 목표 r, c가 i, i가 된다면 break
function rotate(layerCount) {
  // 좌 하 우 상 =>

  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  // layerCount 만큼 반복

  for (let i = 0; i < layerCount; i++) {
    // 시작 지점

    let r = i;
    let c = M - i - 1;
    let tmp;

    // 각 레이어마다 초기화되어야함!!
    let dirsIndex = 0;

    // 총 4방향 진행
    while (dirsIndex < 4) {
      // 목표 r, c
      let tr = r + dirs[dirsIndex][0];
      let tc = c + dirs[dirsIndex][1];

      // 좌표가 만족한다면
      if (i <= tr && tr < N - i && i <= tc && tc < M - i) {
        map[tr][tc] = map[r][c];

        // 옮길 r, c 업데이트

        r = tr;
        c = tc;
      } else {
        // 만족하지 않을 시 방향 바꿔야함
        dirsIndex++;
      }
    }
  }
}

function main() {
  const layerCount = Math.min(N, M) / 2;

  rotate(layerCount);

  console.log(map.join("\n"));
}

main();
