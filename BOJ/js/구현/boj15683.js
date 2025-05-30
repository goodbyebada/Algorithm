// 감시
// https://www.acmicpc.net/problem/15683

// CCTV 회전가능
// 사각지대의 최소 크기를 구하는 프로그램 작성
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [nums, ...arr] = fs.readFileSync(filePath).toString().trim().split("\n");

// 시작점 잡고 4방향 돌면서 이동 -> 다음 시작점
// 시작점은 정해져있기 때문에 DFS는 index만 넘겨주면 된다.
const [N, M] = nums.split(" ").map(Number);
let map = arr.map((row) => row.split(" ").map(Number));
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// CCTV 좌표
const cctv = [];

// cctv 번호에 따라 한 방향에서 방문해야하는 좌표 간격(현재 방향 + dir)
const addedDirectons = [0, [0], [0, 2], [0, 1], [0, 1, 2], [0, 1, 2, 3]];
let MIN = Number.MAX_SAFE_INTEGER;

// CCTV 좌표 업데이트
function findCCTV(cctv, map) {
  ㄴ;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (map[row][col] > 0 && map[row][col] !== 6) cctv.push([row, col]);
    }
  }
}

// 만약 L번째 cctv라면 최소를 검사한 뒤 return
// 한 cctv에 대해 4개의 방향을 수행한다.
function DFS(index, L, map) {
  // 끝나는 조건문
  if (index === L) {
    const curr = count(map);
    MIN = Math.min(MIN, curr);
    return 0;
  }

  const [x, y] = cctv[index];

  //   90도 방향
  for (let currDir = 0; currDir < 4; currDir++) {
    // 초기화 🚨
    let tmp = [...map.map((elem) => [...elem])];
    //   업데이트
    checkOneDirection(x, y, N, M, tmp, currDir);
    DFS(index + 1, L, tmp);
  }
}

// cctv 4방향 -> 재귀
// cctv 번호에 따라 -> 한 각도에 봐야할 방향의 갯수, 각도(감시 가능 영역) 있음
function checkOneDirection(x, y, N, M, map, currDir) {
  // 1. cctv 번호를 알아야함
  const cctvNum = map[x][y];

  for (let addedDir of addedDirectons[cctvNum]) {
    // 2. 한 방향에 대한 (90도 에 대한 수행임) => 현재 좌표 + [이동 좌표]
    const cd = (currDir + addedDir) % 4;
    let cx = x;
    let cy = y;

    while (1) {
      cx += dir[cd][0];
      cy += dir[cd][1];

      // 탈출 조건
      if (cx < 0 || cy < 0 || cx >= N || cy >= M) break;
      if (map[cx][cy] === 6) break;

      //   cctv 있을ㄹ때나 이미 채워져있다면
      if (map[cx][cy] > 0 || map[cx][cy] === -1) continue;
      map[cx][cy] = -1;
    }
  }
}

// 사각지대 count return
function count(map) {
  let answer = 0;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (map[row][col] === 0) answer++;
    }
  }

  return answer;
}

function sol() {
  // index
  findCCTV(cctv, map);

  //
  const localMap = [...map.map((elem) => [...elem])];
  DFS(0, cctv.length, localMap);

  console.log(MIN);
}

sol();
