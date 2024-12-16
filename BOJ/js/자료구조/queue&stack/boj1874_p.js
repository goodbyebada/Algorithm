/**
 *스택 수열
 실버 2
 10:20~

 NO가 나오는 경우
 오름차순으로 push 하지 않을때
 마지막으로 넣은 수보다 ,push 하려는 수가 크다면 NO

 1. n을 받는다.
 2. 만들어야하는 순열의 answ list를 만든다.
 3. [0] 인덱스부터 비교를 해 idx ++
 4. answ list [0]까지 push를 진행한다.
  answ[idx ++]를해서 방금 pop한 애 보다 크면 answ[idx ++]의 값까지 push를 한다. 
  마지막으로 push한 val보다 더 작은 값을 push해야한다면 멈추고 NO를 출력한다.
  5. 작다면 그 값이랑 같을때까지 pop을 한다.
  6. 마지막 push한 값을 기억해둬야한다.
7. push할때, pop할때 문자를 출력해야한다.
 
 */

function main() {
  const [n, ...targetList] = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")
    .map(Number);

  let idx = 0;

  // 마지막으로 넣은 num
  const pushStr = "+";
  const popStr = "-";
  let num = 1;
  let sourceList = [1];
  let answerList = [pushStr];

  // length가 0이 되는 순간이 있다.
  //
  while (1) {
    let target = targetList[idx];

    if (idx === targetList.length) {
      break;
    }

    if (!sourceList.length || target > sourceList[sourceList.length - 1]) {
      ++num;

      if (num > target) {
        console.log("NO");
        return;
      }

      if (num > n) {
        break;
      }

      sourceList.push(num);
      answerList.push(pushStr);
    }

    if (target === sourceList[sourceList.length - 1]) {
      // pop
      sourceList.pop();
      answerList.push(popStr);
      idx++;
      continue;
    }

    if (target < sourceList[sourceList.length - 1]) {
      sourceList.pop();
      answerList.push(popStr);
      continue;
    }
  }

  for (let str of answerList) {
    console.log(str);
  }
}

main();
