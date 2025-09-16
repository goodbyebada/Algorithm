function solution(n, times) {
  const sorted = times.sort((a, b) => a - b);
  const answer = binary(n, sorted);
  return answer;
}

function binary(n, sorted) {
  // 시간
  let answer = 0;
  let start = 0;
  let end = sorted[sorted.length - 1] * n;

  while (start <= end) {
    // 중앙 시간
    let mid = Math.floor((start + end) / 2);

    // 처리 가능한 사람
    let sum = 0;

    for (let t of sorted) {
      sum += Math.floor(mid / t);
    }

    if (sum >= n) {
      answer = mid; // 답 저장
      // 🎯 sum === n  일때 바로 return 하도록 했다가 틀림
      //   sum === n을 만족하는 더 작은 시간이 있을 수 있기 때문에, 저장해두고 계속 탐색 ㄱㄱ

      // 🎯  end start 설정 잘못 놨었음
      end = mid - 1; // mid-1
    } else {
      start = mid + 1; // mid+1
    }
  }

  return answer;
}


