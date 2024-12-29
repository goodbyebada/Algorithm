const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const cards = input[1].split(" ").map((elem) => +elem);
const findList = input[3].split(" ").map((elem) => +elem);
const result = [];
const map = new Map();

for (let i = 0; i < cards.length; i++) {
  const num = cards[i];
  if (map.has(num)) {
    map.set(num, map.get(num) + 1);
  } else map.set(num, 1);
}

for (let i = 0; i < findList.length; i++) {
  const findNum = findList[i];
  if (map.has(findNum)) {
    result.push(map.get(findNum));
  } else {
    result.push(0);
  }
}

console.log(result.join(" "));
