// DFS를 이용한다.

// 스택을 사용한다.
//  +일 경우, -일 경우를 고려한다.
//  검산했을 시 필요한 값을 스택에 넣는다. Ex) -4, (N -4) || (N+4)
// 그럼 그 다음은 A B
//  B를 만들어야한다. B를 만족해야한다.  A', B - A'
// 마지막 원소는 -, + 로 될 수 있는지 본다! 안된다면 continue, 된다면 answer++

function DFS(numbers, target) {
  let index = 0;
  const stack = [];
  const lastIndex = numbers.length - 1;
  let count = 0;

  stack.push([index, target - numbers[index]]);
  stack.push([index, target + numbers[index]]);

  while (stack.length > 0) {
    const [index, target] = stack.pop();

    //         마지막 index라면
    if (index + 1 === lastIndex) {
      if (target === -numbers[index + 1]) count++;
      if (target === numbers[index + 1]) count++;
      continue;
    }

    stack.push([index + 1, target - numbers[index + 1]]);
    stack.push([index + 1, target + numbers[index + 1]]);
  }

  return count;
}

function solution(numbers, target) {
  var answer = 0;
  answer = DFS(numbers, target);

  return answer;
}
