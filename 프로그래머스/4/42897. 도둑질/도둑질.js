function solution(money) {
    var answer = 0;
    const N = money.length
    //     첫 집 무조건 방문
    const dp1 = Array(N).fill(0)
//     마지막 집 무조건 방문
    const dp2 = Array(N).fill(0)
    
    
    dp1[0] = money[0]
    dp1[1] =Math.max(money[0], money[1])
    dp2[0] =0
    dp2[1] = money[1]
    
    for(let i = 2; i < N-1;i++){
//         현재 훔치냐
//         안 훔치냐
        
//         첫 집 무조건 방문, N-2까지만 계산/ N-1 방문X
        dp1[i] = Math.max(dp1[i-2]+money[i], dp1[i-1])
//         마지막 집 무조건 방문, N-2까지만 계산/ N-1 방문O
        dp2[i] = Math.max(dp2[i-2]+money[i], dp2[i-1])      
        
    }
    
//     마지막 방문
    dp2[N-1] = dp2[N-3] + money[N-1]
    

    answer = Math.max(dp2[N-1], dp1[N-2])
    
    return answer;
}