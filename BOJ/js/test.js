const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = require("fs").readFileSync(path).toString().trim();

// title: 제목
// p 태그 안의 태그는 지운다.
// p 태그 안의  문장 시작과 공백이 잇다면 지운다.

// 공백 1개 이상 연속적으로 붙어있다면 하나의 공백으로 a__b a_b로 바꾸낟.
// 마지막으로 <p></p>를 지운다.

// title인 것 잡기
// 그 다음 p 태그를 잡기
//  p태그 내부 위와 같은 파싱 로직 수행하기

// 여는 태그만 존재할 수 있고, 여는 태그와 닫는 태그가 올바른 쌍으로 존재
// <br>
//  <main> 으로  </main> 로 항상 꿑난다.

// 트리로 접근해보아요~

// p태그 내부 문장 들어옴
function parsingP(sentence) {}

function parsing() {}

function sol(input) {
  // 앞과 끝 어케 찾음
  const parsed = input.slice(6, input.length - 7);
  console.log(parsed);

  //   console.log(input);
}
sol(input);
