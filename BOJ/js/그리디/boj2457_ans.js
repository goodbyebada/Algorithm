// 답 보고 다시 풀기
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const n = parseInt(input[0], 10);
const flowers = input.slice(1).map((line) => {
  const [startMonth, startDay, endMonth, endDay] = line.split(" ").map(Number);
  return { start: startMonth * 100 + startDay, end: endMonth * 100 + endDay };
});

// 꽃들을 피는 날 기준으로 오름차순, 피는 날이 같다면 지는 날 기준으로 내림차순 정렬(늦게 지는 순으로)
flowers.sort((a, b) => {
  if (a.start !== b.start) return a.start - b.start;
  return b.end - a.end;
});

// 100단위로 만들면 편하게 비교가 가능함
const start = 301;
const end = 1130;

let count = 0;
let currentEnd = start;
let index = 0;

while (currentEnd <= end) {
  let maxEnd = currentEnd;

  // n개 전부 순회
  // 현재 end보다 전에 피어야함
  // 가장 늦게 지는 꽃 찾기 🌸

  while (index < n && flowers[index].start <= currentEnd) {
    if (flowers[index].end > maxEnd) {
      maxEnd = flowers[index].end;
    }
    index++;
  }

  // 찾지 못함 -> 0 출력
  if (maxEnd == currentEnd) {
    console.log(0);
    return;
  }

  // 찾음 end 업데이트
  currentEnd = maxEnd;

  // 개수 세어준다.
  count++;
}

console.log(count);
