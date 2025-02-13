// 다른 사람 풀이
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, R] = input.shift().split(" ").map(Number);
const edge = input.map((x) => x.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }, () => false);

// 인접 리스트 생성
for (let [a, b, d] of edge) {
  graph[a].push([b, d]);
  graph[b].push([a, d]);
}

let maxBranch = -1;
let pillar = 0;
let isFindGiga = false;

// ✨ 기둥의 길이와 가지의 길이를 한번에 계산한 로직이다.
const dfs = (x, w) => {
  // 최댓값
  maxBranch = Math.max(maxBranch, w);

  if (!isFindGiga) {
    // ✨ 트리로 만들지 않고, 그래프로 한다면 부모노드를 제외했는가 고려해야함

    // 루트 노드이고, 루트 노드와 연결된 노드의 개수들이 1보다 크다면 (자식 노드가 2개 이상이라면)
    // 루트 노드가 아니고, 노드와 연결된 노드의 개수들이 2보다 크다면 (부모 노드 제외)
    //  => 기가 노드의 정의

    if ((x === R && graph[x].length > 1) || (x !== R && graph[x].length > 2)) {
      // 기둥 누적 값 갱신
      pillar = w;
      isFindGiga = true;
    }
  }

  for (let [next, weight] of graph[x]) {
    if (visited[next]) continue;
    visited[x] = true;
    // 누적 값이 필요하기 때문에 w 값 업데이트
    dfs(next, w + weight);
  }
};

// 문제에서 주어진 R (rootNode)
visited[R] = true;
dfs(R, 0);

if (isFindGiga) {
  console.log(pillar, maxBranch - pillar);
} else {
  console.log(maxBranch, 0);
}
