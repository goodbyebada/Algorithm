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
  // 좌 하 우 상

  // 우 상 좌 하
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  // layerCount 만큼 반복
  for (let i = 0; i < layerCount; i++) {
    // 시작 지점

    let r = i;
    let c = i;
    let startVal = map[i][i];

    // 각 레이어마다 초기화되어야함!!
    let dirsIndex = 0;

    // 총 4방향 진행
    while (dirsIndex < 4) {
      // tr tc 를 r, c로 옮긴다.
      let tr = r + dirs[dirsIndex][0];
      let tc = c + dirs[dirsIndex][1];

      // 옮기려는 좌표가 처음 시작한 좌표라면 끝낸다.
      if (tr === i && tc === i) break;

      // 좌표가 만족한다면
      if (i <= tr && tr < N - i && i <= tc && tc < M - i) {
        //  🚨 밀어내기를 하니까 기존 값이 소실된다.
        // [r][c]에 옮기고 싶은 값[tr][tc]을 넣는다.
        // r =tr , c = tc 업데이트
        // tr = r+ dir[i], tc = c+ dir[i] -> 그 방향대로, r,c에 넣을 값을 찾는다.
        // r , c -> 처음 출발한,

        // 현재 값만 덮어씌우고, 다음칸은 나중에 처리된다.
        // tr tc를 i, i로 설정 , 오른쪽에 있는 걸 tr, tc로 옮긴다.
        // 방향 [우, 상 , 좌 , 하]

        map[r][c] = map[tr][tc];

        // 옮길 r, c 업데이트
        r = tr;
        c = tc;
      } else {
        // 만족하지 않을 시 방향 바꿔야함
        dirsIndex++;
      }

      map[r][c] = startVal;
    }
  }
}

function main() {
  const layerCount = Math.min(N, M) / 2;

  for (let i = 0; i < R; i++) {
    rotate(layerCount);
  }

  console.log(map.map((elem) => elem.join(" ")).join("\n"));
}

main();
