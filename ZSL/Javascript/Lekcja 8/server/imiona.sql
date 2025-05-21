SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `imiona` (
  `id` int(11) NOT NULL,
  `imie` varchar(50) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `imiona` (`id`, `imie`, `time`) VALUES
(1, 'Maciej', '2023-01-15 08:58:15');


ALTER TABLE `imiona`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `imiona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;