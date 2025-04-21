// 답 보고 다시 풀기
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const n = parseInt(input[0], 10);

// 100 단위로 풀면 비교가 편하다.
const flowers = input.slice(1).map((line) => {
  const [startMonth, startDay, endMonth, end] = line.split(" ").map(Number);
  return { start: startMonth * 100 + startDay, end: endMonth * 100 + end };
});

flowers.sort((a, b) => {
  if (a.start != b.start) return a.start - b.start;
  return b.end - a.end;
});

sol();

function sol() {
  const start = 301;
  const end = 1130;

  // 초기화
  // 피어있어야하는 startday로 초기화
  let currentEnd = start;
  let count = 0;
  let idx = 0;

  while (currentEnd <= end) {
    let maxEnd = currentEnd;

    while (idx < n && flowers[idx].start <= currentEnd) {
      if (flowers[idx].end > maxEnd) {
        maxEnd = flowers[idx].end;
      }
      idx++;
    }

    // 못 찾았다.
    if (maxEnd === currentEnd) {
      console.log(0);
      return;
    }

    // maxEnd로 업데이트
    currentEnd = maxEnd;
    count++;
  }

  console.log(count);
}
