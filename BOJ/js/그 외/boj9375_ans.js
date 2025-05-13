const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
let T = +input[0];

// 각각 다른 조합이 몇 개 있느냐

// 의상 이름 | 종류 이름
// 같은 종류는 한 개만 입을 수 있다.

// 종류 | 종류 개수
// Map.has(key) +1, 아니라면 map.set()

function sol() {
  let answer = [];
  let index = 1;

  while (T--) {
    const map = new Map();
    const n = +input[index];

    // N(N의 인덱스) | (N의 인덱스)+1 <= index <= (N의 인덱스) + N
    const end = index + n;
    index++;

    while (index <= end) {
      const key = input[index].split(" ")[1];
      // map.set(key, (map.get(key) || 0) + 1);

      if (map.has(key)) {
        map.set(key, map.get(key) + 1);
      } else {
        map.set(key, 1);
      }

      index++;
    }

    let sum = 1;
    for (let count of map.values()) {
      sum *= count + 1;
    }
    answer.push(sum - 1);
  }

  console.log(answer.join("\n"));
}

sol();
