const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

sol(input);

function sol(input) {
  const N = +input[0];

  for (let i = 1; i <= N; i++) {
    const [a, b] = input[i]
      .split(" ")
      .map(Number)
      .sort((a, b) => b - a);

    const r = GCD(a, b);
    console.log(LCD(a, b, r));
  }
}

// a > b
function GCD(a, b) {
  let r;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }

  return a;
}

function LCD(a, b, r) {
  return (a * b) / r;
}
