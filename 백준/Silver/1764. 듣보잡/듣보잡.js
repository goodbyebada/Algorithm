let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");
let [n, m] = input[0].split(" ").map(Number);
let set = new Set();

for (let i = 1; i <= n; i++) {
  set.add(input[i]);
}

let nameList = [];
for (let i = n + 1; i <= n + m; i++) {
  if (set.has(input[i])) {
    nameList.push(input[i]);
  }
}
nameList.sort();

console.log(nameList.length);
console.log(nameList.join("\n"));
