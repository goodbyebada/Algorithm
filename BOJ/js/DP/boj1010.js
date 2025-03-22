const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let T = +input.shift();
const list = input.map((ele) => ele.split(" ").map(Number));

for (let idx = 0; idx < T; idx++) {
  const [n, m] = list[idx];

  if (m < n || n === 0 || m === 0) {
    console.log(0);
    continue;
  }

  if (n === m) {
    console.log(1);
    continue;
  }

  if (n === m - 1 || n === 1) {
    console.log(m);
    continue;
  }

  let numerators = [];
  let devides = [];
  for (let i = m - n + 1; i <= m; i++) {
    numerators.push(i);
  }

  for (let i = 1; i <= n; i++) {
    devides.push(i);
  }

  const numerator = numerators.reduce((acc, curr) => acc * curr, 1);
  const devide = devides.reduce((acc, curr) => acc * curr, 1);

  console.log(numerator / devide);
}
