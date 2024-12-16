const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//   필요한 배열만 number로 map
let list = input[1].split(" ").map(Number);
// number type 변환
let b = Number(input[2]);

// elem === b 같을 때 return
let answer = list.filter((e) => e == b).length;
console.log(answer);
