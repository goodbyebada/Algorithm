
// 유형 + 점수 
// 질문 -> 네오형이 동의 , 어피치형 비동의

// 선택한 거 -> 점수는 고정
// 잘 이해 
// 더 높은 점수의 유형
// 같다면 -> 사전 순 빠른 성격 유형 



// RT
// [R, T] = R -> 비동의 T 동의
// N = 5
// C = 3
// M = 2
// T= 7
// A = 5

//N A qlry -> A
// C
// M
// T


// 매우 ->3
// 동의 비동의 ->2
// 약간 ->1
// 모르겠음 0

// 카운트 시스템
// choices[i] < 4 -> 동의  4- choices[i]
// choices[i] = 4 0
// choices[i] > 4 -> 비동의  choices[i] -4 

// 1. survey[i] 동의, 비동이 판단 -> 각 알파벳별 숫자.




// 2. 각 지표에 대해 알파벳 카운트 비교 -> 해당 알파벳이 없을 수도 있음
//    - 만약 같다면 알파벳순으로 정렬
// 3. 마지막 하나의 str을 만든다.



// const [A, B] = split
// for문으로 dic 을 돌아 keys를 돈다.
// includes 하나가 A 되는 걸 찾아.  해당 키의 객체["A"] ++ "AB":  {a : 0, b: 0}
//  choiceNum< 4
//  = 4 continue
// choiceNum > 4  += score


function solution(survey, choices) {
    var answer = '';
    const map = getMap();
    const list = ["RT", "CF", "JM", "AN"]

    const result = initResult()
    for(let i = 0; i < survey.length; i++){
        const type = survey[i]
        const choiceNum = choices[i]
        
        if(choiceNum === 0) continue
//        동의
        
        const score =  getScore(choiceNum)
        if(choiceNum > 4) result[type[1]] += score
        else result[type[0]] += score
        
    }
    
    console.log(result)
    
    for(let key of list){
        const a = key[0]
        const b = key[1]
        
        
        if(result[a] > result[b]) answer+= a
        else if(result[a] < result[b])answer+= b
        else {
            const sorted = [...key].sort()
            answer += sorted[0]}
        
    }
    
    
    
    

    return answer;
}

function initResult(){
    const list = ["RT", "CF", "JM", "AN"]
    const map = {}
     
    for(let key of list){
        const [a, b] = key.split("")
        map[a] = 0
        map[b] = 0
    }
    return map 
}

function getMap(){
    const list = ["RT", "CF", "JM", "AN"]
    const map = {}
     
    for(let key of list){
        const [a, b] = key.split("")
        
        
        const obj = {}
        obj[a] = 0
        obj[b] = 0
        map[key] = obj
    }
    
    return map 
    
    
}


function getScore(choiceNum){
    if(choiceNum < 4) return 4 - choiceNum
    return choiceNum - 4

}