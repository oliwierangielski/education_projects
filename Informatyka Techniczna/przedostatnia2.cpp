#include <iostream>
using namespace std;
int main(){
    int rozmiar, a,premax;
    int max = 0;
    cout<<"Podaj ile liczb: ";
    cin>>rozmiar;
    for (int i =0; i< rozmiar; i++){
        cout<<"Podaj "<<i+1<<" liczbe: ";
        cin>>a;
       

        if(a > max){
            premax = max;
            max = a;
        } else if(a > premax){
            premax = a;
        }
    }
    cout<<"Przedostatnia to: "<<premax<<endl;
}
