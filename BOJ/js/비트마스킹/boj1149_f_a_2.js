const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((x) => x.split(""));

// [key][nx][ny]
const visited = Array.from({ length: 64 }, () =>
  Array.from({ length: N }, () => Array(M).fill(false))
);

// start 지점 찾기 로직
let start = [0, 0];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "0") {
      start[0] = i;
      start[1] = j;
    }
  }
}

const keys = ["f", "e", "d", "c", "b", "a"];
const doors = ["F", "E", "D", "C", "B", "A"];

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let answer = -1;

// x y 0 0
const queue = [[...start, 0, 0]];

visited[0][start[0]][start[1]] = true;

// BFS 로직
while (queue.length > 0) {
  const [x, y, cnt, key] = queue.shift();

  // 먼저 도착 => 최단 거리 break
  if (map[x][y] === "1") {
    answer = cnt;
    break;
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    // 방문 불가인 경우
    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
    if (map[nx][ny] === "#" || visited[key][nx][ny]) continue;

    // key인 경우
    if (keys.includes(map[nx][ny])) {
      // indexOf O(N)이지만 keys가 6개 밖에 없기 때문에 사용해도 ㄱㅊㄱㅊ
      // ✨ charCodeAt으로 계산할 필요 없어 깔끔하다.
      const val = 1 << keys.indexOf(map[nx][ny]);
      const nextKey = key | val;

      // ✨ 방문했는지 우선 확인해, 큐에 들어가는 원소의 개수를 줄인다. => 풀 때 놓쳤다
      if (visited[nextKey][nx][ny]) continue;
      visited[nextKey][nx][ny] = true;
      queue.push([nx, ny, cnt + 1, nextKey]);
      continue;
    }

    // door인 경우
    if (doors.includes(map[nx][ny])) {
      const door = 1 << doors.indexOf(map[nx][ny]);
      const possibleOpen = door & key;

      // 맞는 열쇠 있으면 0보다 큼
      if (possibleOpen > 0) {
        visited[key][nx][ny] = true;
        queue.push([nx, ny, cnt + 1, key]);
      }

      continue;
    }

    // "."인 경우, "0"인 경우  => 신경 쓰지 않아도 되는 나머지인 경우
    visited[key][nx][ny] = 1;
    queue.push([nx, ny, cnt + 1, key]);
  }
}

console.log(answer);
