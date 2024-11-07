struct Karta: Hashable
{
    var nazwa: String
    var moc: Int
};

var talia: Set<Karta> = [
    Karta(nazwa:"2♠", moc:2),
    Karta(nazwa:"3♠", moc:3),
    Karta(nazwa:"4♠", moc:4),
    Karta(nazwa:"5♠", moc:5),
    Karta(nazwa:"6♠", moc:6),
    Karta(nazwa:"7♠", moc:7),
    Karta(nazwa:"8♠", moc:8),
    Karta(nazwa:"9♠", moc:9),
    Karta(nazwa:"10♠", moc:10),
    Karta(nazwa:"J♠", moc:2),
    Karta(nazwa:"Q♠", moc:3),
    Karta(nazwa:"K♠", moc:4),
    Karta(nazwa:"A♠", moc:11),

    Karta(nazwa:"2♥", moc:2),
    Karta(nazwa:"3♥", moc:3),
    Karta(nazwa:"4♥", moc:4),
    Karta(nazwa:"5♥", moc:5),
    Karta(nazwa:"6♥", moc:6),
    Karta(nazwa:"7♥", moc:7),
    Karta(nazwa:"8♥", moc:8),
    Karta(nazwa:"9♥", moc:9),
    Karta(nazwa:"10♥", moc:10),
    Karta(nazwa:"J♥", moc:2),
    Karta(nazwa:"Q♥", moc:3),
    Karta(nazwa:"K♥", moc:4),
    Karta(nazwa:"A♥", moc:11),

    Karta(nazwa:"2♦", moc:2),
    Karta(nazwa:"3♦", moc:3),
    Karta(nazwa:"4♦", moc:4),
    Karta(nazwa:"5♦", moc:5),
    Karta(nazwa:"6♦", moc:6),
    Karta(nazwa:"7♦", moc:7),
    Karta(nazwa:"8♦", moc:8),
    Karta(nazwa:"9♦", moc:9),
    Karta(nazwa:"10♦", moc:10),
    Karta(nazwa:"J♦", moc:2),
    Karta(nazwa:"Q♦", moc:3),
    Karta(nazwa:"K♦", moc:4),
    Karta(nazwa:"A♦", moc:11),

    Karta(nazwa:"2♣", moc:2),
    Karta(nazwa:"3♣", moc:3),
    Karta(nazwa:"4♣", moc:4),
    Karta(nazwa:"5♣", moc:5),
    Karta(nazwa:"6♣", moc:6),
    Karta(nazwa:"7♣", moc:7),
    Karta(nazwa:"8♣", moc:8),
    Karta(nazwa:"9♣", moc:9),
    Karta(nazwa:"10♣", moc:10),
    Karta(nazwa:"J♣", moc:2),
    Karta(nazwa:"Q♣", moc:3),
    Karta(nazwa:"K♣", moc:4),
    Karta(nazwa:"A♣", moc:11),
];



func countSum(talia: Set<Karta>) -> Int{
    var sum = 0
    for elem in talia{
        print("\(elem.nazwa) (\(elem.moc))", terminator: ", ")
        sum += elem.moc
    }
    print("Σ  \(sum)", terminator: "\n")
    return sum
}

func main(){

    var gracz: Set<Karta> = [];
    var komputer: Set<Karta> = [];
    var pas: Bool = false;
    var graczMoc: Int = 0;
    var komputerMoc: Int = 0;


    print("-------------- Oczko --------------\n")
    print("\n\nKolej: Gracz")
    print("\n\nWpisz d aby dobrać, bądz p aby spasować")
    while(graczMoc < 21 && !pas){
        print("\nWybór: ")
        let wybor = readLine()
        if (wybor == "d"){
            let randomElement = talia.randomElement()!
            gracz.insert(randomElement)
            talia.remove(randomElement)
            graczMoc = countSum(talia: gracz)
            if(graczMoc == 22 && gracz.count == 2){
                print("\n--- perskie oczko ---")
                 print("\nGracz wygrał")
                print("\nKONIEC GRY")
                return
            }
        } else if (wybor == "p"){
            pas = true
            print("Pas")
        }
    }
    pas = false
    print("\n\nKolej: Komputer")
    while(komputerMoc < 21 && !pas){
        var wybor = Int.random(in: 0...9)
        if(komputerMoc == 20){
            wybor = 9
        }
        if (wybor < 8){
            let randomElement = talia.randomElement()!
            komputer.insert(randomElement)
            talia.remove(randomElement)
            komputerMoc = countSum(talia: komputer)
            if(komputerMoc == 22 && komputer.count == 2){
                print("\n--- perskie oczko ---")
                print("\nKomputer wygrał")
                print("\nKONIEC GRY")
                return
            }
        } else {
            pas = true
            print("Pas")
        }
    }
    if(graczMoc == 21 && komputerMoc == 21){
        print("\n\nRemis")
    } else if(abs(graczMoc-21) < abs(komputerMoc-21)){
        print("\n\nGracz wygrał")
    } else if(abs(graczMoc-21) > abs(komputerMoc-21)){
        print("\n\nKomputer wygrał")
    }
}

main()