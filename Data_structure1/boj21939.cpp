#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
#include <stack>
#define endl '\n'
using namespace std;

/*
1s

1h

{������ȣ, ���� ���̵�}
1. recommand 1 : ���� ����� ���̵��� ������ ���, ���̵��� ������ ���� ��������� ������ȣ�� ū �� ���
2. recommand -1 : ���� ���� ���̵��� ������ ���, ���̵��� ������ ���� ��������� ������ȣ�� ���� �� ���
3. add P L : ������ȣ p, ���̵��� L �� �߰�
����Ʈ�� ���� ������� ������ȣ p�� ���� �� �ְ�, ����Ʈ�� �ִ� ������� L  �ٸ� ���̵��� ���´�
4.solved P: ��õ ��ȣ ����Ʈ p ����

��ɾ� recommend�� ��õ ���� ����Ʈ�� ������ �ϳ� �̻� ���� ���� �־�����
��ɾ� solved�� ��õ ���� ����Ʈ�� ���� ��ȣ�� �ϳ� �̻� ���� ���� �־�����.

ó�� �־����� ���� ����Ʈ => N�� �ִ� 100000  => 10**5 -> 1�� �ȵ�
���� �߰� , ���� => �ִ� 10000


sol 1)
1. �־��� {������ȣ, ���̵�}�� vec�� push
2. sort => ���̵��� ���ٸ� ������ȣ�� ū ������ ������������ ����
3. add -> ����Ʈ�� �ִ� ������� ���̵��� ����,
���ٸ� push_back �� sort
4. recommand => ������������ ������ ���̱⿡ 1�̶�� vec[1], -1 �̶�� [-1] ���
5. solved -> �̺�Ž���ϸ� ���ݾ� nlogN
{0,0} ���� �ʱ�ȭ , sort , �ε��� -1�������� >0�� ���� ���ö����� pop_back

=> �ð��ʰ�
1) add + sort nlogn -> n�� �ݺ��Ѵٸ� n*nlogn 1�� �Ѿ
2) solved Ž�� logN �ʱ�ȭ + ���� logN  n*nlogn 

----���� ��

map (�����Ʈ��) :  O(log n)�� �ð� ���⵵�� ����, ����, �˻�



*/
vector<pair<int, int> > v;
queue<int> ans;

//  �������� ���̵� ���� -> ���ٸ� ���� ��ȣ {������ȣ , ���̵� }
bool comp(pair<int, int> a, pair<int, int> b)
{
    if (a.second == b.second)
    {
        return a.first > b.first;
    }
    return a.second > b.second;
}

// ���������� ���̳ʸ� ��ġ
void binary_search(vector<pair<int, int> > &v, int target)
{

    int low = 0;
    int high = v.size() - 1;

    while (high - low >= 0)
    {
        int mid = (low + high) / 2;

        if (v[mid].first < target)
        {
            high = mid - 1;
        }
        else if (v[mid].first > target)
        {

            low = mid + 1;
        }
        else
        {
            // v[mid] == target
            // cout << "���� ã��" << v[mid].first << endl;
            v[mid] = {0, 0};
            break;
        }
    }
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;

    int name, lev;

    while (n--)
    {
        cin >> name >> lev;
        v.push_back({name, lev});
    }

    sort(v.begin(), v.end(), comp);
    // �������� ����

    int tmp;
    cin >> tmp;

    while (tmp--)
    {
        string str;
        cin >> str;

        int P, L, x;

        if (str[0] == 'a')
        {
            cin >> P >> L;
            v.push_back({P, L});
            sort(v.begin(), v.end(), comp);
        }
        else if (str[0] == 's')
        {
            // soleved
            cin >> P;
            binary_search(v, P);
            sort(v.begin(), v.end(), comp);
            v.pop_back();
        }
        else
        {
            // 'r'�϶�
            cin >> x;
            if (x > 0)
            {
                cout << v[0].first << endl;
            }
            else
            {
                cout << v.back().first << endl;
            }
        }
    }

    return 0;
}
