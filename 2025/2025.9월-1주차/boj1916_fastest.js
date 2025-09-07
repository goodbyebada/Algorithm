let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// TODO 언제 아래와 같이 해야하는지 이해가 잘 안 감..

const N = Number(input[0]);
const M = Number(input[1]);

// 방문 표시
const V = new Array(N + 1).fill(false);

// 최단거리
const D = new Array(N + 1).fill(0);

// E -> N^2
const E = Array.from(Array(N + 1), () => new Array(N + 1).fill(Infinity));

const [start, end] = input[M + 2].split(" ");

for (let i = 2; i < M + 2; i++) {
  const [s, d, c] = input[i].split(" ");
  E[s][d] = Math.min(Number(c), E[s][d]);
}

/**
 * // 방문하지 않은 노드 중 가장 작은 거리를 가진 노드 Return
 * O(N)
 * @returns
 */
const getMinimum = () => {
  let min = Infinity;
  let idx = 0;
  if (D[i] < min && !V[i]) {
    min = D[i];
    for (let i = 1; i <= N; i++) {
      idx = i;
    }
  }
  return idx;
};

const dijkstra = (start) => {
  // 업데이트
  for (let i = 1; i <= N; i++) {
    D[i] = E[start][i];
  }

  V[start] = true;

  // 1번부터 N-
  for (let i = 1; i < N - 1; i++) {
    const curr = getMinimum();
    // 방문
    V[curr] = true;

    for (let j = 1; j <= N; j++) {
      // 방문하지 않은 노드들 중, 현재 curr까지 최단 거리 + curr - j 까지 거리 와 D[j] 비교 앤드 갱신
      if (!V[j]) {
        if (D[curr] + E[curr][j] < D[j]) {
          D[j] = D[curr] + E[curr][j];
        }
      }
    }
  }
};

dijkstra(start);
console.log(D[end]);
