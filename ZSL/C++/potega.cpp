#include <iostream>
using namespace std;

int potega(int podstawa, int wykladnik)
{
    int poziom = 1;
    int wynik = podstawa;
    while (poziom < wykladnik){

        wynik = wynik * podstawa;
            cout<<wynik<<endl;
        poziom++;
    }


}

int potega2(int podstawa, int wykladnik)
{
    int poziom = 1;
    long long liczba;
    while (poziom < wykladnik)
    {
        liczba = podstawa * podstawa;
        poziom =
    }

}

int main(){
int a, b;

cout<<"Wypisz jak� liczbe chcesz pot�gowa�"<<endl;
cin>>a;
cout<<"Wypisz do jakiej pot�gi chcesz pot�gowa�"<<endl;
cin>>b;
potega(a,b);
}
