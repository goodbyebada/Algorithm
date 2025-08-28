const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ");

console.log(input.filter((elem) => !/\s\g/.test(elem) && elem !== "").length);
