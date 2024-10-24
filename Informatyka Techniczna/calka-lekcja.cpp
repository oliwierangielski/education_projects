#include <iostream>
#include <math.h>
using namespace std;

double trap( double a, double b, int n );
double f( double x );

int main()
{
  double bok1, bok2;
  int n;
  cout<<"podaj przedzial i dokladnosc: ";
  cin>> bok1>> bok2>> n;
  cout<< trap( bok1, bok2, n );
  cout<<"miejsce zerowe: "<<p<<endl;
  return 0;
}

double trap_zle( double a, double b, int n );
{
  double w, s= 0, dx= ( b- a )/ n, x= a;
  for( int i= 0; i< n; i++ )
  {
    w= ( f( x )+ f( x+ dx ))* dx/ 2;
    s+= w;
    x+= dx;
  }
  return s;
}

double trap( double a, double b, int n );
{
  double s= ( f( a )+ f( b ))/ 2, dx= ( b- a )/ n, x= a+ dx;
  for( int i= 1; i< n; i++ )
  {
    s+= f( x );
    x+= dx;
  }
  s*= dx;
  return s;
}

double f( double x )
{
  return sin( x );
}
