/**
 * 재귀로 푼 빠른 DP 풀이
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = () => Number(require("fs").readFileSync(path).toString().trim());

// DP -> Top-Down recursion으로 풀기
const solution = (num) => {
  const dp = new Map();

  //   최소 준비
  dp.set(1, 0);
  dp.set(2, 1);

  const getRecursive = (num) => {
    // 메모제이션
    if (dp.has(num)) {
      return dp.get(num);
    }

    // num을 1로 만들기 위해 -1 연산만을 반복하는 것은 최적의 방법이 아니다.
    // 3이나 2로 나누는 것이 연산 횟수를 줄이는 더 좋은 방법이다.
    // 따라서 3 혹은 2로 나누는 경우 최소 연산 횟수를 비교한 후 , 더 작은 값을 선택한다.

    //✨ num이 3 혹은 2로 나눠 떨어지지 않는다면, 나눈 몫을 기반으로 최소 연산 횟수를 구하고
    // 나머지 값만큼 +1을 추가하여 최소 연산 횟수를 계산한다.

    dp.set(
      num,
      1 +
        Math.min(
          getRecursive(Math.floor(num / 3)) + (num % 3),
          getRecursive(Math.floor(num / 2)) + (num % 2)
        )
    );
    return dp.get(num);
  };

  return getRecursive(num);
};

console.log(solution(input()));
