// 노래 고유번호로 구분
// 많이 재생된 장르 먼저 수록
// 장르내 많이 재생된 노래 먼저 수록
//  장르 내에서 재생 횟수가 같은 노래 중 => 고유번호가 낮은 노래 먼저 수록

// 고유번호는 i 
// reuturn i 

// 1. 장르별 정리 장르  - 번호 => 개수
// 장르별로 []
// 개수별로 이어붙이기
// 2. plays[i]로 sort
// 3. 만약 같다면 고유번호로 비교 

function solution(genres, plays) {
    var answer = [];
    const map = new Map()
    const sum  = new Map()
    
    //     장르별 합
    for(let i = 0; i < genres.length ; i++){
         sum.set(genres[i], sum.get(genres[i]) +plays[i] || plays[i] )
        
       if(map.has(genres[i])){
            map.set(genres[i], [...map.get(genres[i]), i])
            continue
        }
        map.set(genres[i], [i])
    }
    
    
    const sortedSum = [...sum].sort((a,b) => {
        return b[1] - a[1]})
    
    for(let [genre] of sortedSum){

        const list = map.get(genre)
      
        const sorted = [...list].sort((a,b) => {            
            if( plays[b] === plays[a]){
                return a-b
            }
            return plays[b]-plays[a]
        }) 
        
        if(sorted.length <= 1) answer.push(...sorted)
        else answer.push(...sorted.slice(0, 2))
        
    }
    

    
    
    
    return answer;
}