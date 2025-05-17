const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const data = input.slice(1).map((elem) => elem.split(" ").map(Number));

// 끝나는 회의시간 기준으로 정렬
// const sorted = data.sort((a, b) => a[1] - b[1]);
// 배열 정렬 (끝나는 시간 기점)
const sorted = data.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]));

function solution(list) {
  let count = 0;
  let index = 0;
  let currEnd = list[index][1];
  index++;
  count++;

  //    빨리 끝나는 시간을 기준으로 오름차순
  //     가장 빨리 끝나는 회의를 연속해서 찾아야한다.
  //     - 겹치면 안됨, -> nextstart < currEnd
  //     아니라면 선택한다. currEnd 업데이트
  //     list를 순회한다.

  while (index < list.length) {
    const [nStart, nEnd] = list[index];
    index++;

    if (nStart < currEnd) continue;
    currEnd = nEnd;
    count++;
  }

  return count;
}

console.log(solution(sorted));
