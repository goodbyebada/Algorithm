// https://school.programmers.co.kr/learn/courses/30/lessons/42895
// 답지보고 품!

function solution(N, number) {
  //     set

  //     index 1부터시작
  const dp = Array(9)
    .fill(0)
    .map(() => new Set());

  for (let i = 1; i < 9; i++) {
    //         N의 Type도 확인하셈
    dp[i].add(Number(N.toString().repeat(i)));

    for (let j = 1; j <= i - 1; j++) {
      for (let item1 of dp[j]) {
        for (let item2 of dp[i - j]) {
          dp[i].add(Math.floor(item1 / item2));
          dp[i].add(item1 + item2);
          dp[i].add(item1 - item2);
          dp[i].add(item1 * item2);
        }
      }
    }

    //         무조건 j와 i-j로 이뤄진 조합이 답이 나올 거라 생각해 loop안에 넣었다 틀렸다.
    if (dp[i].has(number)) return i;
  }

  return -1;
}
