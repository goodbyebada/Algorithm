const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
  .toString()
  .trim();

const tags = input.match(/<[a-z ]+>/g) ?? [];
// 정규식으로 찾는다.
// 공백도 포함한 정규식이다.

const words = input.split(/<[a-z ]+>/);
// 태그를 패턴을 가진 정규식을 기준으로 split한다.
// 태그 단어 태그
// -> split 한 후 '' 단어 ''

const reversedWords = words.map((word) =>
  word
    .split(" ") //공백을 포함할 수 있기에
    .map((v) => [...v].reverse().join("")) //rest로 배열 속성 복사
    .join(" ")
);

// 태그가 없다면 '' + 태그
// 단어가 있다면 word + 태그 순
// 순서가 유지된다.
const answer =
  tags.map((tag, i) => reversedWords[i] + tag).join("") +
  reversedWords[reversedWords.length - 1];

//  만약 태그가 없다면, 빈 태그 배열과 + reversedWord[0]
// reversedWords[reversedWords.length - 1]; 맨 마지막 reversedWord위해
console.log(answer);
