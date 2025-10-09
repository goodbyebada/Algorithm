// 각 유저는 한번에 한명 유저 신고
// 동일 유저에 대한 신고 -> 1회로 처리
// k번 이상 신고된 유저 -> 게시판 이용 정지

// 정지되면 해당 유저 신고한 모든 유저 -> 메일 발송


// id_list -> 받은 결과 메일의 수 

// 유저ID - 인덱스를 맵핑
// 0,1,2,3 ->  ["muzi", "frodo", "apeach", "neo"]
// 

//  신고자 || 신고당한 사람.


// calledCount
// 신고당한
// name - count -> map => 배열로 
// 신고당한 횟수 센다.
// => 정지당한 ID name 뽑는다.


// 신고 - callList 
// 유저 ID index - { 신고한 유저ID 리스트}
// > 정지당한 ID를 몇 개 포함하는지 기록한다.

// 결과 key - index






function solution(id_list, report, k) {
    var answer = Array(id_list.length).fill(0);
    
    
    //name - cnt
    const calledCntMap = new Map()
    
//     name - index mapp
    const indexMap = {}
    
    for(let i = 0; i < id_list.length; i++){
        indexMap[id_list[i]] = i
    }
    

    const callList = Array(id_list.length).fill(0).map(() => [])
    
    //     중복
    const set = new Set(report)
    
    for(let s of set){
//         신고당한 수 set
        const [callId, calledId] = s.split(" ")
        calledCntMap.set(calledId, calledCntMap.get(calledId) + 1 || 1)
        
//     신고한 리스트 각각 set
        callList[indexMap[callId]].push(calledId)
    }
    
    const sinners = []
    
    for(let [calledId, cnt] of calledCntMap){
        if(cnt >= k) sinners.push(calledId)
    }
    
    
    
    for(let i = 0; i < callList.length; i++){
        
        for(let sinner of sinners){
            if(callList[i].includes(sinner)) answer[i]++
            
        }

    }
    


    return answer;
}