// 서버 최소 몇 번 증설

function solution(players, m, k) {
    var answer = 0;
    
    const allCount = new Array(players.length).fill(0)
    const buildCount = new Array(players.length).fill(0)
    
    players.forEach((elem, idx) => {    
    const shouldBuildCount = Math.floor(elem / m)
    
//    실제 빌드된 서버 수
    const buildServerCount =  shouldBuildCount - allCount[idx]

    if( shouldBuildCount > 0 && buildServerCount > 0){
        buildCount[idx] = buildServerCount;
        
        for(let i = idx ;  i < idx+ k; i++){
            // NaN case
            if(i >= players.length) break;
            allCount[i] += buildServerCount
        }
    }

        
        
    })
    
    
    const result = buildCount.reduce((acc, curr, idx) =>
        acc+= curr
    )

    
    return result;
}