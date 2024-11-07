import Foundation

struct Paragraf{
    var tytul: String
    var text: String
    var drogi: Array<Int>
    var dodatkowyText: [Int: String] = [:]
}

var paragrafy: [Int: Paragraf] = [
    0: Paragraf(tytul:"Hol Główny Szkoły", text: "Witaj drogi podróniku. Jest rok 2023. Jesteś uczniem Technikum Łącznośći nr.14 w Krakowie. Niedawno wysiadłeś na przystanku szwedzka i właśnie znajdujesz się przy wejściu głównym do ZSŁ. Jest piątek, 11:00. Twoim celem jest dotarcie na zajęcia do P.Mendeli w sali 309 w internacie, które zaczynają się o 11:15. Wybieraj kolejne drogi aby dojść tam jak najszybciej. Pamiętaj: nie spóźnij się gargamelu!\n\nTwoje drogi:\n\n1:Idz schodami na 1 piętro\n2: Zejdz schodami do podziemi", drogi:[1, 3]),
    1: Paragraf(tytul: "1 Piętro Szkoły", text: "Dotarłeś na 1 piętro. Jest tutaj pełno uczniów. Nie dziwne, dopiero co dzwonek wybił przerwę. Jednak ty nie wiesz gdzie masz iść dalej. Wybierz mądrze!\n\nWybór:\n\n1: Idz po pomoc do dyzurnego\n2: Wejdz do klasy 109\n3: Złóz wizytę Panu wicedyrektorowi\n4: Odwiedz do sekretariat młodziezowy\n5: Idź schodami na 3 piętro", drogi: [4, 5, 6, 7, 2]),
    2: Paragraf(tytul: "2 Piętro Szkoły", text: "Wszedłeś dzielnie po schodach na 2 piętro. Było to nieco wykańczające bo było pełno osób i cięko się było przedrzeć.Musisz jednak szukać dalej. Być moze grając w piłkarzyki na coś wpadniesz. A moze powrót skąd przyszedłeś będzie lepszym rozwiązaniem. A moze pójdziesz do toalety?\n\nWybierz drogę:\n\n1: Zagraj w piłkarzyki\n2: Idź do toalety\n3: Wróć schodami na 1 Piętro Szkoły", drogi: [28, 8, 1]),
    3: Paragraf(tytul: "Podziemia Szkoły", text: "Jesteś w podziemiach. Katakumbach ZSŁ. Jest ciemno jak... Po prostu jest ciemno. I jeszcze te pajęczyny. Stajesz się głodny. Co teraz zrobisz??? Czy pójdziesz do bufetu? A moze na małą salę gimnastyczną.\n\nWybierz:\n\n1:Idz do Bufetu\n2: Odwiedz szatnie\n3: Zajrzyj do małej sali gimnastycznej\n4: Idź schodami do Holu Głównego Szkoły", drogi: [9, 10, 14, 0]),
    4: Paragraf(tytul: "Dyzurny", text: "Widzisz go. To chyba jakiś pierwszoklasista bo trochę nie ogarnia. Siedzi na tym swoim krzesełku. Pytasz się więc go w jakiej sali ma lekcje Pan Mendela i jak tam dojść. Coś tami ci odpowiada, ale czy mu zaufasz?\n\nWybierz:\n\n1: Zaufaj mu\n2: Nie ufaj mu, sam se znajziesz droge przeciez ", drogi: [12, 14]),
    5: Paragraf(tytul: "Klasa 109", text: "Jesteś w swojej klasie i spotykasz ziomeczków którzy proponują palenie fajek pod zabką?\n\nWybierz:\n\n1:Pewnie Chłopaki, idziemy\n2:Nie no chłopaki, ja sie troche cykam", drogi: [27, 1]),
    6: Paragraf(tytul: "Gabinet Wicedyrektora", text: "Wchodzisz do gabinetu i pytasz się, o drogę do P.Mendeli. Dyrektor mówi ci, ze z takimi sprawami to do sekretariatu.\n\nWybierz:\n\n1: Idź do sekretariatu\n2:Wróć na korytarz ", drogi: [7, 1]),
    7: Paragraf(tytul: "Sekretariat Młodziezowy", text: "Wchodzisz. Pytasz się jak dojść do sali P.Mendeli? Dostajesz informacje, ze z takimi rzeczami to do wicedyrektora\n\nWybierz:\n\n1: Idź do wicedyrektora\n2: Wróć na korytarz ", drogi: [6, 1]),
    8: Paragraf(tytul: "Toalety", text: "Jesteś w toalecie. Spotykasz tu Tomka i Przemka. Mówisz im o swoim problemie, a oni oferują ci pomoc.\n\nWybierz:\n\n1: Idziesz z Tomkiem\n2: Idziesz z Przemkiem\n3: Wracasz na korytarz", drogi: [18,13, 1]),
    9: Paragraf(tytul: "Bufet", text: "Jesteś w bufecie. Pytasz się o drogę. Dostajesz odpowiedź by iść do wicedyrektora\n\nWybierz:\n\n1: Idź do wicedyrektora.\n2: Wróć do Podziemi", drogi: [6, 3]),
    10: Paragraf(tytul: "Szatnie", text: "Wszedłeś do szatni. Czujesz nieprzyjemny zapach. Spotykasz w środku jakiegoś gościa co radzi ci byś poszedł do szatni gimnastycznych albo do Małej Sali gimnastycznej.\n\nWybierz:\n\n1: Idź do szatni gimnastycznej\n2: Idź na małą salę gimnastyczną\n3: Wróć do podziemi", drogi: [13, 14, 3]),
    11: Paragraf(tytul: "Korytarz sali gimnastycznej", text: "Jesteś na korytarzu sali gimnastycznej. Idź dalej.\n\nWybierz:\n\n1: Idź na salę gimnastyczną\n2: Idź do szatni gimnastycznej", drogi: [12, 13]),
    12: Paragraf(tytul: "Sala gimnastyczna", text: "Jesteś na sali gimnastycznej. Nauczyciel WFu mówi ci byś poszedł do sali urba\n\nWybierz:\n\n1: Idź do sali urba\n2: Wróć na korytarz sali gimnastycznej", drogi: [15, 11]),
    13: Paragraf(tytul: "Szatnia gimnastyczna", text: "Wchodzisz do sztani i czujesz obrzydliwy zapach. To elektronicy, chwilę temu przebierali się tu po WF. Odór jest tak ogromny, ze od razu wychodzisz\n\nWybierz: \n\n1: Wyjdź od razu", drogi: [11]),
    14: Paragraf(tytul: "Mała sala gimnastyczna", text: "Jesteś na małej sali gimnastycznej. Na ścianie widzisz wyryty napis: Idź do pracowni\n\nWybierz:\n\n1: Idź do pracowni\n2: Wróć do podziemii", drogi: [18, 3]),
    15: Paragraf(tytul: "Sala urba", text: "Jesteś w sali urba koło szkoły. Spotykasz nauczycielkę, która prosi cię abyś wyniósł śmieci do kosza koło parginku:\n\nWybierz:\n\n1: Idziesz wyrzucić śmieci\n2: Sprzeciwiasz się", drogi: [17, 16]),
    16: Paragraf(tytul: "Mieszkanie w ZSŁ obok sali urba", text: "Musisz niestety szukać dalej, bo nic tu nie ma :(\n\nWybierz:\n\n1:Idź do Sali urba\n2: Idź do śmietników", drogi: [15, 17]),
    17: Paragraf(tytul: "Śmienik koło parkingu", text: "Brawo, wyrzuciłeś śmieci. Zrobiłeś dobry uczynek. Teraz czas na poszukanie sali. Coś czujesz, że pójście na pracownie to dobry pomysł\n\nWybierz:\n\n1: Idź na pracownie\n2:Wróć do sali urba", drogi: [18, 15]),
    18: Paragraf(tytul: "Pracownie główny hol", text: "Dotarłeś do pracowni. Brawo. Jesteś coraz bliżej celu. Wybieraj mądrze, aby nie cofnąć się do szkoły\n\nWybierz:\n\n1: Idź na I Piętro pracowni\n2: Wejdź do losowego warsztatu\n3: Idź do Internatu", drogi: [19, 31, 0], dodatkowyText: [3: "Niestety, ale nie trafiłeś i wróciłeś się do początku mapy :("]), // wiadomość dodatkowa
    19: Paragraf(tytul: "Pracownie I piętro", text: "Jesteś na 1 piętrze pracowni. Na koryttarzu roi się od łącznościowców, czekających na lekcje. Wyczuwasz nieprzyjemny zapach spalonego rezysotra z pracowni elektronicznej. A może pójdziesz do pracowni nr 511?\n\nWybierz:\n\n1: Idź do pracowni elektronicznej\n2: Idź do sali 511\n3: Wróć do głównego holu pracowni", drogi: [21, 20, 18], dodatkowyText: [1: "Oj niestety nauczyciel powiedział ci, że musisz najpierw odłożyć plecak do szatni, także cofasz się do szatni"]), // po wejściu do 21 tekst, że musisz odłożyć plecak
    20: Paragraf(tytul: "Pracownia 511", text: "Wchodzisz do sali. Od razu po wejściu widzisz P. Stefańczyka, który wita cię serdecznie i pyta dlaczego przychodzisz, jak jeszcze nie masz z nim lekcji o tej godzinie. Po wyjaśnieniu mu swojego problemu daje ci wskazówkę, jak trafić\n\nWybierz:\n1: Idź za radą p. Stefańczyka\n2: Nie idź za radą p. Stefańczyka", drogi: [22, 20]), 
    21: Paragraf(tytul: "Pracownia Elektroniczna", text: "Wszedłeś do pracowni elektronicznej. Niestety od razu po wejściu dowiedziałeś się, że PLECAKI TO SIĘ TRZYMA W SZTANI A NIE W PRACOWNI ELEKTRONICZNEJ\n\nWybierz:\n1: Idź odłożyć plecak do szatni (Nie masz innego wyboru XD)", drogi: [10]),
    22: Paragraf(tytul: "Wejście główne Internatu", text: "Jesteś w Internaczie. Ale zaraz... To jest wejście dla internatowców. Ty musisz lecieć do wejścia bocznego bo nie masz internatpasa. Chyba, że zaryzkujesz aby przejść skrótem i zyskać kilka cennych sekund. Co zrobisz?\n\nWybierz:\n\n1: Idź na nogach do wejścia bocznego\n2: Idź skrótem", drogi: [23, 6], dodatkowyText: [2: "Zostałeś przyłapany przez opiekuna internatu na nielegalnym przekroczeniu granicy bez internatpasa. Zostajesz wysłany do ambasady ZSŁ w internacie, a następnie poddany ekstradycji do ZSŁ, gdzie trafiasz do wicedyrektora. Naszczęście nic ci nie grozi bo masz imunitet"]), // jak poszedłeś skrótem to do wicedyrektora
    23: Paragraf(tytul: "Wejście boczne internatu", text: "Brawo. Dotarłeś do Internatu. Teraz czeka cię prosta droga do sali p.Mendeli. Ale czy na pewno taka prosta?\n\nWybierz\n1: Idź na III piętro", drogi: [24]),
    24: Paragraf(tytul: "Internat III piętro", text: "Już niewiele cie dzieli od sali. Ale po drodze jest wiele rozpraszaczy.\n\nWybierz:\n1: Idź do sali 309 (Pracownia p.Mendeli)\n2: Idź do pracowni sieciowej\n3: Kup se kawusie", drogi: [29, 25, 26]),
    25: Paragraf(tytul: "Pracownia Sieciowa", text: "Dotarłeś do pracowni sieciowej. Niestety zbyt wcześnie... Lekcje tutaj masz dopiero za 2h. Musisz szukać dalej. Dostajesz informacje od nauczyciela, że sala p.Mendeli jest zaraz obok [sala 309]. Jak mogłeś tam nie trafić LOL  XD\n\nWybierz:\n\n1: Wróć na korytarz", drogi: [24]),
    26: Paragraf(tytul: "Automat z kawą", text: "MMMM. Pyszna kawa. Teraz to można iść na lekcje\n\nWybierz:\n\n1: Idź do Sali p.Mendeli", drogi:[30]),
    27: Paragraf(tytul: "Żabka", text: "Dotarłeś do Żapci. Palisz fajki z ziomeczkami, życie jest piękne. Niestety ale nagle dostrzegasz wicedyrektora na rowerze. Przyłapuje cię jak i twoich ziomeczków. no i koniec. Busted. Przegrałeś i jeszcze masz nagane xd.", drogi: [-1]),
    28: Paragraf(tytul: "Piłkarzyki", text: "Wsumie to se pograłeś i git. Nie idziesz już na zajęcia bo se grasz do końca dnia w piłkarzyki i essa", drogi: [-2]),
    29: Paragraf(tytul: "Pracownia 309", text: "Czyli to koniec. Koniec gry. Jesteś na lekcji masz obecność, może się troche spóźniłeś ale jesteś, a to sie liczy. Co prawda bez kawki :( smuteczek.jpg ale przynajmniej trafiłeś", drogi: [-2]),
    30: Paragraf(tytul: "Pracownia 309", text: "Czyli to koniec. Koniec gry. Jesteś na lekcji masz obecność, może się troche spóźniłeś ale jesteś, a to sie liczy. Masz kawke, czyli możesz programować. POODWOJNY WYGRYW", drogi: [-2]),
    31: Paragraf(tytul: "Losowe Warsztaty", text: "Trafiłeś nie wiadomo gdzie. Mogłeś chodzić do tej szkoły nawet i 10 lat i nigdy byś nawet nie widział, że ta sala istnieje. Ale jakoś tu trafiłeś. Jest pewien problem. Nie wiesz jak stąd wyjść. Bo nigdy tu wcześniej nie byłeś. I dlatego przegrywasz :( Brak Profitu", drogi: [-1]),
]

