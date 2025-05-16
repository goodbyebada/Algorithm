// 가능 여부를 판단 => "YES" "NO"
// 도시를 또 방문해도 가능하다.
// 여행 계획에도 중복 도시가 있다.

// 1이면 연결
// 0이면 연결 안됨

// 마지막에서는 여행 계획

// 1. 그래프 작성 -> 연결 리스트로 작성
// 2. 마지막 여행 계획 루트 -> A, B 사이마다 DFS -> 찾는다면, true, 못 찾으면 false
// 3. 가능하면 YES 불가능하면 NO

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim();

function solution(input) {
  const inputs = input.split("\n");

  const N = +inputs[0];
  const M = +inputs[1];

  const map = inputs.slice(2, 2 + N).map((elem) => elem.split(" ").map(Number));

  // index, 노드 이름 0부터 시작으로 통일할거임
  // trip node -1로 들어가야함
  const tripList = inputs[2 + N].split(" ").map(Number);

  const graph = Array(N)
    .fill(0)
    .map(() => []);

  //     그래프 만들기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      if (map[i][j]) graph[i].push(j);
    }
  }

  function DFS(startNode, endNode, N, graph) {
    //         방문 여부
    const visited = Array(N).fill(false);
    const stack = [startNode];

    while (stack.length > 0) {
      const nowNode = stack.pop();

      if (nowNode === endNode) return true;

      for (let adjNode of graph[nowNode]) {
        //                 방문했다면 contiue
        if (visited[adjNode]) continue;
        stack.push(adjNode);
        visited[adjNode] = true;
      }
    }

    return false;
  }

  for (let i = 0; i < tripList.length - 1; i++) {
    const startNode = tripList[i];
    const endNode = tripList[i + 1];

    if (DFS(startNode - 1, endNode - 1, N, graph)) continue;
    else return "NO";
  }

  return "YES";
}

console.log(solution(input));
