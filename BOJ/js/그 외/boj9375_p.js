const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
let T = +input[0];

// 각각 다른 조합이 몇 개 있느냐

// 의상 이름 | 종류 이름
// 같은 종류는 한 개만 입을 수 있다.

// 종류 | 종류 개수
// Map.has(key) +1, 아니라면 map.set()

function sol() {
  let n = 1;
  let pos;
  let end;
  let answer = [];

  while (T--) {
    const map = new Map();
    pos = +input[n];

    end = n + pos + 1;
    // 포함 X
    // slice 원본 배열 안 건듬, start, end
    // start 생략 시 0으로 간주
    // ✨ slice 시간 O(N) 걸린다. index로 순회하면 복사 비용과 시간 단축할 수 있다.
    const list = input.slice(n, end);

    // 🚨 실수 1
    // slice되어 1 ~ pos 까지 접근해야함
    for (let i = 1; i < list.length; i++) {
      const key = list[i].split(" ")[1];

      // 🚨 실수 2
      // const [key] = list[i].split(" ")[1];
      //  key는 문자열이기 때문에 [mask,face] face[1]에 접근함
      // 얼탱 없는 실수

      if (map.has(key)) {
        map.set(key, map.get(key) + 1);
        continue;
      }
      map.set(key, 1);
    }

    let sum = 1;
    for (let count of map.values()) {
      sum *= count + 1;
    }
    answer.push(sum - 1);

    n = end;
  }

  console.log(answer.join("\n"));
}

sol();
