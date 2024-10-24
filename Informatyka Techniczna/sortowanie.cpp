#include <iostream>
using namespace std;
int main()
{
	int a;
	double b;
	const int rozmiar_tablicy = 20;
	double tablica[rozmiar_tablicy];
	cout<<"Wypisz jak duza ma byc tablica"<<endl;
	cin>>a;
	
	
	
	int i =0;
	while (i <= a - 1 )
	{
		cout<<"Wypisz "<<i+1<<" liczbe  rzeczywista ";
		cin>>b;
		tablica[i] = b;
		i++;
	}
	
	
	while (a > 0)
	{
		cout<<tablica[a-1]<<endl;
		a--;
	}
	
}
