// 원형 수열의 연속 부분 수열의 합으로 만들 수 있는 개수 구해라

// 길이가 1인 수열의 합 ~ 길이가 N인 수열의 합
// 중복 제거 -> set 이용해서 count 세준다.
// 처음 인덱스부터 끝까지 인덱스롤 순회한다.
// set에 넣는다.
// 그 다음 배열의 인덱스를 더한 다음 set에 넣는다.
// 이 과정을 인덱스 0부터 ~ N-1까지 반복한다.

// 👎 원형 순열일때 신경 쓰자
// 🛑 맨 처음에 그냥 1 ~ N까지의 합/ 2~N까지의 합 이런식으로 풀려고 했다. -> 반례) N 1 2 의 합
// 🛑 if (end === i - 1) break; 으로 조건문을 걸려고 했다 -> 반례) 0

function solution(elements) {
  var answer = 0;
  const set = new Set();
  const N = elements.length;

  for (let i = 0; i < N; i++) {
    let end = i;
    let sum = 0;

    while (1) {
      sum += elements[end];
      if (!set.has(sum)) set.add(sum);

      //   0일때 문제다.
      //   if (end === i - 1) break;
      if (end === (i + N - 1) % N) break;

      end = (end + 1) % N;
    }
  }

  answer = set.size;

  return answer;
}
