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

// 마지막에 count 갱신
function solution(flowers, start, end) {
  let count = 0;
  let currEnd = start;
  let flag = false;
  let index = 0;
  const n = flowers.length;
  let maxEnd = currEnd;

  // 핵심은 가아아아아아아아아아장 넓은 범위를 꽃을 찾는것이다.
  // nextstart가 <= currEnd 이면서 가질 수 있는 개개ㅐ개넓은 Maxend를 탐색한다.
  // index < n 을 만족하면서
  //MaxEnd를 currEnd로 재정의한다.
  // currEnd === maxEnd (업데이트 된 것이 없다면) => 멈춰! count 0
  // 업데이트 되었다면 count++

  // currEnd <= end 일때까지만 위를 반복한다.
  //currEnd > end이면 더 이상 탐색할 필요없다.

  while (currEnd <= end) {
    let maxEnd = currEnd;

    while (index < n && flowers[index].start <= currEnd) {
      if (maxEnd < flowers[index].end) {
        maxEnd = flowers[index].end;
      }
      index++;
    }

    if (maxEnd === currEnd) {
      return 0;
    }

    count++;
    currEnd = maxEnd;
  }

  return count;
}

console.log(solution(flowers, start, end));
