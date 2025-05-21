#include <iostream>>
using namespace std;

long long int silnia_r( int n );

long long int silnia_r( int n )
{
  if( n< 2 )
    return 1;
  return silnia_r( n- 1 )* n;
}

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
int w;
double epsilon(double x, int e)
{
    if (w )

}

int main()
{
    int x, e;
    cout<<"Podaj x"<<endl;
    cin>>x;
    cout<<"Podaj epsilon"<<endl;
    cin>>e;

    potega(x, e);



}
