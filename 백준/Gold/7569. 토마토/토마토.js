// 3:22 ~ 4:32

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
const q = [];
let answer = 0;

let unripeTomato = 0;

// box init
for (let h = 0; h < H; h++) {
  let layer = [];
  for (let n = 0; n < N; n++) {
    layer.push(input[index++].split(" ").map(Number));
  }

  box.push(layer);
}

const dirs = [
  [0, 1, 0],
  [0, 0, 1],
  [0, -1, 0],
  [0, 0, -1],
  [1, 0, 0],
  [-1, 0, 0],
];

function checkUnripeTomato() {
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        // 🌟 refacotr
        // 안익은 도마도 count
        if (box[i][j][k] === 0) unripeTomato++;

        // 익은 도마도 push
        if (box[i][j][k] === 1) q.push([i, j, k, 0]);
      }
    }
  }
}

function bfs() {
  let index = 0;

  while (q.length > index) {
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
        // 🌟 안 익음 -> 익음으로 변함
        unripeTomato--;
      }
    }

    answer = d;
  }
}

function main() {
  checkUnripeTomato();

  // 🌟  안 익은 토마토의 유무로 분기처리
  if (unripeTomato === 0) return 0;

  bfs();
  return unripeTomato > 0 ? -1 : answer;
}

console.log(main());
