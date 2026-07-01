#include<iostream>
using namespace std;
int main(){ 

    float principal, rate, time;
    cout<< "Enter the principal amount: ";
    cin>> principal;
    cout<<"Enter the rate of interest (in %): ";
    cin>> rate;
    cout<<"Enter the time (in years): ";
    cin>> time;

    float interest = (principal * rate * time) / 100;
    cout<< "Simple Interest is : " << interest << endl;
    cout<< "                    Programmed by Rudra Deepak" << endl;


}


