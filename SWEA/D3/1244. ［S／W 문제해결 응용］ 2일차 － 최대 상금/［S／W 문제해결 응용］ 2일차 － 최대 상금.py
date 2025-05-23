
#import sys
#sys.stdin = open("input.txt", "r")

def dfs(num_str_list, k):
    global max_val
    if(k == count):
        new_number = int("".join(num_str_list))
        max_val = max(max_val, new_number)
        return

    for i in range(len(num_str_list)):
        for j in range(i+1, len(num_str_list)):
            num_str_list[i], num_str_list[j] = num_str_list[j], num_str_list[i]

            new_set = ("".join(num_str_list), k+1)
            # 중복 제거
            # 새로운 거라면
            if new_set not in visited:
                visited.add(new_set)
                dfs(num_str_list, k+1)
            # 원위치
            num_str_list[j], num_str_list[i] = num_str_list[i], num_str_list[j]


T = int(input())
for i in range(T):
    num, count = map(int, input().split(" "))
    visited = set()
    max_val = 0
    dfs(list(str(num)), 0)
    print(f'#{i+1} {max_val}')


