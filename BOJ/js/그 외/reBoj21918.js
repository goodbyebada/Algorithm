const fs = require("fs");

function main() {
  const input = fs
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n");

  const [N, M] = input[0].split(" ").map(Number);
  const lights = new Uint8Array(N);
  //   TypedArray
  //   0~255 8비트 unsigned로 변환
  const intialStates = input[1].split(" ").map(Number);
  for (let i = 0; i < N; i++) {
    lights[i] = intialStates[i];
  }

  //   i = 2; i < 2+M
  const commands = input.slice(2, 2 + M).map((line) => {
    const parts = line.split(" ");
    return [Number(parts[0]), Number(parts[1]), Number(parts[2])];
  });

  for (let c = 0; c < M; c++) {
    const [a, b, cVal] = commands[c];

    if (a === 1) {
      lights[b - 1] = cVal;
      continue;
    }

    if (a === 2) {
      const l = b - 1;
      const r = cVal;

      for (let j = l; j < r; j++) {
        lights[j] ^= 1;
        // XOR 연산 같을 때 0, 다를 때 1
      }
      continue;
    }

    if (a === 3) {
      const l = b - 1;
      const r = cVal;

      for (let j = l; j < r; j++) {
        lights[j] = 0;
      }
      continue;
    }

    if (a === 4) {
      const l = b - 1;
      const r = cVal;

      for (let j = l; j < r; j++) {
        lights[j] = 1;
      }
      continue;
    }
  }

  console.log(lights.join(" "));
}

main();
