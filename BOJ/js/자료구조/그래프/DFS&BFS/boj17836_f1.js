// 17836번
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const [N, M, T] = input[0].split(" ").map(Number);

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
let gramTime = -1;

function BFS(map) {
  let index = 0;

  let q = [[0, 0, 0]];
  map[0][0] = 1;

  while (index < q.length) {
    const [cx, cy, time] = q[index++];

    for (let i = 0; i < 4; i++) {
      let nextX = cx + dx[i];
      let nextY = cy + dy[i];

      if (time > T) return -1;

      //   좌표 벗어났을 시
      if (nextX < 0 || nextY < 0 || nextX >= N || nextY >= M) continue;

      // next! 다음 방문이니까!
      if (nextX === N - 1 && nextY === M - 1) return time + 1;

      //   벽 || 방문했을 시
      if (map[nextX][nextY] === 1) continue;

      if (map[nextX][nextY] === 2)
        gramTime =
          time + 1 + Math.abs(nextX - (N - 1)) + Math.abs(nextY - (M - 1));

      q.push([nextX, nextY, time + 1]);
      map[nextX][nextY] = 1;
    }
  }

  // 공주님 좌표 방문 못할 경우
  return -1;
}

function sol(input) {
  const map = input.slice(1).map((elem) => elem.split(" ").map(Number));

  // 칼 없이 방문, 실패 시 -1(시간 초과, 방문 불가) 출력

  const noGramTime = BFS(map);

  // 둘 다 실패 시 -1이어야한다.

  // 하나가 -1이라면 , 나머지 하나가 T 이내인지 확인해야한다.
  // 둘 다 양수라면 minTime을 구한 후 T이내여야한다.

  if (noGramTime <= T && gramTime <= T) {
    if (noGramTime < 0 && gramTime > 0) return gramTime;
    if (noGramTime > 0 && gramTime < 0) return noGramTime;

    const minTime = Math.min(noGramTime, gramTime);
    if (minTime > 0) return minTime;
  }

  return "Fail";
}

console.log(sol(input));
