function solution(edges) {    
    const graphInfo = {}

    edges.forEach(([send,receive])=>{
        graphInfo[send] ||= { sendCount:0, receiveCount:0 }
        graphInfo[receive] ||= { sendCount:0, receiveCount:0 }

        graphInfo[send].sendCount++
        graphInfo[receive].receiveCount++
    })

    let 생성정점 = 0
    let 모양그래프갯수 = 0
    let 도넛 = 0 
    let 막대 = 0 
    let 팔자 = 0

    for (let 정점 in graphInfo){
        const { sendCount, receiveCount } = graphInfo[정점]
        if(sendCount >= 2 && receiveCount === 0){
            생성정점 = +정점
            모양그래프갯수 = sendCount
        }
        if(sendCount == 0) 막대++
        if(sendCount >= 2 && receiveCount >= 2) 팔자++
    }

    도넛 = 모양그래프갯수 - 팔자 - 막대

    return [생성정점, 도넛, 막대, 팔자];
}