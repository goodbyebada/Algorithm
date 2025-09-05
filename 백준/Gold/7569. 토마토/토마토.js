// 3:22 ~ 4:32

// why...1

// 인접 상하좌우 앞 뒤 -> 3차원...? 영향을 준다.
// M * N * H

// 며칠이 지나면 토마토가 다 익는지 최소 일수
//  bfs
// 왜? 최단거리를 ->  돌아가지 않고 가까운 것부터 방문 + 중복 방문을 하지 않음

// N개의 줄 하나의 상ㅌ자에 담긴 토마토의 정보
// 가장 밑 ~ 가장 위

// 1: 익은 도마도
//  0 익지 않은 도마도
// -1 노도마도

const RED = 1;
const GREEN = 0;
const EMPTY = -1;

// 3차원 배열을 만든다.
// visited 3차원 배열을 만든다.
// 각 차원마다 익은 도마도를 찾는다.
// q = 에 넣는다.
//  상하좌우 앞 뒤 방향으로 방문한다.
// q에 넣을 때마다 count++
// 이미 방문한 좌표는 넣지 않는다.

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

let index = 0;
const [M, N, H] = input[index++].split(" ").map(Number);
const box = [];

for (let h = 0; h < H; h++) {
  let layer = [];
  for (let n = 0; n < N; n++) {
    layer.push(input[index++].split(" ").map(Number));
  }

  box.push(layer);
}

//  M 가로  N 상자 개수  H  세로

const dirs = [
  [0, 1, 0],
  [0, 0, 1],
  [0, -1, 0],
  [0, 0, -1],
  [1, 0, 0],
  [-1, 0, 0],
];

// function drawMap(d) {
//   console.log("=======", d);
//   box.map((elem) => {
//     console.log(elem.join("\n"));
//     console.log();
//   });
// }

let answer = 0;

// 모든 토마토가 이미 익어있는 상태 => 0이없고 1로 이뤄짐
//  토마토가 모두 익지는 못하는 상황
//  전부 -1, -1과 0. 혹은 뭔가 할라그랬는데 다 끊어져있어서 익지 못함
function findstart() {
  const startPos = [];
  const d = 0;
  let hasZero = false;

  //   zero 없다면 모두 익어있는 상태

  for (let i = 0; i < H; i++) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        // 익은 사과 넣기

        if (!hasZero && box[i][r][c] === 0) hasZero = true;
        if (box[i][r][c] === 1) {
          startPos.push([i, r, c, d]);
        }
      }
    }
  }

  return [hasZero, startPos];
}

function isAllRed() {
  for (let i = 0; i < H; i++) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        if (box[i][r][c] === 0) {
          return false;
        }
      }
    }
  }

  return true;
}

function bfs(startPos) {
  const q = startPos;
  let index = 0;

  while (q.length > index) {
    // console.log(q);
    // console.log(q[index]);

    const [h, r, c, d] = q[index++];

    for (let dir of dirs) {
      const ch = h + dir[0];
      const cr = r + dir[1];
      const cc = c + dir[2];

      if (ch < 0 || ch >= H) continue;
      if (cr < 0 || cr >= N) continue;
      if (cc < 0 || cc >= M) continue;

      if (box[ch][cr][cc] === 0) {
        q.push([ch, cr, cc, d + 1]);
        box[ch][cr][cc] = 1;

        // 익었따.
      }
    }

    answer = d;
  }
}

function main() {
  const [hasZero, startPos] = findstart();

  // 모두 익어있는 상태
  if (!hasZero && startPos.length > 0) return 0;

  bfs(startPos);

  // 도마도 모두 익지 못함
  if (!isAllRed()) return -1;

  return answer;
}

console.log(main());
