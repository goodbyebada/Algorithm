// 큰 수 만들기

function solution(number, k) {
  const stack = [];

  // number의 숫자 순서를 유지해야한다.
  for (const num of number) {
    //     stack top보다 크다면 순회중인 num으로 교체한다.
    while (k > 0 && stack[stack.length - 1] < num) {
      stack.pop();
      //         빼야하는 k개 차감
      k--;
    }
    stack.push(num);
  }

  //   아예 오름 차순이라면 k가 >0인 상태로 존재하기에 slice 해야한다.
  return stack.slice(0, stack.length - k).join("");
}
