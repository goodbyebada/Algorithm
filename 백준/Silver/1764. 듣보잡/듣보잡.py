import sys
input = sys.stdin.readline

N,M = map(int,input().split())


lista = []
listb = []

for _ in range(N):
    lista.append(input().rstrip())
s1 = set(lista)

for _ in range(M):
    listb.append(input().rstrip())
s2 = set(listb)



dontseedonthear = list(s1.intersection(s2))

dontseedonthear.sort()


print(len(dontseedonthear))

for name in dontseedonthear:
    print(name)