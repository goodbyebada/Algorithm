

function compare(prev, front){
    return prev >= front
}

function solution(progresses, speeds) {
    const answer = [];
    const restDay = [];    
    
    
//     restDay 배열
    progresses.forEach((progress, idx) =>{
        const rest = Math.ceil((100-progress)/speeds[idx])
        restDay.push(rest)
    } )
    
    
    let max = -100;
    
    for(let i = 0; i < restDay.length; i++){
        if( max <  restDay[i]){
            max = restDay[i]
        } else{
            restDay[i] = max
        }
    }
    
    console.log(restDay)
    
    
    let count = 1;
    for(let i = 0; i <= restDay.length-1; i++){
        
        if(restDay[i] !== restDay[i+1]){
            answer.push(count)
            count = 1;
            continue;
        }
        count++;
    }


  
    return answer;
}