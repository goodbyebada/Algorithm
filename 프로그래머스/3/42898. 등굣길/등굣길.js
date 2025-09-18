function solution(m, n, puddles) {
    const MOD = 1000000007;
    
    // DP 배열 초기화
    const dp = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));
    
    // 물웅덩이 표시
    for (const [col, row] of puddles) {
        dp[row][col] = -1;
    }
    
    // 시작점 초기화
    dp[1][1] = 1;
    
    for (let row = 1; row <= n; row++) {
        for (let col = 1; col <= m; col++) {
            // 물웅덩이라면 스킵
            if (dp[row][col] === -1) continue;
            
            // 현재 위치에서 오른쪽으로 이동
            if (col + 1 <= m && dp[row][col + 1] !== -1) {
                dp[row][col + 1] = (dp[row][col + 1] + dp[row][col]) % MOD;
            }
            
            // 현재 위치에서 아래로 이동
            if (row + 1 <= n && dp[row + 1][col] !== -1) {
                dp[row + 1][col] = (dp[row + 1][col] + dp[row][col]) % MOD;
            }
        }
    }
    
    return dp[n][m];
}