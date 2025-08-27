
// 가격이 떨어지지 않은 기간은 몇 초인지 리턴


function solution(prices) {
    var answer = [];
    
    for(let i = 0; i < prices.length; i++){
        let target = prices[i]
        let count = 0
        
        for(let j = i+1; j < prices.length; j++){
            count++
            if(target > prices[j]) break
        }
        
        answer.push(count)
        
    }
    
  
    return answer;
}