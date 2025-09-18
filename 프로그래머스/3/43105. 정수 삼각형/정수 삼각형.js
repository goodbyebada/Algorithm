function solution(triangle) {
    const n = triangle.length;
    const memo = Array.from({length: n}, (_, i) => 
        Array(triangle[i].length).fill(-1)
    );
    
    function dfs(row, col) {
        // 기저 조건: 마지막 행에 도달
        if (row === n - 1) {
            return triangle[row][col];
        }
        
        // 이미 계산된 값이 있으면 반환
        if (memo[row][col] !== -1) {
            return memo[row][col];
        }
        
        // 두 경로 중 최댓값 선택
        const left = dfs(row + 1, col);
        const right = dfs(row + 1, col + 1);
        
        memo[row][col] = triangle[row][col] + Math.max(left, right);
        return memo[row][col];
    }
    
    return dfs(0, 0);
}