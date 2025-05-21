#include <iostream>
using namespace std;
 
long long int silnia_r( int n );
long long int silnia_i( int n );
long long int fib_r( int n );
long long int fib_i( int n );
double ex( double x, double eps );
 
int main()
{
  double arg, dok;
  cin>> arg>> dok;
  cout<< ex( arg, dok );
/*
  int k;
  cin>> k;
  for( int i= 0; i<= k; i++ )
  {
    cout<< i<< endl;
    cout<< fib_r( i )<< endl;
    cout<< fib_i( i )<< endl;
    cout<< endl;
  }
*/
  return 0;
}
 
long long int silnia_r( int n )
{
  if( n< 2 )
    return 1;
  return silnia_r( n- 1 )* n;
}
 
long long int silnia_i( int n )
{
  long long int w= 1;
  for( int i= 2; i<= n; i++ )
    w*= i;
  return w;
}
 
long long int fib_r( int n )
{
  if( n< 2 )
    return 1;
  return fib_r( n- 1 )+ fib_r( n- 2 );
}
 
long long int fib_i( int n )
{
  long long int w= 1, pop= 1, ppop= 1;
  for( int i= 2; i<= n; i++ )
  {
    w= pop+ ppop;
    ppop= pop;
    pop= w;
  }
  return w;
}
 
double sz_pot( double x, int n )
{
  if( n== 0 )
    return 1;
  double w;
  w= sz_pot( x, n/ 2 );
  w= w* w;
  if( n% 2== 1 )
    w*= x;
  return w;
}
 
double sz_pot_i( double x, int n )
{
  double w= 1;
  while( n!= 0 )
  {
//    if( n& 1== 1 )
    if( n% 2== 1 )
      w*= x;
    x= x* x;
//    n>>= 1;// n= n>> 1
    n/= 2;// n= n>> 1
  }
  return w;
}
 
double ex_do_bani( double x, double eps )
{
  double w, s= 0;
  int i;
  i= 0;
  do
  {
    w= sz_pot_i( x, i )/ silnia_i( i );
    s+= w;
    i++;
  }while( fabs( w )>= eps );
  return s;
}
 
double ex( double x, double eps )
{
  double w= 1, s= w;
  int i;
  i= 1;
  while( fabs( w )>= eps )
  {
    w= w* x/ i;
    s+= w;
    i++;
  }
  return s;
}
