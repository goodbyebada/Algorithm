const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const sw = Number(input[0]);
let status = input[1].split(" ").map(Number);
let students = Number(input[2]);

const changeStatusByBoy = (boysNumber) => {
  for (let i = 1; i * boysNumber <= sw; i++) {
    status[i * boysNumber - 1] = status[i * boysNumber - 1] === 1 ? 0 : 1;
  }
};

const changeStatusByGirls = (girlsNumber) => {
  status[girlsNumber - 1] = status[girlsNumber - 1] === 1 ? 0 : 1;
  let leftPointer = girlsNumber - 2;
  let rightPointer = girlsNumber;
  while (leftPointer >= 0 && rightPointer < sw) {
    if (status[leftPointer] !== status[rightPointer]) break;
    status[leftPointer] = status[rightPointer] =
      status[leftPointer] === 1 ? 0 : 1;
    leftPointer--;
    rightPointer++;
  }
};

let curStudentIndex = 1;
while (students--) {
  const [sex, number] = input[2 + curStudentIndex++].split(" ").map(Number);
  if (sex === 1) changeStatusByBoy(number);
  else changeStatusByGirls(number);
}

for (let i = 0; i < Math.ceil(sw / 20); i++) {
  console.log(status.slice(i * 20, i * 20 + 20).join(" "));
}
