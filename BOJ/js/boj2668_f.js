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
    answer.push(i);
  }
}

function solution(input) {
  const N = +input[0];

  const list = input;
  list[0] = 0;
  var answer = [];

  for (let i = 1; i < list.length; i++) {
    const visited = Array(N + 1).fill(false);
    dfs(i, visited, list, answer);
  }

  answer = [...new Set(answer)].sort((a, b) => a - b);

  console.log(answer.length);
  console.log(answer.join("\n"));
}

solution(input);
