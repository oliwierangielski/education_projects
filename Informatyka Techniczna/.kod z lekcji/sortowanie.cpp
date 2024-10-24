#include <iostream>
using namespace std;

void pr_wyb( double t[], int n );

int main()
{
  const int rozm= 20;
  double tab[ rozm ];
  int n;
  cin>> n;
  for( int i= 0; i< n; i++ )
    cin>> tab[ i ];


  pr_wyb( tab, n );

  for( int i= 0; i< n; i++ )
    cout<< tab[ i ]<< endl;
  return 0;
}

void pr_wyb( double t[], int n )
{
  for( int j= n- 1; j> 0; j-- )
  {
    int m= 0;
    for( int i= 1; i<= j; i++ )
      if( t[ i ]> t[ m ])
        m= i;
    double pom= t[ m ];
    t[ m ]= t[ j ];
    t[ j ]= pom;
  }
}

void pr_zam( double t[], int n )
{
  bool zamiana;
  int m= n;
  do
  {
    zamiana= false;
    for( int i= 1; i< m; i++ )
      if( t[ i- 1 ]> t[ i ])
      {
        double pom= t[ i ];
        t[ i ]= t[ i- 1 ];
        t[ i- 1 ]= pom;
        zamiana= true;
      }
    m--;
  }while( zamiana );
}

void pr_wstaw( double t[], int n )
{
  /*
    przesuniecie elementow w "prawo" by zrobuic miejsce dla wartownika
  */
  for( int i= n; i> 0; i-- )
    t[ i ]= t[ i- 1 ];
  /*
    sortowanie zasadnicze
  */
  for( int k= 1; k< n; k++ )// mamy juz k poczatkowych elementow posortowanych;
                            // szukamy miejsca dla k+1- szego elementu i go wstawiamy
  {
    t[ 0 ]= t[ k+ 1 ];// ustawienie wartownika
    int j;
    for( j= k; t[ j ]> t[ 0 ]; j-- )// znajdowanie miejsca dla elementu wstawianego
      t[ j+ 1 ]= t[ j ];// przy okazji od razu przesuwamy elementy w "prawo"
    t[ j+ 1 ]= t[ 0 ];// element wstawiany (jego kopia z wartownika) idzie na wlasciwe miejsce
  }
  /*
    przesuniecie elementow w "lewo" likwidujac wartownika
  */
  for( int i= 0; i< n; i++ )
    t[ i ]= t[ i+ 1 ];
}

void zlicz_prym( int t[], int n )
{
  /*
    znajdz maksymum
  */
  int m= t[ 0 ];
  for( int i= 1; i<= j; i++ )
    if( t[ i ]> m )
      m= t[ i ];
  /*
    tworzenie i przygotowanie wstepne tablicy licznikow
  */
  m++;// tablica jest potrzebna o 1 wieksza niz maks
  int *licz;
  licz= new int[ m ];
  for( int i= 0; i< m; i++ )
    licz[ i ]= 0;// zerowanie kazdego licznika
  /*
    zliczenie ilosci wystapien kazdego klucza
  */
  for( int i= 0; i< n; i++ )
  {
    int k= t[ i ];
    licz[ k ]++;
  }
  /*
    wypisanie kazdego klucza tyle razy, jaka jest wartosc licznika dla tego klucza
  */
  for( int i= 0, n= 0; i< m; i++ )
  {
    int k= licz[ i ];
    for( int j= 0; j< k; j++, n++ )
      t[ n ]= i;
  }
}






