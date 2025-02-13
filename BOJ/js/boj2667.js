// 4:33
// 그래프

/**
 * 1 집 0
 * 0 집 x
 *
 *
 * BFS
 * 1. map을 만든다.
 * 2. 1을 찾는다.
 * 3. answer 리스트를 만든다  []
 * bfs로 순회하며 방문할때마다 cnt++을 한다.
 * 3. 0이면 갈 수 없다. 더 이상 갈 곳이 없으면 answer에 cnt의 값을 넣는다.\
 * 4. 출력시 answer.length , answer.sort 후 출력한다. answer.join("\n")을 이용한다.
 *
 * 총 단지 수 출력
 * 각 단지 내 집의 수를 오름차순으로 정렬
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const size = +input[0];
const answer = [];

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const map = Array.from({ length: size }, () => 0);
const visited = Array.from({ length: size }, () => new Array(size).fill(false));

for (let i = 1; i <= size; i++) {
  map[i - 1] = input[i].split("").map(Number);
}

const search = () => {
  for (let cx = 0; cx < size; cx++) {
    for (let cy = 0; cy < size; cy++) {
      if (map[cx][cy] === 0 || visited[cx][cy]) continue;
      BFS(cx, cy);
    }
  }
};

const BFS = (x, y) => {
  const queue = [[x, y]];
  visited[x][y] = true;
  let homeCnt = 1;

  while (queue.length !== 0) {
    const [currX, currY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let nowX = currX + dx[i];
      let nowY = currY + dy[i];

      if (nowX < 0 || nowY < 0 || nowX >= size || nowY >= size) continue;
      if (map[nowX][nowY] !== 1 || visited[nowX][nowY]) continue;
      queue.push([nowX, nowY]);
      visited[nowX][nowY] = true;
      homeCnt++;
    }
  }

  answer.push(homeCnt);
};

search();
console.log(answer.length);
if (answer.length) {
  // 👺 sort 콜백함수 명시적으로 사용할 것
  console.log(answer.sort((a, b) => a - b).join("\n"));
}
