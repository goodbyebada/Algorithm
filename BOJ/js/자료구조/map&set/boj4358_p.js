const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputs = require("fs").readFileSync(path).toString().trim().split("\n");

sol(inputs);
// 최대 10^6 그루
// 종 10^4

function sol(inputs) {
  const treeMap = {};

  let sum = 0;

  for (let tree of inputs) {
    if (treeMap[tree]) {
      treeMap[tree] += 1;
    } else {
      treeMap[tree] = 1;
    }

    sum++;
  }

  const answer = Object.entries(treeMap)
    .sort()
    .map((elem) => [elem[0], ((elem[1] / sum) * 100).toFixed(4)].join(" "));

  console.log(answer.join("\n"));
}
