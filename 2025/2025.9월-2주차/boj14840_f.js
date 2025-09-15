// 실버 1 쉬운 최단거리였다능

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// N 세로크기 => 행
// M 가로 크기 => 열
let index = 0;
const [N, M] = input[index++].split(" ").map(Number);

// map
const map = Array(N)
  .fill(0)
  .map(() => Array(M).fill(-1));

// 거리 map
const distMap = Array(N)
  .fill(0)
  .map(() => Array(M).fill(-1));

for (let row = 0; row < N; row++) {
  const line = input[index++].split(" ").map(Number);

  for (let col = 0; col < M; col++) {
    if (line[col] === 2) {
      startPos = [row, col];
    }
    map[row][col] = line[col];
  }
}

// 2를 찾아야한다.
// 지도가 주어지면 모든 지점에 대해서 목표지점까지의 거리를 구하여라.
// 모든 지점에 대해 목표 지점까지의 거리..
// 0 : 갈 수 없는 땅
// 1 : 갈 수 있는 땅
// 2 : 목표 지점
// 1 인데 가지 못함  그럼 -1임

// 초기화를 -1로 한다. 상하좌우 방문하다
// 각 지점에서 -> 목적지까지 가기 부담시럽다. => 목적지에서 출발한다.
// bfs
// 큐에 넣고 가까운 순 부터 방문한다.
// [좌표]
// 범위를 벗어나거나, 이미 방문했다면 continue
// 0이라면 거리 map[][] = 0으로 초기화 후 continue

// 방문하지 않았고 (-1이 아니고), 1 갈 수 있는 땅이라면
// 거리map[][] = 거리map[][] +1
function bfs(r, c) {
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let index = 0;
  const q = [[r, c]];
  distMap[r][c] = 0;

  while (index < q.length) {
    const [cr, cc] = q[index++];

    for (let [dr, dc] of dirs) {
      const nr = cr + dr;
      const nc = cc + dc;

      // 범위 벗어남
      if (nr < 0 || nc < 0 || nr >= N || nc >= M) continue;

      // 조건 최소화
      // 아직 방문하지 않았고, 갈 수 있는 지점이라면!
      if (distMap[nr][nc] === -1 && map[nr][nc] !== 0) {
        q.push([nr, nc]);
        distMap[nr][nc] = distMap[cr][cc] + 1;
      }

      // // 0일 때 0으로 초기화
      // if (map[nr][nc] === 0) {
      //   distMap[nr][nc] = 0;
      //   continue;
      // }

      // if (distMap[nr][nc] >= 0) continue;
    }
  }
}

function sol() {
  const [r, c] = startPos;
  bfs(r, c);

  // 🚨 BFS로 방문하지 못하는 지점이 존재한다!
  // map에 0으로 표시되어있으면 dist도 0으로 표시해야하는데, bfs로 방문하지 못해 -1로 남아있게 되는 부분이 있다.
  for (let i = 0; i < N; i++) {
    let line = "";
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0) {
        line += "0 ";
      } else {
        line += `${distMap[i][j]} `;
      }
    }
    console.log(line.trim());
  }

  // distMap 출력
}
sol();
