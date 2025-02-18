/**
 * 1654 랜선 자르기
 *
 *
 * K개의 랜선을 N개의 같은 길이로 자른다.
 *
 * 1 <= K <= 10000
 * 1 <= N <- 1_000_000
 * K <= N
 *
 *
 * 만들 수 있는 최대 랜선의 길이를 구하기
 *
 *
 * K개의 랜선
 * 총 11개를 만들거다
 *  => 만들 수 있는 최대 랜선의 길이를 구해라
 *
 *
 * L의 길이는 ?
 * 802 / L => ? 개
 * 743 / L => ? 개
 *
 *
 *
 * 1. 모두 N개의 같은 길이
 *
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const [K, N] = input.shift().split(" ").map(Number);
const list = input.map(Number);

const max = Math.max(...list);

bsLowerCase(N, list, max);

function bsLowerCase(N, input, max) {
  // 1부터
  let start = 1;
  let end = max;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    const len = mid;

    const count = input.reduce((acc, curr) => {
      const devidedCount = Math.floor(curr / len);
      acc += devidedCount;
      return acc;
    }, 0);

    //        가능
    if (count >= N) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  //   console.log(end);
  console.log(end);
  //   return list[end];
}
