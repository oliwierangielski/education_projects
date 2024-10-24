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

  double mx, mn;

  mx= t[ 0 ], mn= t[ 0 ];
  for( int i= 1; i< n; i++ )
    if( t[ i ]> mx )
      mx= t[ i ];
  for( int i= 1; i< n; i++ )
    if( t[ i ]< mn )
      mn= t[ i ];

  mx= t[ 0 ], mn= t[ 0 ];
  for( int i= 1; i< n; i++ )
  {
    if( t[ i ]> mx )
      mx= t[ i ];
    if( t[ i ]< mn )
      mn= t[ i ];
  }

  mx= t[ 0 ], mn= t[ 0 ];
  for( int i= 1; i< n; i++ )
  {
    if( t[ i ]> mx )
      mx= t[ i ];
    else if( t[ i ]< mn )
      mn= t[ i ];
  }

  if( t[ 0 ]> t[ 1 ])
  {
    mx= t[ 0 ];
    mn= t[ 1 ];
  }
  else
  {
    mn= t[ 0 ];
    mx= t[ 1 ];
  }
  for( int i= 1; i< n/ 2; i++ )
  {
    double w, m;
    if( t[ 2* i ]> t[ 2* i+ 1 ])
    {
      w= t[ 2* i ];
      m= t[ 2* i+ 1 ];
    }
    else
    {
      m= t[ 2* i ];
      w= t[ 2* i+ 1 ];
    }
    if( w> mx )
      mx= w;
    if( m< mn )
      mn= m;
  }
  if( n% 2== 1 )
    if( t[ n- 1 ]> mx )
      mx= t[ n- 1 ];
    else if( t[ n- 1 ]< mn )
      mn= t[ n- 1 ];

  return 0;
}
