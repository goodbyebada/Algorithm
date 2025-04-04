// 원형 수열의 연속 부분 수열의 합으로 만들 수 있는 개수 구해라

// 길이가 1인 수열의 합 ~ 길이가 N인 수열의 합 
// 중복 제거 -> set 이용해서 count 세준다.
// 처음 인덱스부터 끝까지 인덱스롤 순회한다.
// set에 넣는다.
// 그 다음 배열의 인덱스를 더한 다음 set에 넣는다.
// 이 과정을 인덱스 0부터 ~ N-1까지 반복한다.




function solution(elements) {
    var answer = 0;
    const set = new Set();
    const N = elements.length
    
    
    for(let i = 0; i < N; i++){
        
        let sum = elements[i]
        if(!set.has(sum)) set.add(sum)
        let start = i
        
        while(1){
            start = (start+1)%N
            if(start === i) break
            
            sum += elements[start]
            
            if(set.has(sum)) continue    
            set.add(sum)
        }
             
    }
    
    answer = set.size
    
    
    return answer;
}