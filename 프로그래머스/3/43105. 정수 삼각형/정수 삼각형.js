function solution(triangle) {
    const depth = triangle.length;
    const dp = triangle.map(row => [...row]); // 깊은 복사
    
    for(let d = 0; d < depth - 1; d++){
        for(let i = 0; i < triangle[d].length; i++){
            dp[d+1][i] = Math.max(dp[d+1][i], dp[d][i] + triangle[d+1][i]);
            dp[d+1][i+1] = Math.max(dp[d+1][i+1], dp[d][i] + triangle[d+1][i+1]);
        }
    }
    
    return Math.max(...dp[depth-1]);
}