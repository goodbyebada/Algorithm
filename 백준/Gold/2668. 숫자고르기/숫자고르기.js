const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function dfs(i, visited, list, answer) {
  v = list[i];
  visited[i] = true;

  if (!visited[v]) dfs(v, visited, list, answer);

  //     순환.
  if (visited[v] && list[v] === i) {
    answer.push(v);
    answer.push(i);
  }
}

function solution(input) {
  const N = +input[0];

  const list = input;
  list[0] = 0;
  let answer = [];

  for (let i = 1; i <= N; i++) {
    const visited = Array(N + 1).fill(false);
    dfs(i, visited, list, answer);

    answer = [...new Set(answer)];
  }

  answer.sort((a, b) => a - b);

  console.log(answer.length);
  answer.forEach((elem) => console.log(elem));
}

solution(input);
