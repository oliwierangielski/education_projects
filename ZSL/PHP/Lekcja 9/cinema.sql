-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 15 Mar 2023, 00:51
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `cinema`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(11) NOT NULL,
  `title` varchar(20) NOT NULL,
  `image` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `premiere` date NOT NULL,
  `length` varchar(10) NOT NULL,
  `director` varchar(20) NOT NULL,
  `cast` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `movies`
--

INSERT INTO `movies` (`movie_id`, `title`, `image`, `description`, `premiere`, `length`, `director`, `cast`) VALUES
(1, 'Zadra', 'zadra.jpg', '„Zadra” – film muzyczny o młodej raperce, która próbuje wybić się w hip-hopowym świecie zdominowanym przez mężczyzn. To pierwsza polska produkcja o takiej tematyce, bo choć nawiązuje do nurtu stworzonego w filmach „Jesteś Bogiem” i „Proceder”, przedstawia zupełnie nowy rodzaj bohaterki. „Zadra” to utalentowana dziewczyna z blokowiska, która walczy o uznanie na rapowej scenie. Choć wydaje się być zwykłą nastolatką, przed mikrofonem zyskuje niesamowitą energię i charyzmę, dzięki którym może porwać tłumy. Jednak w środowisku pełnym testosteronu ciężko o miejsce dla takich, jak ona. Zadra walczy o marzenia, ale przede wszystkim o lepsze jutro dla swojej rodziny. Mimo to, muzyka nie jest wszystkim, bo na życie głównej bohaterki kluczowy wpływ będzie miała miłość. Z jednej strony moja postać jest Zadrą - scenicznym zwierzęciem i królową sceny. Z drugiej jest Sandrą - dziewczyną z osiedla, która próbuje związać koniec z końcem. Zadra walczy o szacunek i fejm, Sandra o miłość i o rodzinę. Żeby znaleźć szczęście i spełnienie, te dwie postaci i ich pragnienia muszą się połączyć. Wydaje się to niemal niemożliwe – tak o swojej postaci mówi Magdalena Wieczorek. Za muzykę w filmie odpowiada producent 1988 (osiem-osiem), czyli Przemysław Jankowiak, współtwórca kultowego duetu Syny, znany również ze współpracy z legendą polskiego rapu – Włodim. Jankowiak związany jest z wytwórnią Def Jam Recordings Poland. Specjalnie do filmu powstało kilkanaście utworów z udziałem Magdaleny Wieczorek oraz Jakuba Gierszała. Teksty „Zadry” napisał Michał „Żyto” Żytniak, artysta, który nagrywał dla wytwórni Asfalt Records oraz Prosto. ', '2023-03-10', '88 min', 'Grzegorz Mołda', 'Magdalena Wieczorek, Jakub Gierszał, Magdalena Różczka, Ignacy Liss, Margaret'),
(2, 'Szkoła magicznych zw', 'szkolamagicznychzwierzat.jpg', 'Pełna magicznych przygód opowieść o Idzie i Bennim, oparta na bestsellerowej serii książek autorstwa Margit Auer. Ida to nowa uczennica w szkole w Winterstein, która musiała przeprowadzić się do innego miasta. Nie zostaje przyjęta przez klasę z otwartymi rękami. Jedyne wolne miejsce w ławce jest obok outsidera Benniego. Pewnego dnia w szkole w Winterstein wychowawczyni, panna Cornfield, zapowiada przyjazd niezwykłego człowieka. Ma ich odwiedzić Mortimer Morrison, który podróżuje po świecie w poszukiwaniu magicznych zwierząt. Ich niezwykłość polega na tym, że potrafią rozmawiać z człowiekiem, którego biorą za przyjaciela. Magiczne zwierzę nigdy nie zostawi swojego przyjaciela w potrzebie. To najwierniejszy towarzysz, jakiego można sobie wyobrazić. W klasie Ida i Benni jako pierwsi mają magicznych przyjaciół. I nagle okazuje się, że wszyscy chcą się z nimi przyjaźnić. Tymczasem w szkole zaczynają znikać różne przedmioty. Dzieciaki i magiczne zwierzęta muszą trzymać się razem, aby rozwiązać zagadkę szkolnego złodzieja.', '2023-03-17', '93 min', 'Gregor Schnitzler', 'Emilia Maier, Leonard Conrads, Loris Sichrovsky'),
(3, 'Mężczyzna imieniem O', 'mezczyznaimieniemotto.jpg', 'Jest to druga filmowa adaptacja bestsellerowej powieści, Fredrika Backmana „Meżczyzna imieniem Ove”. Pierwszy film był szwedzką produkcją z 2015 roku w reżyserii Hannesa Holma. Był nominowany do Oscara. W nowej ekranizacji wystąpi Tom Hanks jako tytułowy Otto oraz Mariana Treviño, Rachel Keller, Manuel Garcia-Rulfo, Cameron Britton i Mike Birbiglia. Opowiada historię zrzędliwego wdowca, który nie lubi ludzi, swoich sąsiadów ledwo toleruje. Kiedy jednak poznaje nowych sąsiadów przechodzi przemianę. Los pokazuje mu, że może być znowu kochany.', '2023-01-27', '126 min', 'Marc Forster', 'Tom Hanks, Rachel Keller, Manuel Garcia-Rulfo'),
(4, 'Avatar: Istota wody', 'avatar.jpg', 'Akcja filmu Avatar: Istota wody rozgrywa się ponad dziesięć lat po wydarzeniach z pierwszej części. To opowieść o rodzinie Jake’a i Neytiri oraz ich staraniach, by zapewnić bezpieczeństwo sobie i swoim dzieciom, mimo tragedii, których wspólnie doświadczają i bitew, które muszą stoczyć, aby przeżyć.* Drodzy widzowie w filmie Avatar: Istota wody znajduje się kilka scen z dynamicznymi efektami świetlnymi, które mogą powodować dyskomfort u widzów wrażliwych na światło i wpływać na osoby z epilepsją fotogenną.', '2022-12-16', '193 min', 'James Cameron', 'Stephen Lang, Zoe Saldana, Sam Worthington, Sigourney Weaver, Cliff Curtis, Giovanni Ribisi, Joel Da'),
(5, 'Shazam! Gniew bogów', 'shazam.jpg', 'Shazam! Gniew bogów to dalszy ciąg historii nastolatka Billy’ego Batsona, który po wypowiedzeniu magicznego słowa „SHAZAM!” zmienia się w swoje dorosłe alter ego, superbohatera Shazama.', '2023-03-17', '130 min', 'David F. Sandberg', 'Helen Mirren, Zachary Levi, Lucy Liu'),
(6, 'Ant-Man i Osa: Kwant', 'antmaniosakwantomania.jpg', 'Superbohaterowie Scott Lang (Paul Rudd) i Hope Van Dyne (Evangeline Lilly) powracają jako Ant-Man i Osa w nowym, pełnym przygód filmie. Wraz z rodzicami Hope, Hankiem Pymem (Michael Douglas) i Janet Van Dyne (Michelle Pfeiffer), oraz córką Scotta, Cassie Lang (Kathryn Newton), będą eksplorować Wymiar Kwantowy, gdzie spotkają zadziwiające, nieznane istoty. To, co tam przeżyją, zmieni ich wyobrażenia o tym, co jest możliwe. Reżyserem filmu jest Peyton Reed, producentami zostali Kevin Feige i Stephen Broussard, a w rolę Kanga wciela się Jonathan Majors.', '2023-03-17', '125 min', 'Peyton Reed', 'Paul Rudd, Evangeline Lilly, Jonathan Majors'),
(7, 'Wróżka Zębuszka', 'wrozkazebuszka.jpg', 'Sympatyczna Violetta szkoli się, żeby zostać Wróżką Zębuszką i móc wręczać dzieciom prezenty w zamian za ich mleczne zęby. Niestety mimo szczerszych chęci wciąż oblewa egzaminy, bo jedyne upominki, które potrafi wyczarować to… fioletowe kwiaty. A przed nią najważniejszy, doroczny sprawdzian. Kiedy i ten kończy się porażką, Violetta podkrada innej wróżce magiczny klejnot teleportacji i z jego pomocą przenika do naszego świata. Wszystko po to, by udowodnić niedowiarkom, że może być świetną Zębuszką. Pech chce jednak, że w trakcie lądowania w ludzkiej rzeczywistości skradziony klejnot ulega uszkodzeniu i Violleta traci możliwość powrotu do domu. Na szczęście poznaje Maxie – nową dziewczynkę w mieście, której życie wciąż uprzykrzają dwaj przyrodni bracia. Wkrótce połączone przyjaźnią i mocą zaklęć, dziewczynka i wróżka, zrobią wszystko, by odnaleźć tajny portal do świata magii i ocalić miejską przyrodę, której grozi zniszczenie. „Wróżka Zębuszka” to najnowszy film Producentów animowanych hitów: „Ups: Arka odpłynęła”, „Ups2! Bunt na Arce” oraz kosmicznej komedii „Luis i obcy”.', '2023-03-10', '80 min', 'Caroline Origer', ''),
(8, 'Wyrwa', 'wyrwa.jpg', 'Niewierność, zagadkowy wypadek i mężczyzna, który na własną rękę podejmuje śledztwo, by odkryć prawdę o tajemniczej śmierci swojej żony. Intrygujący thriller „Wyrwa” to fabularna produkcja CANAL+ ORIGINAL z Tomaszem Kotem, Karoliną Gruszką i Grzegorzem Damięckim, oparta na głośnej książce Wojciecha Chmielarza, autora „Żmijowiska”. Film trafi do kin w całej Polsce w pierwszej połowie 2023 roku. Reżyserem „Wyrwy” jest nominowany do Oscara twórca seriali „W głębi lasu” i „Skazana” Bartosz Konopka. Za koncept fabularny odpowiada Marcin Ciastoń – autor wyróżnionego nagrodą za najlepszy scenariusz filmu „Hiacynt”. W pozostałych rolach występują: Olga Bołądź („Najmro. Kocha, kradnie, szanuje”), Maria Pakulnis („Planeta Singli 3”), laureatka Złotych Lwów za debiut aktorski Marta Stalmierska („Apokawixa”, „Johnny”) oraz objawienie hitu „Furioza” - Konrad Eleryk. Tajemniczy wypadek samochodowy zmienia całkowicie życie Maćka (Tomasz Kot). W zdarzeniu ginie jego żona Janina (Karolina Gruszka). Najprawdopodobniej kobieta popełniła samobójstwo. Maciej nie ma jednak pojęcia, dlaczego do wypadku doszło pod Mrągowem, skoro Janina powiedziała, że jedzie na delegację do Krakowa. Pomyliła się? A może kłamała? Zrozpaczony mężczyzna wyrusza w podróż, aby rozwiązać zagadkę jej śmierci. Wkrótce trafia na trop niejakiego Wojnara (Grzegorz Damięcki) – aktora, którego podejrzewa o romans ze zmarłą żoną. Od tego momentu pytania zaczynają się mnożyć, a tragedia zmienia się w skomplikowaną zagadkę. Maciej dochodzi do wniosku, że być może w ogóle nie znał kobiety, którą poślubił…', '2023-03-17', '100 min', 'Bartosz Konopka', 'Tomasz Kot, Karolina Gruszka, Grzegorz Damięcki, Olga Bołądź'),
(9, 'Jezioro Słone', 'jezioroslone.jpg', '„Jezioro Słone” opowiada on historię Heleny (Katarzyna Butowtt) – kobiety po sześćdziesiątce, która miała w życiu tylko jednego kochanka, swojego męża (Krzysztof Stelmaszyk). Zapewnia on jej erotyczne spełnienie, finansowe bezpieczeństwo. Mają troje dorosłych dzieci. Kiedy na jaw wychodzi, że mężczyzna ją oszukuje, a na horyzoncie pojawia się kariera w modelingu, Helena po raz pierwszy w życiu przejmuje kontrolę nad swoim życiem. Wszystko, co się dzieje, jest dla niej nowe, nieznane i ekscytujące. Chce go zdradzić? Chce się wyrwać spod jego dominacji? A może pragnie posmakować innego mężczyzny, tak jak inni chcą spróbować narkotyków? Najważniejsze dla niej jest pozostanie wierną samej sobie.', '2023-03-17', '107 min', 'Katarzyna Rosłaniec', 'Katarzyna Butowtt, Krzysztof Stelmaszyk, Dorota Kolak'),
(10, '65', '65.jpg', 'Po katastrofie na nieznanej planecie pilot, Mills (Adam Driver) szybko odkrywa, że tą planetą jest Ziemia... tylko, że 65 milionów lat temu. Mills i jeszcze jedyna ocalała Koa (Ariana Greenblatt) muszą przedrzeć się przez nieznany teren pełen niebezpiecznych prehistorycznych stworzeń w walce o przetrwanie. Scenarzyści filmu „Ciche miejsce” i producent Sam Raimi przedstawiają „65”, thriller sci-fi z Adamem Driverem, Arianą Greenblatt i Chloe Coleman. Adam Driver to znakomity aktor, nominowany dwukrotnie do Oscara za role w „Historii małżeńskiej” oraz „Czarne bractwo\". ', '2023-03-17', '90 min', 'Scott Beck, Bryan Wo', 'Adam Driver, Ariana Greenblatt, Chloe Coleman'),
(11, 'Asteriks i Obeliks: ', 'asteriksiobeliksimperiumsmoka.jpg', 'Asteriks i Obeliks zmagali się już z Juliuszem Cezarem, odwiedzili Kleopatrę, wzięli udział w Igrzyskach Olimpijskich, a nawet pili herbatkę u boku Jej Królewskiej Mości. Teraz, w piątym aktorskim filmie z serii, nieustraszeni bohaterowie wyruszą na Daleki Wschód, aby z pomocą swojego magicznego wywaru uratować chińską Cesarzową. Główne role w opowieści odegrają Guillaume Canet i Gilles Lellouche, a na ich drodze ponownie staną: władca Rzymu oraz królowa Egiptu, w których wcielili się odpowiednio Vincent Cassel oraz Marion Cotillard. W filmie nie zabraknie również sportowego ducha rodem z Olimpiady, który zapewni gościnny udział piłkarskiej legendy – Zlatana Ibrahimovica. Jest rok 50 p.n.e. Cesarzowa Chin, w wyniku zamachu stanu przeprowadzonego przez zdradzieckiego księcia, zostaje uwięziona. Córka porwanej władczyni – księżniczka Sass-Yi, wraz ze swoim wiernym ochroniarzem i fenickim kupcem wyrusza do odległej Galii, aby szukać pomocy dla swojego kraju. Tak oto poznaje Asteriksa i Obeliksa – dwóch dzielnych bohaterów, którzy nie cofną się przed niczym, aby zaprowadzić ład i porządek wszędzie tam, gdzie zapanował chaos i bezprawie… Oraz wszędzie tam, gdzie można przy okazji smacznie podjeść. Galowie z wielką chęcią przystają na prośbę księżniczki i wspólnie z jej przyjaciółmi oraz odpowiednim zapasem magicznego napoju wyruszają w długą i pełną przygód podróż na Daleki Wschód. Jednak oko na to wszystko ma także słynny wróg Asteriksa i Obeliksa – Juliusz Cezar, który jest żądny nowych zdobyczy i zbiera potężną armię, aby podbić orientalną krainę po drugiej stronie globu.', '2023-02-10', '111 min', 'Guillaume Canet', 'Guillaume Canet, Gilles Lellouche, Vincent Cassel, Marion Cotillard, Pierre Richard, Zlatan Ibrahimo'),
(12, 'Masz ci los!', 'maszcilos.jpg', 'Każdy z nas przynajmniej raz w życiu zastanawiał się, co byłoby, gdyby trafił milion wygranej. A co, gdyby szczęście prawie się do ciebie uśmiechnęło, ale na ostatniej prostej pojawiło się więcej chętnych do podziału? W dodatku z niezbyt lubianej rodziny, z którą jak wiadomo „najlepiej na zdjęciu”? „Masz ci los!” to nowa nieobliczalna komedia twórców „Planety Singli” i „Juliusza”, w której w zaskakujących rolach zobaczymy m.in. Izabelę Kunę, Piotra Głowackiego, Sonię Bohosiewicz, Rafała Rutkowskiego, Roberta Wabicha i Mariana Dziędziela, a także utalentowanych aktorów młodego pokolenia: Michała Sikorskiego („Sonata”, „Czarna owca”) i Wiktorię Kruszczyńską („Wszystkie nasze strachy”). Film reżyseruje Mateusz Głowacki, twórca jednego z odcinków produkcji Canal+ „Planeta Singli. Osiem historii”. Producentem filmu jest Canal+ Original, a dystrybutorem Kino Świat. Podczas stypy po pogrzebie kochanego dziadka rodzina orientuje się, że w loterii padły właśnie numery, którymi dziadek grał przez całe życie. Nie ma czasu na rozpacz i łzy, kiedy zwycięski kupon jest w marynarce. Trzy metry pod ziemią. Rodzina i przyjaciele nagle z wielką mocą odczuwają potrzebę zobaczenia dziadka jeszcze raz... Do gry niespodziewanie wkracza także ksiądz okolicznej parafii, który doskonale wie co knują krewni i sam chętnie odświeżyłby kościół (i nie tylko) przy pomocy pieniędzy z wygranej. Zaczyna się wyścig na pomysły, intrygi i podstępy. Najlepiej takie, żeby fortuną podzielić się z możliwie najmniejszą liczbą pozostałych. A najchętniej z nikim. Człowiek jest ludzki… ale nie gdy chodzi o rodzinę i wielkie pieniądze!Do zobaczenia w Cinema City! ', '2023-02-03', '85 min', 'Mateusz Głowacki', 'Izabela Kuna, Piotr Głowacki, Sonia Bohosiewicz'),
(13, 'Syn', 'syn.jpg', 'Film opowie o rodzinie, która walczy o ponowne połączenie się po rozpadzie. Peter (Hugh Jackman) mieszka z nową partnerką, Beth (Vanessa Kirby) i ich małym synkiem. Jego życie jest ustabilizowane i wygodne. Jednak to zmienia się, gdy jego była żona Kate (Laura Dern) pojawia się z pierwszym synem, Nicholasem (McGrath), który jest już nastolatkiem. Okazuje się, że Nicholas od miesięcy nie pojawia się w szkole, jest niespokojny, zdystansowany i zły. Peter stara się zadbać o Nicholasa tak, jak chciałby, aby jego własny ojciec (Anthony Hopkins) dbał o niego. Jednocześnie musi lawirować w pracy, gdzie pojawia się oferta wymarzonego stanowiska w Waszyngtonie. Peter sięgając do przeszłości, aby naprawić swoje błędy, traci z oczu to co najważniejsze.', '2023-03-17', '123 min', 'Florian Zeller', 'Vanessa Kirby, Felix Goddard, Max Goddard');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `showings`
--

