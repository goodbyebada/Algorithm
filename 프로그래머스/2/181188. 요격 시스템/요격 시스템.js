function solution(targets) {
    var answer = 0;
    
    //     e 기준으로 오름차순 
    targets = targets.sort((a,b) => {
        if(a[1] === b[1]) return a[0] - b[0]
        return a[1] - b[1]
    })
    
//     end 갱신될 때 answer 해준다.
    
    let index = 0
    let currEnd =  targets[index][1]
    
    index++
    answer++
    
    while(index < targets.length){
        const [s, e] = targets[index++]
        
        if(s >= currEnd){
            currEnd = e
            answer++
        }
    }
    
    return answer;
}