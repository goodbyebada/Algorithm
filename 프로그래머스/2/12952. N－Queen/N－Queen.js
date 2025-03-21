
var answer = 0;
function solution(n) {
    const queens = []

    for(let col = 0; col < n; col++){
        dfs(0, col, n, [...queens])
    }
    
    return answer;
}

function dfs(row, col, n, tmpQueens){
    tmpQueens.push([row,col]);
    

    if(row === n-1){
        answer++
        return 
    }
    
    for(let curCol = 0; curCol < n; curCol++){
        
        if(canVist(row+1, curCol,tmpQueens)){
            dfs(row+1, curCol, n, [...tmpQueens] )
        }        
    }
    
}

function canVist(row, col, tmpQueens){
    
    for(let [x, y] of tmpQueens){    
        if((x === row)||(y === col)) return false
        if(Math.abs(x-row) === Math.abs(y-col)) return false
    }

    return true
    
}