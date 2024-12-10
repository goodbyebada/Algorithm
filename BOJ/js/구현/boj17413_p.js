/**
 * 단어 뒤집기 2
 *
 * - 실버 3
 * 2:53~ 4:09
 *
 * 1.주어진 문자열 띄어쓰기로 구분된 단어만 뒤집는다.
 * 2. 태그는 <로 시작해 >로 닫힌다. 태그는 뒤집지 않는다.
 * 3.태그와 단어사이에는 공백이없다.
 *
 *
 * answ 문자열에 붙인다.
 * 문자열을 순회환다.
 * 1 < 를 찾는다. < -> 그대로 출력한다.
 * 그리고 삭제한다. 현재 인덱스 0에서 다음 < 때까지의 문자열은 단어이다.
 * <과 0이 같다면 삭제한다
 * 공백을 기준으로 split한 다음 reverse한다.
 * 삭제한다. 문자열의 길이가 0이될 때까지 반복한다.
 *
 * < 이 없다면 전부 단어이다.
 *
 * -- 시간 오래걸렸다.
 *1. 다 split하고  < 이 가 없는 경우를 고려하지 못했다.
 *
 */

function reverseWord(str) {
  let currStr = str;
  let finalstr = "";

  while (currStr.length !== 0) {
    let openIdx = currStr.indexOf("<");
    let closeIdx = currStr.indexOf(">");

    if (openIdx === 0) {
      const tag = currStr.substring(openIdx, closeIdx - openIdx + 1);
      finalstr += tag;
      currStr = currStr.substring(closeIdx + 1);
    }

    if (openIdx === -1) {
      const word = currStr
        .split(" ")
        .map((elem) => elem.split("").reverse().join(""))
        .join(" ");

      // 단어는 띄어쓰기 기준으로 분리되어있다.
      finalstr += word;

      break;
    }

    if (openIdx > 0) {
      const word = currStr
        .substring(0, openIdx)
        .split(" ")
        .map((elem) => elem.split("").reverse().join(""))
        .join(" ");

      // 단어는 띄어쓰기 기준으로 분리되어있다.
      finalstr += word;
      currStr = currStr.substring(openIdx);
    }
  }

  return finalstr;
}

function main() {
  const str = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
    .toString()
    .trim();

  // 태그를 포함하고 있다.
  if (str.indexOf("<") !== -1) {
    const finalStr = reverseWord(str);
    console.log(finalStr);
    return;
  }

  // 아닐 경우
  const finalStr = str
    .split(" ")
    .map((elem) => elem.split("").reverse().join(""))
    .join(" ");

  console.log(finalStr);
}

main();
