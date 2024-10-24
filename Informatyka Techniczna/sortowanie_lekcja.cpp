#include <iostream>
using namespace std;

int main()
{
  const int roz= 20;
  double t[ roz ];
  int n;
  cin>> n;
  for( int i= 0; i< n; i++ )
    cin>> t[ i ];
  for( int i= n- 1; i>= 0; i-- )
    cout<< t[ i ]<< endl;
  for( int i= n; i> 0; i-- )
    cout<< t[ i- 1 ]<< endl;
  for( int i= 0; i< n; i++ )
    cout<< t[ n- i- 1 ]<< endl;

  cout<< endl;
  cout<< endl;
  cout<< endl;
  for( int i= 0; i< n/ 2; i++ )
  {
    double pom;
    pom= t[ i ];
    t[ i ]= t[ n- i- 1 ];
    t[ n- i- 1 ]= pom;
  }
  for( int i= 0; i< n; i++ )
    cout<< t[ i ]<< endl;
  return 0;
}
