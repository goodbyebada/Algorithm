#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
#include <stack>
#define endl "\n"
using namespace std;

/*
����Լ�
*/

void boj(int n, string str)
{

    cout << str + "\"����Լ��� ������?\"" << endl;
    if (n > 0)
    {
        cout << str + "\"�� ����. �������� �� �� ����⿡ �̼��� ��� ������ ����� ������ �־���." << endl;
        cout << str + "���� ������� ��� �� ���ο��� ������ ������ �߰�, ��� �����Ӱ� ����� �־���." << endl;
        cout << str + "���� ���� ��κ� �ǾҴٰ� �ϳ�. �׷��� ��� ��, �� ���ο��� �� ���� ã�ƿͼ� ������.\"" << endl;
        string plus = "____";
        n--;
        boj(n, str + plus);
    }
    else if (n == 0)
    {
        // cout << str + "\"����Լ��� ������?\"" << endl;
        cout << str + "\"����Լ��� �ڱ� �ڽ��� ȣ���ϴ� �Լ����\"" << endl;
    }

    cout << str + "��� �亯�Ͽ���." << endl;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int T;
    cin >> T;
    cout << "��� �� ��ǻ�Ͱ��а� �л��� ������ �������� ã�ư� ������." << endl;
    string str = "";
    boj(T, "");

    return 0;
}
