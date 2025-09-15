// 컬럼의 값을 기준으로 정렬??
// 각 행의 해당 컬럼 값을 기준으로 정렬. 만약 같다면  첫 번째 컬럼 기준으로 내림차순

function solution(data, col, row_begin, row_end) {
    
    
    
//     sort
     data.sort((a, b) => {
         let num = col -1        
        if (a[num] === b[num]) {
            return b[0] - a[0]; // 첫 번째 컬럼 기준 내림차순
        }
        return a[num] - b[num]; // col번째 컬럼 기준 오름차순
    });
    
//     sum 
//     index 0부터 시작
    let sum;
    
    for(let i = row_begin -1  ; i < row_end ; i++){
        let rowSum = 0;
        
        for(const colVal of data[i]){
            rowSum += colVal % (i+1);
        }
        
        if(sum !== undefined) sum^= rowSum
        else sum = rowSum
    }
    

    
    return sum;
}


