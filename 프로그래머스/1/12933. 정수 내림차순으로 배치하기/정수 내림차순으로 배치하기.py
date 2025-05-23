def solution(n):

    num = sorted([int(i) for i in list(str(n))], reverse=True)
    answer = int("".join(map(str, num)))
    
    return answer