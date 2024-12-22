// input값 처리
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
[N, ...arr] = input;

console.log(solution(arr).join('\n'));

function solution(arr) {
  arr = arr.sort((a,b) => a.split(" ")[0] - b.split(" ")[0]);  // 유니코드로 문자열 숫자 비교
  return arr;
}