var ascii = """
  ______ _____ _            _____          __  __ ______ 
 |___  // ____| |          / ____|   /\\   |  \\/  |  ____|
    / /| (___ | |         | |  __   /  \\  | \\  / | |__   
   / /  \\___ \\| |         | | |_ | / /\\ \\ | |\\/| |  __|  
  / /__ ____) | |____     | |__| |/ ____ \\| |  | | |____ 
 /_____|_____/|______|     \\_____/_/    \\_\\_|  |_|______|
"""

var ascii2 = """
              ,---------------------------,
              |  /---------------------\\  |
              | |                       | |
              | |       Wygrałeś        | |
              | |       Wygrałeś        | |
              | |       Wygrałeś        | |
              | |                       | |
              |  \\_____________________/  |
              |___________________________|
            ,---\\_____     []     _______/------,
          /         /______________\\           /|
        /___________________________________ /  | ___
        |                                   |   |    )
        |  _ _ _                 [-------]  |   |   (
        |  o o o                 [-------]  |  /    _)_
        |__________________________________ |/     /  /
    /-------------------------------------/|      ( )/
  /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /
/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"""

print(ascii)


var currentPar = 0
func nextParagraph(parNum: Int){
    if let paragraph = paragrafy[parNum]{
        print("\n------------------------------------")
        print(paragraph.tytul)
        print("------------------------------------")
        print(paragraph.text);
        if(paragraph.drogi[0] == -1){
            print("Przegrałeś")
            return
        } else if(paragraph.drogi[0] == -2){
            print(ascii2)
            return
        } else {
            print("\n\nWybór: ", terminator: "");
            let nextPar = readLine()
            if(paragraph.dodatkowyText[(Int(nextPar!) ?? 0)] != nil){
                print(paragraph.dodatkowyText[(Int(nextPar!) ?? 0)] ?? "")
            }
            let nextRoute = paragraph.drogi[(Int(nextPar!) ?? 1)-1]
            return nextParagraph(parNum: nextRoute)
        }
    }
}
nextParagraph(parNum: currentPar)


// for i in paragrafy[1]!.text{
    // if let paragraf: Paragraf = paragrafy[1]{
    //     var c = 0
    //     Timer.scheduledTimer(withTimeInterval: 0.1, repeats:true) { timer in
    //         print(paragraf.text[paragraf.text.index(paragraf.text.startIndex, offsetBy: c)], terminator: "")
    //         //we can place our code here
    //         c+=1
    //         if(c==paragraf.text.count){
    //             timer.invalidate()
    //         }

    //     }
    // }
// }