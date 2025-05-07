const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

/**
 *
 * 1. 최대 개수이기 때문에 빠른 시작 순, 빠른 끝나는 시간 순으로 정렬한다.
 * 2. 끝나는 시간을 갱신한다.
 * 3. 끝나는 시간보다 <= 을 만족하는 빠른 시간 순을 찾는다. 찾는다면 2로 돌아간다.
 * 4. 갱신되는 끝나는 시간이 < 2^31 -1 조건을 만족할 때까지 반복
 *
 * O(NlogN)
 */

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

const data = input.slice(1).map((elem) => elem.split(" ").map(Number));

// 2 index는 회의시간
const sorted = data
  .map((elem) => {
    elem.push(elem[1] - elem[0]);
    return elem;
  })
  .sort((a, b) => a[2] - b[2]);

const END_TIME = Math.pow(2, 31) - 1;
let index = 0;
let count = 0;
let endTime = sorted[index][1];
count++;
index++;

while (endTime <= END_TIME) {
  let [currStart, currEnd] = sorted[index];
  if (endTime <= currStart) {
    endTime = currEnd;
    // 갱신
    index++;
    count++;
  }

  if (index < sorted.length) break;
}

console.log(count);
