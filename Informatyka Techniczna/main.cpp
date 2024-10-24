#include <iostream>

using namespace std;

double pole(double a,double b,double h)
    {

    return (a+b)/2*h;
    }

int main()
{
    double a,b,h;



    cout<<"Podaj dl podstawy gornej"<<endl;
    cin>>a;
    cout<<"Podaj dl podstawy dolnej"<<endl;
    cin>>b;
    cout<<"Podaj dl wysokosci"<<endl;
    cin>>h;

    cout<<pole(a,b,h);

    return 0;
}
