const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

/**
 *
 * 1. 최대 개수이기 때문에 중간에 빵꾸가 나도 된다. -> 시간 폭이 작은 걸 우선순위로 두고 해야한다.
 * 2. 회의 시간 순으로 정렬한다.
 * 3. 순서대로 조회한다. -> 범위가 겹치면 버린다. -> 이전 데이터를 알고 있어야한다.
 *
 * 4. 갱신되는 끝나는 시간이 < 2^31 -1 조건을 만족할 때까지 반복
 *
 * O(NlogN)
 */

// 🚨 많은 회의실을 넣으려면 많은 회의시간을 확보해야한다 -> 빨리 끝나는 회의를 잡아야한다.

/**
 * 끝나는 시간을 기준으로 정렬한다.
 * 다음 회의를 고를 때 이전의 끝나는 시간보다 크고, 제일 빨리 끝나는 회의를 고른다.
 */

const data = input.slice(1).map((elem) => elem.split(" ").map(Number));

// 끝나는 회의시간 기준으로 정렬
// const sorted = data.sort((a, b) => a[1] - b[1]);
// 배열 정렬 (끝나는 시간 기점)
const sorted = data.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]));

const END_TIME = Math.pow(2, 31) - 1;
let index = 0;
let count = 0;
let endTime = sorted[index][1];
count++;
index++;

// while (endTime < END_TIME) {
//   if (index >= sorted.length) break;

//   let [currStart, currEnd] = sorted[index];

//   // 회의시간이 겹치지 않는지 확인한다.
//   if (endTime <= currStart) {
//     // 끝나는 시간 기준으로 정렬했기 때문에, 위 조건을 만족한다면 남은 회의 중 가장 빠르게 끝나는 회의!
//     endTime = currEnd;
//     count++;
//   }

//   // 갱신
//   index++;
// }

for (let i = 1; i < sorted.length; i++) {
  let [currStart, currEnd] = sorted[i];
  if (endTime <= currStart) {
    endTime = currEnd;
    count++;
  }
}

console.log(count);
