

function solution(numbers) {
    var answer = [];
    
    for(let num of numbers){
        const binaryStr =  num2bin(num)
        const binaryTree = makeBinaryTree(binaryStr)
        fill(binaryTree, binaryStr)
        
        // console.log(binaryTree, binaryStr)
        if(isTree(binaryTree)) answer.push(1)
        else answer.push(0)
        
    }
    
    
    return answer;
}

// 1. 이진수로 변환
function num2bin(num){
    return num.toString(2)
}


// 이진트리 생성
// 일차원 배열 생성
function makeBinaryTree(binaryStr){
    const nodeCnt = binaryStr.length
    let depth = 0
    let sum = 0
    
    while(1){
        if(sum >= nodeCnt) break
        sum += Math.pow(2, depth)
        depth++
    }

    return Array(sum).fill(0)
    
}



// 3. 이진트리 값 채우기
function fill(binaryTree, binaryStr){
    const LEN = binaryTree.length
    let strIndex = 0
    let adjStr = binaryStr;
    

    
    while(adjStr.length < LEN){
        adjStr = "0" + adjStr
    }
    
    

    function dfs(index){
        
        if(index >= LEN) return
        
//         왼
        dfs(2*index + 1)
//         중
        binaryTree[index] = Number(adjStr[strIndex])
        strIndex++
//         오
        dfs(2*index + 2)
    }
    
    dfs(0)
    
    
}

// 4. 트리 가능 여부 판단.
// 트리 순차적으로 탐색 
// 0 <=  < 2^depth
// if

// dfs 0 -> 0일때 리프노드가 아니라면 ~ 

function isTree(binaryTree){
    const nodeCnt = binaryTree.length 
//     let depth = 0
    
//     while(Math.pow(2, depth) < nodeCnt ) depth++
//     depth --
    
//     leaf
//    >= 2^depth
    
    
    if(binaryTree[0] === 0) return false
    
    for(let i = 1; i < binaryTree.length; i++ ){
//         본인이 1인데 부모가 0이면 안됨
                
        if(binaryTree[i] === 1){
            const parentIdx = Math.floor((i-1) / 2)
            if(binaryTree[parentIdx] === 0) return false
        }
        
        
        
        
        
        
        
        
        
        
        
//         if(binaryTree[i] === 0){
//             const left = 2*i + 1
//             const right = 2*i + 2
            
// //             리프노드여야만 true
//             const isLeaf = left >= nodeCnt && right >= nodeCnt
//             if(!isLeaf) return false
//         }
        
    }
    
    return true    
    
}


