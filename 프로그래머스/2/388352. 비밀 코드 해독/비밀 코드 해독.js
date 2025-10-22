// 11:01 // 완탐 완전 러프하게 잡아도 10^5 // 1. 가능한 모든 조합을 구한다. nC5 // 2. 주어진 q, ans를 만족하는지 확인한다. // 숫자는 1부터 시작한다.

function solution(n, q, ans) {
    const allComb = [];
    
    // nC5 조합 생성
    function getCom(arr, start){
        if (arr.length === 5) { // 비밀 코드 길이 5
            allComb.push([...arr]);
            return;
        }
        for (let i = start; i <= n; i++){
            arr.push(i);
            getCom(arr, i + 1);
            arr.pop();
        }
    }

    getCom([], 1); // 1부터 n까지 조합 생성

    // 후보 조합 검사
    return allComb.filter(candidate => 
        q.every((qArr, idx) => isValid(qArr, ans[idx], candidate))
    ).length;
}

function isValid(qArr, qVal, comb){
    const set = new Set(qArr);
    let cnt = 0;
    for (let num of comb){
        if(set.has(num)) cnt++;
    }
    return cnt === qVal;
}