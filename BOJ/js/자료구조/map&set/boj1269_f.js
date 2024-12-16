/**
 * 처음에 Set의 대칭차집합 메소드 사용하려고 했는데 boj에서 런타임에러남
 * 이유를 모르겠다
 * 아마 js 버전 때문이지 않을까?
 *
 *
 */

const [n, aInput, bInput] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// 공집합이 아닌 두 집합이 주어진다.
const aSet = aInput.split(" ");
const bSet = bInput.split(" ");

// 두 집합 A와 B의 모든 원소를 하나로 합친 배열
const allElements = aSet.concat(bSet);
// [...aSet, ...bSet] vs aSet.concat(bSet)
// concat이 더 빠르다.

// 중복을 제거하여 집합 A B의 합집합을 나타내는 Set
const unionElements = new Set(allElements);

// 두 집합에 모두 존재하는 공통 원소의 개수를 계산
//  A = { 1, 2, 4 }
//  B = { 2, 3, 4, 5, 6 }
// 2, 4 => 2개
// ✨ 중복된 원소의 개수를 구할 수 있다.
const commonCount = allElements.length - unionElements.size;

// 대칭 차집합의 원소 개수 계산: (A - (A 교 B)) + (B - (A 교 B))
const symmetricDifferenceCount =
  aSet.length - commonCount + (bSet.length - commonCount);

console.log(symmetricDifferenceCount);
