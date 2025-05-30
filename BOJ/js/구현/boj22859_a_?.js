const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim();

function solution(input) {
  // <div title="(A)"> 태그에서 title을 파싱한다.
  function getTitle(str) {
    let isTitle = false;
    let result = "";

    for (let x of str) {
      // 처음 "를 마주쳤을때, 플래그 변경
      if (x === '"' && !isTitle) {
        isTitle = true;
        continue;
      }

      // "를 마주치고 플래그가 true라면 => 끝 " -> break!
      if (x === '"' && isTitle) break;

      // "를 마주쳤을때 문자열을 더한다.
      if (isTitle) result += x;
    }
    return result;
  }

  function deleteTags(p) {
    let str = "";

    let isTag = false;

    for (let i = 0; i < p.length; i++) {
      // 태그 시작
      if (p[i] === "<" && !isTag) {
        isTag = true;
        continue;
      }

      if (p[i] === ">" && isTag) {
        // 그 외의 태그들이 더있을수 있기 때문에 꼭 초기화 시켜줘야한다.
        isTag = false;
        continue;
      }

      // 태그 내부가 아니라면
      if (!isTag) {
        // 🚨 p[i-1]이 현재 문장의 이전의 char가 아니다!
        //  제외된 태그를 가리키기 때문에 현재 추가 된 문장 기준으로 공백 확인을 해야한다.
        let prev = str[str.length - 1];
        if (prev === " " && prev === p[i]) continue;

        str += p[i];
      }
    }

    return str.trim();
  }

  const answer = [];

  // 한번 찾는거에서 멈추지 않고 다 찾아버리겠다. g

  // 해당 패턴이 match되는 단어들 list를 넣는다.
  const divTags = input.match(/<div(.*?)>(.*?)<\/div>/g);

  // divTags 안에 있는  div 중에서도 <p> ~ <\/p>로 찾겠다.
  // "/"는 \를 넣어줘야한다.

  for (let div of divTags) {
    //🚨  ()
    // 캡처 그룹 전 후로 문자열을 자른다.
    // 캡처된 값도 배열에 들어간다. -> <p> ~ </p> 안에 있는 ~도 배열에 들어간다.

    const pTags = div.split(/<p>(.*?)<\/p>/g);

    const title = getTitle(pTags[0]);

    const result = [];
    for (let i = 1; i < pTags.length - 1; i++) {
      // 미리 양쪽 공백 제거
      let p = pTags[i].trim();

      // 빈칸을 건너뛴다.
      if (!p.length) continue;

      p = deleteTags(p);
      result.push(p);
    }

    // // title : -> push할때 따로 문자열 설정
    // // p 태그들은 \n으로 출력되어야하기 때문에 "\n"한 문자열로 넣는다.
    // answer.push(`title : ${title}`);

    // for (let i = 0; i < result.length; i++) {
    //   answer.push(result[i]);
    // }

    answer.push([`title : ${title}`, result.join("\n")]);
  }

  return answer.map((v) => v.join("\n")).join("\n");
}

console.log(solution(input));
