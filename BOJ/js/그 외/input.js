// 백준에서 공식적을 권장하는 방법
// readline으로 받아오는 속도가 빠르다.
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split();
//   .map(Number);

// 입력값이 여러 줄의 값들이 띄어쓰기로 구분되어 있는 경우(문자)
const strInput = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n") //개행으로 기준으로 구분한 배열
  .map((el) => el.split(" ")); // 배열에 있는 한 Elem을  공백 기준 split한 배열로 만든다.

//   입력값이 여러 줄의 값들이 띄어쓰기로 구분되어 있는 경우(모두 숫자)
// 입력값이 여러 줄의 값들이 띄어쓰기로 구분되어 있는 경우(문자)
const intInput = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n") //개행으로 기준으로 구분한 배열
  .map((el) => el.split(" ").map(Number)); // 배열에 있는 한 Elem을  공백 기준 split한 배열을 number로 한 원소씩 맵핑한다.

console.log(input);
