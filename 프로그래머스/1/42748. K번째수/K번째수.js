// commands 이중 배열
// commands 내부 길이 만큼 반복
// item 0 시작 배열 j (포함) 끝나느 ㄴ배열 
// 정렬 후 k번째 idx(k-1)

function solution(array, commands) {
    var answer = [];
    
    for( const item of commands){
        const [start, end, k] = item
        
        const arr = array.slice(start-1, end).sort((a,b) => a-b)
        console.log(arr)
        answer.push(arr[k-1])      
    }
    
        
    
    
    return answer;
}