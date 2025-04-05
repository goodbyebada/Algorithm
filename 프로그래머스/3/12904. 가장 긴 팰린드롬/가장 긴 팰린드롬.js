// 부분 문자열 중 가장 긴 팰린드롬의 길이 return 

// 이전의 결과를 사용하면 빠르게 풀 수 있다. -> DP
// 가장 작은 결과로부터 조합해 구한다.

// 1. 펠린드롬인 최소 경우를 초기화 한다. => 길이가 1, 2인 경우 ex) a, aa
// 2. 길이가 3 이상 ~ N인 문자열이 펠린드롬인지 차례대로 검사한다.
//     str[start] ===  str[end] 라면 dp[start+1][end-1] 의 값을 통해 판단한다.



function solution(s)
{
    var answer = 1;
    const N = s.length
    const dp = Array(N).fill().map(()=> Array(N).fill(false))
    const str= s
    
//     길이가 1인 펠린드롬 문자열
    for(let i = 0; i < N;i++){
        dp[i][i] = true
    }
    
    
//     길이가 2인 펠린드롬 문자열
    for(let i = 0; i < N-1; i++){
        
        if(str[i] === str[i+1]) {
            dp[i][i+1] = true
            answer = 2
        }
        
    }
    
    
//     길이가 3 이상인 펠린드롬 문자열
    for(let len = 3; len <= N; len++){
        
        for(let start = 0; start <= N-len; start++){
            const end = start+len-1
            
            if(str[start] === str[end] && dp[start+1][end-1]) {
                dp[start][end] = true 
                answer= Math.max(len,  answer)
                
            }   
        }
        
        
        
    }
    
    
    
    

    return answer;
}