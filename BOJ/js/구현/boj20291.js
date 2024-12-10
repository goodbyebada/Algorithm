/**
 * 파일은 확장자 별로 정리 , 몇개씩 있는가
 * 확장자들을 사전순으로 정리
 *
 * - 입력
 * 파일의 개수 N
 *
 */

/**
 * 풀이 방법
 * 각 문자열을 .을 기준을 split한다. 뒤에 있는 확장자명을 객체에서 찾는다. 만약 없다면 생성한다.
 * hasOwnProperty로 확인한다. 없다면 obj[key ] =1; 을 넣는다.
 */

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
  .toString()
  .trim()
  .split("\n");

input.shift();

const obj = {};

input.forEach((elem) => {
  const key = elem.split(".")[1];

  if (!obj.hasOwnProperty(key)) {
    obj[key] = 1;
  } else {
    obj[key]++;
  }
});

const sortedArr = Object.entries(obj).sort();
for (let elem of sortedArr) {
  console.log(`${elem[0]} ${elem[1]}`);
}
