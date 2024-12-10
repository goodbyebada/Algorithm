/**
 * 맞았지만 너무 느린 내 답안
 * 1등 코드 가져옴
 */

let fs = require("fs");
let input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

// 짱 빠른 reduce를 이용한다.
let cnt = input.slice(1).reduce((obj, cur, idx) => {
  let [_, ext] = cur.split(".").map((v) => v.trim());

  //   undefined
  if (!obj[ext]) {
    obj[ext] = 1;
  } else {
    obj[ext]++;
  }
  return obj;
}, {});

// 새로운 객체를 만든다.

//사전 순으로 정렬해야하기 때문에 Object.keys로 배열을 만들어 sort한다.
// map을 이용해 `key value`의 값을 가진 배열로 만든다.
// join을 통해 \n으로 구분된 문자열로 만든다.
let sortedExt = Object.keys(cnt)
  .sort()
  .map((v) => `${v} ${cnt[v]}`)
  .join("\n");

console.log(sortedExt);
