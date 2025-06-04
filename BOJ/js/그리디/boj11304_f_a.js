const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [N, K, ...rest] = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n");

//  ✨ 핵심 : 센서들을 k그룹으로 나눈다. 각 그룹의 길이가 최소가 되어야한다.
// 각 그룹의 길이가 최소가 되게 하려면?
// == 센서가 가까운 그룹끼리 묶는다.
// === 가장 센서의 거리가 먼 길이를(내림차순 정렬) 기준으로 k-1개의 그룹을 만든다.

// 1. 현재 센서와 다음 센서까지의 거리를 구한다.
// 2. 제일 거리가 먼 길이를 가진 센서를 제외하기 위해 내림차순을 한다.
// 3. 남은 거리를 모두 합친다.

function sol() {
  const sorted = rest[0]
    .split(" ")
    .map((elem) => +elem)
    .sort((a, b) => a - b);

  // 거리 구하기
  const diff = [];
  for (let i = 1; i < sorted.length; i++) {
    const val = sorted[i] - sorted[i - 1];
    diff.push(val);
  }

  // 제일 거리가 먼 센서부터 자르기위해 오름차순 정렬 후 [K-1, 끝]까지 자르기
  // 1개 제거 => [0]제거 => slice(1)
  // 2개 제거 => [0,1]제거 => slice(2)
  const sumArr = diff.sort((a, b) => b - a).slice(K - 1);
  const answer = sumArr.reduce((acc, curr) => (acc += curr), 0);

  console.log(answer);
}

sol();
