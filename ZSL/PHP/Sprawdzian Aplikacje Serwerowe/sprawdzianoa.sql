-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 22 Lut 2023, 13:36
-- Wersja serwera: 10.1.36-MariaDB
-- Wersja PHP: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `sprawdzianoa`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `aukcje`
--

CREATE TABLE `aukcje` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `cena` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `aukcje`
--

INSERT INTO `aukcje` (`id`, `nazwa`, `cena`) VALUES
(4, 'drukarka', 625.29),
(5, 'monitor', 533.19),
(7, 'dysk', 46.5),
(8, 'zasilacz', 78),
(9, 'klawiatura', 1300),
(10, 'mysz', 513.19);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `aukcje`
--
ALTER TABLE `aukcje`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `aukcje`
--
ALTER TABLE `aukcje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
