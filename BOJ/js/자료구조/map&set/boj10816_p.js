const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const cards = input[1].split(" ").map((elem) => +elem);
const findList = input[3].split(" ").map((elem) => +elem);
const map = new Map();

// for (let i = 0; i < cards.length; i++) {
//   const num = cards[i];
//   if (map.has(num)) {
//     map.set(num, map.get(num) + 1);
//   } else map.set(num, 1);
// }

// 📌 cards[i]로 접근할 필요가 없다.
cards.forEach((v) => {
  if (!map.has(v)) {
    map.set(v, 1);
  } else {
    map.set(v, map.get(v) + 1);
  }
});

// ✨ map은 배열을 반환하니까 굳이 result 배열 만들 필요없다.
console.log(
  findList
    .map((num) => {
      if (map.has(num)) return map.get(num);
      return 0;
    })
    .join(" ")
);