CREATE TABLE `showings` (
  `showing_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `showing_type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `showings`
--

INSERT INTO `showings` (`showing_id`, `movie_id`, `price`, `showing_type`) VALUES
(1, 10, '22.00', '2D Napisy'),
(2, 6, '30.00', '3D Dubbing'),
(3, 12, '24.00', '2D'),
(4, 3, '36.00', '2D Dubbing'),
(5, 8, '20.00', '2D'),
(6, 7, '14.00', '3D Dubbing');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `phone_number` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `phone_number`) VALUES
(5, 'oliwier', '5aadb45520dcd8726b2822a7a78bb53d794f557199d5d4abdedd2c55a4bd6ca73607605c558de3db80c8e86c3196484566163ed1327e82e8b6757d1932113cb8', 12),
(6, 'o', 'cded74740d4bbfd4eb126d6de454b59e2d631f36c0ae0d2325b5e2be4da2befe792106b98422ad24c092e8f184b2ff4be0bbbcdcd278db6c2427533b2e9264d1', 0),
(7, 'aa', 'f6c5600ed1dbdcfdf829081f5417dccbbd2b9288e0b427e65c8cf67e274b69009cd142475e15304f599f429f260a661b5df4de26746459a3cef7f32006e5d1c1', 22),
(8, 'aa', 'f6c5600ed1dbdcfdf829081f5417dccbbd2b9288e0b427e65c8cf67e274b69009cd142475e15304f599f429f260a661b5df4de26746459a3cef7f32006e5d1c1', 22),
(9, '11', '74a49c698dbd3c12e36b0b287447d833f74f3937ff132ebff7054baa18623c35a705bb18b82e2ac0384b5127db97016e63609f712bc90e3506cfbea97599f46f', 11);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_reservations`
--

CREATE TABLE `user_reservations` (
  `user_reservation_id` int(11) NOT NULL,
  `showing_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `seat_row` int(11) NOT NULL,
  `seat_column` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `user_reservations`
--

INSERT INTO `user_reservations` (`user_reservation_id`, `showing_id`, `user_id`, `seat_row`, `seat_column`) VALUES
(1, 3, 9, 1, 1),
(2, 1, 9, 2, 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indeksy dla tabeli `showings`
--
ALTER TABLE `showings`
  ADD PRIMARY KEY (`showing_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeksy dla tabeli `user_reservations`
--
ALTER TABLE `user_reservations`
  ADD PRIMARY KEY (`user_reservation_id`),
  ADD KEY `showing_id` (`showing_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT dla tabeli `showings`
--
ALTER TABLE `showings`
  MODIFY `showing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `user_reservations`
--
ALTER TABLE `user_reservations`
  MODIFY `user_reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `showings`
--
ALTER TABLE `showings`
  ADD CONSTRAINT `showings_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`);

--
-- Ograniczenia dla tabeli `user_reservations`
--
ALTER TABLE `user_reservations`
  ADD CONSTRAINT `user_reservations_ibfk_1` FOREIGN KEY (`showing_id`) REFERENCES `showings` (`showing_id`),
  ADD CONSTRAINT `user_reservations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
