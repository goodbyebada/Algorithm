function solution(triangle) {
    const n = triangle.length;
    if (n === 1) return triangle[0][0];
    
    for (let i = n - 2; i >= 0; i--) {
        const row = triangle[i];
        const nextRow = triangle[i + 1];
        
        for (let j = 0, len = row.length; j < len; j++) {
            row[j] += nextRow[j] > nextRow[j + 1] ? nextRow[j] : nextRow[j + 1];
        }
    }
    
    return triangle[0][0];
}