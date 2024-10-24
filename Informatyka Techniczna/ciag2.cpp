// Example program
#include <iostream>
using namespace std;

int ciag_fibonnaciego(int dlugosc)
{
    int przedostatnia = 0;
    int ostatnia = 1;
    
    int stopien = 1;
    cout<<przedostatnia;
    while (stopien < dlugosc){
     cout<<ostatnia;
     
     int ostatnia2 = ostatnia;
     ostatnia = przedostatnia + ostatnia;
     przedostatnia = ostatnia2;
     stopien++;
    }
}

int main()
{
    int a;
    cout<<"Wypisz do jakiej liczby ciag fibonnaciego"<<endl;
    cin>>a;
    ciag_fibonnaciego(a);
}
