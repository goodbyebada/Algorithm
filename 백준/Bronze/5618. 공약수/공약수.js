const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

// 가장 작은 값을 소인수분해한다.

const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

//   중복된 값 방지
let result = new Set();

// 주어진 수의 절반 이상으로 mod 하기
// 가장 작은 값의 약수를 구한다. => 약수의 개수가 적으니까
for (let i = 1; i * i <= arr[0]; i++) {
  if (arr[0] % i === 0) {
    result.add(i);
    result.add(arr[0] / i);
  }
}

// 이중 for문 N만큼 순회한다.
for (let i = 0; i < N; i++) {
  for (let x of result) {
    // result의 x로 안 나눠지면  공약수가 아니기 때문에 x를 삭제한다.
    if (arr[i] % x) result.delete(x);
  }
}

console.log([...result].sort((a, b) => a - b).join("\n"));
