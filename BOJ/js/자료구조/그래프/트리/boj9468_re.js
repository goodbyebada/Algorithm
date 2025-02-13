// 9468 다시 구현하기
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let inputIdx = 0;
const answer = [];

while (1) {
  const [n, k] = input[inputIdx++].split(" ").map(Number);

  if (n === 0 && k === 0) break;

  const arr = new Array(n + 1).fill(0);
  const parent = new Array(n + 1).fill(0);

  //   초기화
  let parrIdx = -1;
  parent[0] = -1;
  arr[0] = -1;

  // index의 값으로 구할 예정
  //   ✅ map(Number)을 생략하면 더 효율적이게 된다. 어차피 순회할 것이고, 순회시에 val을 str -> number로 바꾸면 효율적이다.
  const list = input[inputIdx++].split(" ");
  list.forEach((val, idx) => {
    arr[idx + 1] = +val;
    if (arr[idx + 1] === k) target = idx + 1;
    if (arr[idx + 1] !== arr[idx] + 1) parrIdx++;
    parent[idx + 1] = parrIdx;
  });

  //   조부는 같고 부모는 달라야한다.
  //    부모 parent[target]
  //   조부 parent[parent[target]]

  let count = 0;
  for (let i = 1; i < parent.length; i++) {
    if (
      parent[target] !== parent[i] &&
      parent[parent[target]] === parent[parent[i]]
    ) {
      count++;
    }
  }
  answer.push(count);
}

console.log(answer.join("\n"));
