#include <iostream>
using namespace std;

long long int silnia_r( int n );
long long int silnia_i( int n );

int main()
{
  int k;
  cin>> k;
  for( int i= 0; i<= k; i++ )
    cout<< i<<'\t'<< silnia_r( i )<<'\t'<< silnia_i( i )<< endl;
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
