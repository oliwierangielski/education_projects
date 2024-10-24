#include <iostream>
#include <math.h>

using namespace std;

int i = 01;
long long int ciag = 01;
int ile_10_ma_liczba(int liczba){
	int ile_10;
	while (liczba > 10)
	{
		liczba /= 10; //liczba = liczba / 10;
		ile_10++;
	}
	
	return ile_10;
}

int ciag_fibonnaciego(int koniec)
{
	int ostatnia	= ciag%10;
	int przedostatnia = ((ciag - ostatnia)/10)%10;
	while (i < koniec){
	cout<<0;
	
	
//	cout<<"ILE 10:   "<<<<endl;
	int mnoznik = ile_10_ma_liczba(przedostatnia + ostatnia);
//	cout<<"Mno¿nik "<<pow(10, mnoznik)<<endl;
	ciag = ciag * 10 * pow(10, mnoznik) + ostatnia + przedostatnia;
	cout<<ciag<<" ,bo -> "<<przedostatnia<<" + "<<ostatnia<<endl;
	int ostatnia_kopia = ostatnia;
	ostatnia = przedostatnia + ostatnia;
	przedostatnia = ostatnia_kopia;
	i++;
	}
}

int main ()
{
	ciag_fibonnaciego(20);
}
