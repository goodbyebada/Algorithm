

// 🛑 max 를 찾는 것이 핵심인 문제
function solution(progresses, speeds) {
    const answer = [0];
    const restDay = progresses.map((progress, idx) => Math.ceil((100-progress)/speeds[idx]))
    
    let max = restDay[0];
    
    for(let i = 0, j =0;i < restDay.length;i++){
        
        if(restDay[i] > max){
            max = restDay[i]
            
//             index 증가
            answer[++j] = 1
            
        }else{
            answer[j] +=1
        }
        
    }
    
    
  
    return answer;
}