// 문자열

const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

//   접두사가 없는 가장 큰 size set
// 가장 길이가 작은 문자 순으로 정렬?
// h hi는 안되는데 hi hello는 된당
// 접두어 -> 앞에 그 단어가 포함되어있느냐 판단
// N < 50
// 10^2 => 전부 비교해도

function sol(input) {
  const [N, ...words] = input;
  let answer = Array(+N).fill(true);
  //   길이가 짧을수록 접두사이다.

  const sorted = words.sort((a, b) => a.length - b.length);

  // 접두사가 들어가는 단어가 있다면 해당 접두사를 제외해야한다.
  // 단어의 개수를 최대가 되게 하려면, 접두사를 뺐을 때 유리하다.
  for (let i = 0; i < sorted.length; i++) {
    const word = sorted[i];
    for (let j = i + 1; j < sorted.length; j++) {
      // 접두사일때
      if (word === sorted[j].slice(0, word.length)) {
        answer[i] = false;
      }
    }
  }

  let count = 0;
  for (let val of answer) {
    if (val) count++;
  }
  console.log(count);
}

sol(input);
