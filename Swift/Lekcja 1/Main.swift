import Foundation

// Zadanie 1
print("Zadanie 1.")
print("\na)")
for i in (-9...10).reversed(){
    print(i);  
}

print("\nb)")
var ciag: String = ""
for i: Int in stride(from: 15, through: -14, by: -3){
    ciag += (String(i) + " ")
}
print(ciag)

print("\nc)")
for i: Int in (10...40){
    guard i > 15 && i < 25 else {
        print(i)
        continue
    }
}

print("\nd)")
for i: Int in (-40..<40){
    guard (i >= 3 && i < 30) || i%2 != 0 else {
        print(i)
        continue
    }
}

print("\ne)")
for i: Int in (-20..<20){
    guard (i > 5 && i < 10) || i % 2 == 0 else {
        print(i)
        continue
    }
}

print("\nf)")
for i: Int in (-100..<41){
    guard (i > -28 && i < 14) || i % 7 != 0 else {
        print(i)
        continue
    }
}


print("\nZadanie 2.\nPodaj liczbę: ")
let liczba: Int = Int(readLine()!) ?? 0

print("\na)")
for i: Int in (0..<liczba){
    print("X")
}

print("\nb)")
for i: Int in (0..<liczba){
    var linijka = ""
    for y: Int in (0..<liczba){
        if(i==0 || i == liczba-1 || y == 0 || y == liczba-1){
            linijka += "X"
        } else {
            linijka += " "
        }
    }
    print(linijka)
    
}

print("\nc)")
for i: Int in (0..<liczba){
    var linijka = ""
    for y: Int in (0..<liczba-i){
        if(y==0 || y == liczba-i-1 || i == 0){
            linijka += "X"
        } else {
            linijka += " "
        }
    }
    print(linijka)
    
}

print("\nd)")

for i: Int in (0..<liczba).reversed(){
    var linijka: String = ""
    for y: Int in (1...liczba-i){
        linijka += String(y)
    }
    print(linijka)
    
}

print("\ne)")
for i: Int in (0..<liczba).reversed(){
    var linijka: String = ""
    for y: Int in (0..<liczba){
        if(i == 0 || i == liczba-1 || i == Int(ceil(CGFloat(liczba)/2)) || y == 0){
            linijka += "X"
        }
    }
    print(linijka)
    
}

print("\nf)")
var liczba0 = 0;
var liczba1 = 1
var liczba2 = 0;
for i: Int in (2...liczba){
    liczba2 = liczba0 + liczba1
    liczba0 = liczba1
    liczba1 = liczba2
}
print(liczba2)


print("\ng)")
var suma = 0

for i: Int in stride(from: 1, through: liczba, by: 2){
    suma+=i
}

print(suma)

print("\nh)")
var stanLiczby = "pierwsza"
for i: Int in (2..<liczba){
    if(liczba%i==0){
        stanLiczby = "złozona"
        break
    }
}
print(stanLiczby)


print("\ni)")
var linijka1 = "   "
for n: Int in (1...liczba){
        linijka1 += String(n) + " "
}
print(linijka1)
linijka1 = "   "
for n: Int in (1...liczba){
        linijka1 += "__"
}

print(linijka1)


for i: Int in (1...liczba){
    var linijka = ""
    for y: Int in (1...liczba){
        linijka += String(y*i) + " "
    }
    print(String(i) + "| " + linijka)
}

