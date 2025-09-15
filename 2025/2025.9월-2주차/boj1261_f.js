const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let index = 0;
let map = [];

const [M, N] = input[index++].split(" ").map(Number);

const visited = Array(N)
  .fill(0)
  .map(() => Array(M).fill(false));

// init
for (let i = index; i < input.length; i++) {
  // ‼️ 입력 잘 확인해라. ""인지 " "인지 !
  const row = input[i].split("").map(Number);
  map.push(row);
}

const dirs = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

//   bfs => 큐에 벽 부숨횟수함께 기록 큐를 다 비울 때까지
// O(100^2)
// ‼️ 머리로 알 것 같아도 로직 써놓고 코드짜자 , 코드 짜다가 조건 다 놓침

// 다익스트라도 가능
// O (NlogN) => 2*100

// 목표지점까지 최단거리구하기

//  목표 N-1, M-1
function bfs(targetX, targetY) {
  let index = 0;
  const q = [[0, 0, 0]];
  visited[0][0] = true;
  let min = Infinity;

  while (q.length > index) {
    const [cx, cy, cnt] = q[index++];

    console.log(q);

    // 도착점 도착
    if (cx === targetX && cy === targetY) {
      console.log(cnt);
      if (cnt === 0) return 0;
      if (min > cnt) min = cnt;
    }

    for (let dir of dirs) {
      const mx = cx + dir[0];
      const my = cy + dir[1];

      // ‼️   x, y <-> r, w 인지 확정하고 문제 풀 것
      //   문제에서는 x,y로 주어짐
      //x(row) y(col)로 놓아서 범위 설정 오류남
      //   mx >= M || my >= N
      //  아님 파라미터에 의존하던가

      if (mx < 0 || my < 0 || mx > targetX || my > targetY) continue;

      if (visited[mx][my]) continue;

      // ‼️ 방문 체크
      visited[mx][my] = true;

      // ‼️ 벽이라면
      if (map[mx][my]) {
        q.push([mx, my, cnt + 1]);
        continue;
      }

      q.push([mx, my, cnt]);
    }
  }

  return min;
}

// 가로 M
// 세로 N
function sol() {
  const answ = bfs(N - 1, M - 1);
  console.log(answ);
}

sol();
