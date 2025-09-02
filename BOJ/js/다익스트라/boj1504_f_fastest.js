const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

/**
 * 다익스트라라고 무조건 MinHeap 이용하는게 이득이 아니다. 상황따라서 더 빠른 것 이용할것..
 *
 *  MinHeap 이용 시, O(N^2 * logN)
 *  이차원 배열 배회 시, O(N^2)
 *
 */

const [N, E] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));
const [v1, v2] = input[E + 1].split(" ").map(Number);

// 자기 자신으로 가는 거리는 0으로 초기화
for (let i = 1; i <= N; i++) {
  graph[i][i] = 0;
}

for (let i = 1; i <= E; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  graph[a][b] = c;
  graph[b][a] = c;
}

// 다익스트라 알고리즘 구현
function dijkstra(start) {
  const dist = Array(N + 1).fill(Infinity);
  const visited = Array(N + 1).fill(false);

  // 시작점의 거리는 0
  dist[start] = 0;

  // 1번 노드 부터 ~ N 노드까지 전부
  // 2번 노드
  for (let i = 1; i <= N; i++) {
    let min = Infinity;
    let minIndex = -1;

    //1.  방문하지 않은 정점 중 가장 가까운 정점 찾기
    for (let j = 1; j <= N; j++) {
      if (!visited[j] && dist[j] < min) {
        min = dist[j];
        minIndex = j;
      }
    }

    // 방문할 수 있는 정점이 없다. 모두 방문했을 시 break
    if (minIndex === -1) break;

    // 방문할 다음 인덱스 방문 체크
    visited[minIndex] = true;

    // 선택된 정점을 거쳐 가는 경로가 더 짧은지 검사

    // minIndex ~ 각 노드끼리의 거리
    for (let j = 1; j <= N; j++) {
      if (!visited[j] && graph[minIndex][j] !== Infinity) {
        // 방문하지 않았고, 인접 노드 거쳐 가는 경로가 짧은지 업데이트한다.
        dist[j] = Math.min(dist[j], dist[minIndex] + graph[minIndex][j]);
      }
    }
  }

  return dist;
}

// 각 시작점에서의 최단 거리 계산
const fromStart = dijkstra(1); // 1번 정점에서 시작
const fromV1 = dijkstra(v1); // v1에서 시작
const fromV2 = dijkstra(v2); // v2에서 시작

// 두 가지 가능한 경로 계산:
// 1. 1 -> v1 -> v2 -> N
// 2. 1 -> v2 -> v1 -> N
const path1 = fromStart[v1] + fromV1[v2] + fromV2[N];
const path2 = fromStart[v2] + fromV2[v1] + fromV1[N];

// 두 경로 중 더 짧은 것 선택 (경로가 없으면 -1 출력)
const answer = Math.min(path1, path2);
console.log(answer === Infinity ? -1 : answer);
