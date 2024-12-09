// var datas = require("fs")
//   .readFileSync("/dev/stdin", "utf8")
//   .toString()
//   .split("\n");

const datas = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
  .toString()
  .split("\n");
const N = parseInt(datas[0]);
let small = 1000005;
let big = 0;
let line = datas[1].split(" ");
for (let i = 0; i < N; i++) {
  let now = parseInt(line[i]);
  if (now < small) small = now;
  if (big < now) big = now;
}
console.log(small * big);
