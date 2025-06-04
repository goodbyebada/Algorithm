// 흙길 보수하기

// 8 12 개수 2개 길이: 3+1(12)
// 13 ~15 (2)
//  15 18 개수 1개
// 길이가 <= L이하면 반영해서 진행

// => 정렬
// 1. 하나만 걸친다는 걸 어떻게 구현할 것인가
// 2. 비교를 어떻게 할 것인가?

// 🚨 답지보고 풀었다.
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, l] = input[0].split(" ").map(Number);

// 웅덩이 정보 이차원 배열로
const puddles = input.slice(1).map((line) => line.split(" ").map(Number));

// 시작 위치 기준 정렬
puddles.sort((a, b) => a[0] - b[0]);

let result = 0;
let boundary = puddles[0][0];

for (const [start, end] of puddles) {
  if (start > boundary) {
    boundary = start;
    // 이미 덮인 영역보다 뒤에 시작하면 갱신
  }

  const diff = end - boundary;

  if (diff <= 0) continue;
  // 이미 다 덮여있으면 패스

  const count = Math.ceil(diff / l);
  // 필요한 널빤지 개수

  boundary += count * l;
  // 새롭게 널빤지 놓은 후 갱신
  result += count;
}

console.log(result);
