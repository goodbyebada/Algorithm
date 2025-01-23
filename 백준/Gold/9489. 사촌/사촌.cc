#include <bits/stdc++.h>

using namespace std;

int main() {
	//freopen("input.txt", "r", stdin);
	ios_base::sync_with_stdio(0);
	cin.tie(0); cout.tie(0);

	while (true) {  // 반복 1번 당 테스트케이스 1개 
		int N, K;
		cin >> N >> K;
		if (N == 0 || K == 0) // 0 0 입력시 입력 종료
			break;

		vector<int> arr(N);
		for (int i = 0; i < N; ++i)
			cin >> arr[i];

		map<int, int> parent; // key : 노드 번호   value : key 노드의 부모 노드 번호
		parent[arr[0]] = 0;  // arr[0] 는 루트 노드이다. 루트는 부모가 없기에 부모를 0 으로 지정
		map<int, vector<int>> children; // key : 노드 번호   value : key 노드의 자식 노드'들'
		map<int, int>::iterator parent_ptr;  // parent 맵 처음부터 순회할 반복자 (조상 노드부터 BFS 방식으로 순회하는 느낌일듯..!)

        // 1️⃣ 노드마다 자신의 부모와 자식들 map 에 전부 저장! 
		for (int i = 1; i < N; ++i) {
			if (arr[i] - arr[i - 1] > 1) { // 다음 노드로 포인터 옮기기 (연속된 집합에 속하는 노드들은 같은 부모의 자식이다. 이 집합이 끝났으니 이제 다음 노드들은 다음 노드의 자식들이라는 것이기 때문에 포인터 옮김)
				if (i == 1) parent_ptr = parent.begin();
				else ++parent_ptr;
			}
			parent[arr[i]] = parent_ptr->first;
			children[parent_ptr->first].push_back(arr[i]);
		}
        
		// 2️⃣ 사촌 가려내기 작업
        // 루트노드와 루트노드의 직속 자식들은 사촌이 없다.
		if (parent[K] == K || parent[K] == arr[0])
			cout << 0 << '\n';
		// 그외
		else {
			int grandParent = parent[parent[K]]; // K 노드의 할아버지
			vector<int> uncles = children[grandParent]; // K 노드의 할아버지의 자식들 (= K의 부모 + K의 삼촌들)
			int count = 0;
			for (int i = 0; i < uncles.size(); ++i)
				if (uncles[i] != parent[K]) // K 의 삼촌들의 자식들만 세면 된다.
					count += children[uncles[i]].size();
			cout << count << '\n';
		}
	}
}