const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim();

// 해당좌표에 d가 있다.

function sol(N, M, r, c, room) {
  // 북 -> 동  시계방향
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const searchDirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  // 현재 위치
  let d = room[r][c];

  //   멈출때까지 모두 청소를 다 했을때까지
  //   dfs
  //   청소되지 않은 곳
  //   1이면 벽
  //   0이면 청소 x

  let index = 0;
  //   현재 위치
  const stack = [[r, c]];

  while (index < stack.length) {
    // 1. 반시계방향으로 탐색

    const [nr, nc] = stack[index++];

    for (let searchDir of searchDirs) {
      let cr = nr + searchDir[0];
      let cc = nc + searchDir[1];

      //   나갈 시
      if (cr < N || cc > M || cr >= 0 || cc >= 0) continue;

      //   벽일 시
      if (room[cr][cc]) continue;

      //
    }

    // 2. 모두 청소 시 , 현재 방향의 반대로 후진, 후진 후 벽이라면 작동 멈춤
  }
}
