#include <iostream>

using namespace std;

int main()
{
	const int wielkosc_tablicy = 5;
	int tablica[wielkosc_tablicy];
	
	//tablice 2;
	int tablica_parz[wielkosc_tablicy];
	int tablica_nieparz[wielkosc_tablicy];
	
	int a;
	cout<< "Podaj 5 liczb do tablicy"<<endl;
	
	for (int i =0; i< wielkosc_tablicy; i++)
	{
		cin>>a;
		tablica[i] = a;
	}
	int i_parz = 0;
	int i_nieparz = 0;
	
	for (int i = 0; i< wielkosc_tablicy; i++)
	{
		if(tablica[i]%2==0)
		{
			tablica_parz[i_parz] = tablica[i];
			i_parz++;
		} else
		{
			tablica_nieparz[i_nieparz] = tablica[i];
			i_nieparz++;
		}
	}
	
	
	cout<<"tablica parzysta"<<endl;
	for (int i = 0; i < i_parz; i ++)
	{
		cout<<tablica_parz[i]<<endl;
	}

	cout<<"tablica nieparzysta"<<endl;

	for (int i = 0; i < i_nieparz; i ++)
	{
		cout<<tablica_nieparz[i]<<endl;
	}
	
	return 0;

}

