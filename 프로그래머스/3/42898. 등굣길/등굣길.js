
// (1,1) -> (m,n)
// 오른쪽, 아래쪽 최단경로의 개수
// %1,000,000,007
// 물에 잠긴 지역 피해서 가야함.

// 1. BFS => 안된디, 이건 최단 도착 시간, 혹은 거리 
// 물 -> 갈 수 없음 -1 
// q방문 x => 0 

// 2. dp..? 가능하긴 한데
//  최단경로의 개수!!!
// 각 위치마다 올 수 있는 개수 갱신 해야함
// 이전 위치 + 1


function solution(m, n, puddles) {
    var answer = 0;
//     1부터 시작
//     m 열 가로  -> col 
//     n 행 세로  -> row
//     (좌표 => 열, 행)으로 주어짐
    
    const dp = Array(n+1).fill(0).map(() => Array(m+1).fill(0))
    for(const [col, row] of puddles){
//         갈 수 없는 지역 표시 
        dp[row][col] = -1
    }
    
    bfs(dp, n, m)
    
    console.log(dp)
    return answer;
}




function bfs(dp, row, col){
//     시작
    let index = 0 
    dp[1][1] = 1
    const q = [[1,1]]
    // 오른쪽과 아래쪽
    const dirs = [[0,1], [1,0]]
    
    while(index < q.length){
        const [cr, cc] = q[index++]
//         물 웅덩이라면 Pass
        
        
        if(dp[cr][cc] === -1) continue
            
        for(let dir of dirs){
            let nr = cr + dir[0]
            let nc = cc + dir[1]
            
//             가능 + 물웅덩이가 아니라면 
            if(nr > 0 && nc > 0 && nr <= row && nc <= col && dp[nr][nc] !==-1){
                
//                 중복 왜 생기지?
                
                console.log("현재", cr, cc)
                console.log("이동", nr, nc)
                

                    dp[nr][nc] += dp[cr][cc]
                   q.push([nr,nc])       
            }
        }
        
        
        
    }   
    return dp[row][col]
    
}