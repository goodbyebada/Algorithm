function solution(N, number) {
    
//     set
    
//     index 1부터시작
    const dp = Array(9).fill(0).map(() => new Set())
    
    for(let i= 1; i < 9; i++){
//         N의 Type도 확인하셈
        dp[i].add(Number(N.toString().repeat(i)))
        
        
        for(let j = 1 ; j <= i -1; j++){
            
            for(let item1 of dp[j]){
                for(let item2 of dp[i-j]){
              
                    dp[i].add(Math.floor(item1/item2))
                    dp[i].add(item1+item2)
                    dp[i].add(item1-item2)
                    dp[i].add(item1*item2)
            
                }  
            }
        }
        
        if(dp[i].has(number)) return i
        
        
        
//         for(let a = 1; a < i; a++){
// //             ..?set에서 하나씩 어떻게 꺼내지 ?
// //             i 번 set (사칙연산) N-i set
//             let target = dp[]
//             for(let b = i-1; b > 0; b++){
                
//             }
            
//         }
        
        
    }
    
    
    
    return -1;
}