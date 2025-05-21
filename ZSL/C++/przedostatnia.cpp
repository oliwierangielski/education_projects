#include <iostream>
using namespace std;
int main() {
    int wielkosc, a, pomoc;
    int tablica[100];

    cout<<"Podaj jak wielka ma być tablica: (0-100)";
    cin>>wielkosc;

    for (int i = 0; i < wielkosc; i++){
        cout<<"Podaj "<<i+1<<" liczbe: ";
        cin>>a;
        tablica[i] = a;
    }

for (int i =1; i<=2; i++){
    for (int i = 0; i < wielkosc; i++){
        if(tablica[i] > tablica[i+1]){
            pomoc = tablica[i+1];
            tablica[i+1] = tablica[i];
            tablica[i] = pomoc;
        }
    }
}
cout<<"Przedostatni wynik: "<<tablica[wielkosc-2];

    return 0;
}
