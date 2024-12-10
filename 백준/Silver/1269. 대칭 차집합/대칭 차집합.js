const [n, aInput, bInput] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const aSet = aInput.split(" ");
const bSet = bInput.split(" ");

// 두 집합 A와 B의 모든 원소를 하나로 합친 배열
const allElements = aSet.concat(bSet);

// 중복을 제거하여 집합 A ∪ B를 나타내는 Set
const uniqueElements = new Set(allElements);

// 두 집합에 모두 존재하는 공통 원소의 개수를 계산
const commonCount = allElements.length - uniqueElements.size;

// 대칭 차집합의 원소 개수 계산: (A - B) + (B - A)
const symmetricDifferenceCount =
  aSet.length - commonCount + (bSet.length - commonCount);

console.log(symmetricDifferenceCount);
