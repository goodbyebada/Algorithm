// https://www.acmicpc.net/problem/1254
// 팰린드롬 만들기
// 4:25 ~
// 답지 보고 품 🚨

const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim();

// 문자열 S에 0개 이상의 문자를 붙여 가장 짧은 펠린드롬 문자열 만들기
//  만들 수 잇는 가장 짧은 펠린드롬의 길이 출력

// 펠린드롬인 부분을 찾는다.
// 1.전부 펠린드롬이라면 현재 펠린드롬의 길이
// 2. 부분 펠린드롬을 찾는다. 현재 + (현재 - 부분)
// => 펠린드롬의 start, end를 반환한다.
// 3. 길이가 1인 글자도 펠린드롬이다.

function isPalindrome(str, start, end) {
  while (start < end) {
    if (str[start] !== str[end]) return false;
    start++;
    end--;
  }

  // start == end일 때 true 반환
  // ⛑️ 길이가 1일때도 포함되는 펠린드롬!
  return true;
}

function sol(str) {
  const n = str.length;
  // i는 앞에서 제외되는 부분
  for (let i = 0; i < n; i++) {
    // [i, n-1]의 범위인 펠린드롬 끝까지 검사
    if (isPalindrome(str, i, n - 1)) {
      // `end` 고정, start 변화 -> 펠린드롬 검사 간격을 줄여간다.
      // 길이가 1인 펠린드롬만 있다면 -> 해당 단어만 제외한 길이를 추가로 붙여줘야한다.

      // ✨ i개의 글자가 빠진 상태에서 펠린드롬 => 펠린드롬이 되고 싶다면 i개를 더 붙여줘야한다.
      console.log(n + i);
      return;
    }
  }
}

sol(input);

function sol2(str) {
  // 초기화
  // 만약 모두 펠린드롬이라면 answer 변경 X
  let answer = input.length;

  // start를 고정하고 끝을 계속 변하게
  let end = input.length - 1;

  for (let start = 0; start < end; start++) {
    if (isPalindrome(input, start, end)) {
      // 현재 + (현재 - 부분);
      const wordLen = end - start + 1;
      answer += answer - wordLen;
      console.log(answer);
      return;
    }
  }

  console.log(answer + answer - 1);
}
