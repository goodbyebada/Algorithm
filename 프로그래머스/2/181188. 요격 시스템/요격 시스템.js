function solution(targets) {
    var answer = 0;
    
//     targets 정렬
//     end 끝날 때 요격 미사일을 사용할 수 있음
    
//     e 기준으로 오름차순 
    targets = targets.sort((a,b) => {
        if(a[1] === b[1]) return a[0] - b[0]
        return a[1] - b[1]
    })
    
    
    
    let index = 0
    let count = 0
    let e =  targets[index][1]
    
    
//     마지막 인덱스까지 돈다.
//     처음 끝나는 end  지점에서 count++한다.
    while(index < targets.length){
        
        if(index === 0) {
            count++
            index++
            continue;
        }
        
        
        const [nextStart, nextEnd] = targets[index++]
        if(nextStart < e) continue;

//         처음 갱신될때 세어준다.
            count++
            e = nextEnd;
        
    }
    
    
    return count;
}