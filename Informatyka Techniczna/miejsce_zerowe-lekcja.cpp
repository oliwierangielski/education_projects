#include <iostream>
#include <math.h>
using namespace std;
 
double bis( double a, double b, double eps );
 
int main()
{
  double p, k, dok;
  cin>> p>> k>> dok;
  cout<< bis( p, k, dok );
  return 0;
}
 
double f( double x )
{
  return sin( x );
}
 
double bis( double a, double b, double eps )
{
  double sr;
  while( b- a>= eps )
  {
    sr= ( a+ b )/ 2;
    double fsr= f( sr );
    if( fsr== 0 )
      return sr;// a= b= sr;
    if( f( a )* fsr< 0 )
      b= sr;
    else
      a= sr;
  }
  return sr;
}
