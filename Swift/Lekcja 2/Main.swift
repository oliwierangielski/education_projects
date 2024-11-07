func imie(){
    print("Wpisz imię, a ja zwrócę płeć: ")
    let name = readLine() ?? ""
    if(name == ""){
        print("Wpisano nie poprawne dane.")
        return imie()
    } else {
        if(name.uppercased() == "KUBA" || name.uppercased() == "BARNABA"){
        print("imię męskie")
        } else {
            let end = name.last
            end! == "a" ? print("imię kobiece") : print("imię męskie")
        }
    }
    main()
}

func sprawdzPesel(nrpesel: String) -> Bool{
    var sum: Int = 0
    let wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1]
    for i in (0..<11){
        sum += wagi[i] * (nrpesel[nrpesel.index(nrpesel.startIndex, offsetBy: i)].wholeNumberValue ?? 0)
    }

    return !(sum%10==0)
}


func pesel(){
    print("Podaj pesel: ")
    let nrpesel = readLine() ?? ""
    let peselArr = Array(nrpesel).map{$0.wholeNumberValue ?? 0}
    if(nrpesel.count != 11){
        print("Podano niepoprawny numer Pesel")
        return pesel()
    } else {
        if(!sprawdzPesel(nrpesel: nrpesel) == false){
            print("Podany numer Pesel nie istnieje")
            return pesel()
        }
        print(nrpesel[nrpesel.index(nrpesel.startIndex, offsetBy: 9)].wholeNumberValue ?? -1)
        switch((nrpesel[nrpesel.index(nrpesel.startIndex, offsetBy: 9)].wholeNumberValue ?? -1)){
            case 0, 2, 4, 6, 8:
                print("Kobieta")
            case 1, 3, 5, 7, 9:
                print("Męzczyzna")
            break;
            case -1:
                print("Błąd")
            default:
                print("Błąd")
        }

        let koncowkaRoku = String(peselArr[0]) + String(peselArr[1])
        let miesiac = peselArr[2] * 10 + peselArr[3]
        let dzien = peselArr[4]*10 + peselArr[5]
        switch(peselArr[2]*10 + peselArr[3]){
            case let x where x >= 80:
                print("rok: 18\(koncowkaRoku)")
                print("miesiąc: \(miesiac-80)")
                print("dzien: \(dzien)")
                break
            case let x where x >= 60:
                print("rok: 22\(koncowkaRoku)")
                print("miesiąc: \(miesiac-60)")
                print("dzien: \(dzien)")
                break
            case let x where x >= 40:
                print("rok: 21\(koncowkaRoku)")
                print("miesiąc: \(miesiac-40)")
                print("dzien: \(dzien)")
                break
            case let x where x >= 20:
                print("rok: 20\(koncowkaRoku)")
                print("miesiąc: \(miesiac-20)")
                print("dzien: \(dzien)")
                break
            default:
                print("rok: 19\(koncowkaRoku)")
                print("miesiąc: \(miesiac)")
                print("dzien: \(dzien)")
                break;

        }
        main()
    }
}



func main(){
    print("Wybierz:")
    print("1 - imie")
    print("2 - pesel")
    print("k - wyjscie")
    let wybor = readLine() ?? ""
    switch(wybor){
        case "1":
            imie()
            break
        case "2":
            pesel()
            break
        case "k":
            return
        default:
            print("Podano nie poprawną komendę")
            main()
            break
    }
}

main()



