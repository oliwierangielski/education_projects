#include <iostream>
#include <math.h>
 
using namespace std;
 
double fun(double x)
{
        return sin(x);
        
}
 
double calka(double pocz, double kon, int iloscKawal)
{
 
 
double wys = (kon-pocz)/iloscKawal;
double trapez = 0.0;
int i = 0;
 
while(i < iloscKawal)
{
 
trapez = trapez + (( fun(pocz + i * wys) + fun(pocz + (i+ 1) * wys)) /2) * wys;
i++;
}
 
 
 
return trapez;
}
 
 
int main()
{
        double a, b;
        int c;
        cout<<"Podaj konce przedzialow po spacji"<<endl;
        cin>>a>>b;
        cout<<"Podaj na ile kawalkow podzielic"<<endl;
        cin>>c;
        cout<<calka(a,b,c);
        
        return 0;
}
