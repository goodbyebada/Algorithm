function solution(n, times) {
    const sorted = times.sort((a, b) => a - b);
    
    let start = 1;
    let end = sorted[sorted.length - 1] * n;
    let answer = end;
    
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let sum = 0;
        for (let t of sorted) {
            sum += Math.floor(mid / t);
        }
        
        if (sum >= n) {
            answer = mid;    // 조건을 만족하는 값을 저장
            end = mid - 1;   // 더 작은 값 탐색
        } else {
            start = mid + 1;
        }
    }
    return answer;

}

function binary(n, sorted) {
    
// 시간
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
        answer = mid;      // 답 저장
        end = mid - 1;     // mid-1
    } else {
        start = mid + 1;   // mid+1
    }
         
  }
}
