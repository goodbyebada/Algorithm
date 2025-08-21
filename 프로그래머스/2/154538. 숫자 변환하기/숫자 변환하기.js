function solution(x, y, n) {
    var answer = -1;
    
//     기록
    const dp = {}
    
    const list = [x]
    let index = 0
    dp[x] = 0 
    
    while(list.length > index ){
        let curr = list[index++]
        
        if(curr === y) answer = dp[curr]
        
        for(let nVal of [curr + n, curr *2, curr*3]){
            
            
//             조건확인, 중복 확인
            if(nVal > y || dp[nVal]) continue
            list.push(nVal)
            dp[nVal] = dp[curr] +1    
        }
        
    }
    
    
    return answer
    

}