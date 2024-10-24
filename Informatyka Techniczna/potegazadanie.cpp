#include <iostream>
using namespace std;
int wynik;
int poziomPotegi = 1;
int potegowanie(int a, int b)
{
	
	if (poziomPotegi == b){
		cout<<"Koniec. Wynik to: "<<wynik<<endl;
		return 0;
	}	
	else if(poziomPotegi * 2 < b){
		wynik = wynik * wynik;
		poziomPotegi= poziomPotegi * 2;
	} else if (poziomPotegi + 1 <= b) {
		wynik = wynik * a;
		poziomPotegi++;
	}
	cout<<wynik<<endl;
	potegowanie(a, b);
	
	
	
}


int main()
{
	int a,b;
	cout<<"Podaj podstawe potegi: "<<endl;
	cin>>a;
	cout<<"Podaj wykladnik potegi: "<<endl;
	cin>>b;
	wynik = a;
	potegowanie(a, b);
}
