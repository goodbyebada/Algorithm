function dfs(i, graph, visited, finished, result) {
  visited[i] = true;

  let v = graph[i];

  if (!visited[v]) {
    dfs(v, graph, visited, finished, result);
  } else if (!finished[v]) {
    // 순환하는 v를 다 넣겠다.

    // 시작했던 index(v) 부터 현재 index(i)전까지 넣겠다.
    while (v !== i) {
      result.push(v);

      // v(인덱스)
      v = graph[v];
    }

    result.push(i);
  }

  // finshed 이미 방문한 순환 트리는 방문하지 않기 위해 존재
  // ✨ 시간 단축
  // set 안 써도 된다. 중복 X
  finished[i] = true;
}

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let n = Number(input[0]);

let graph = [0];
for (let i = 1; i <= n; i++) {
  graph.push(Number(input[i]));
}

let visited = new Array(n + 1).fill(false);
let finished = new Array(n + 1).fill(false);
let result = [];

for (let i = 1; i <= n; i++) {
  if (!visited[i]) dfs(i, graph, visited, finished, result);
}

result.sort((a, b) => a - b);
console.log(result.length + "\n" + result.join("\n"));
