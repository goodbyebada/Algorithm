const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, w] = input[0].split(" ").map(Number);

const arr = Array.from({ length: n + 1 }, () => 0);

for (let i = 1; i < input.length; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  arr[a] = arr[a] + 1;
  arr[b] = arr[b] + 1;
}

let edges = 0;

// 📌 이어진 노드가 1개라면 leaf 노드이다.
// 1은 루트 노드이기에 제외한다.
for (let i = 2; i <= n; i++) {
  if (arr[i] === 1) edges++;
}

console.log(w / edges);
