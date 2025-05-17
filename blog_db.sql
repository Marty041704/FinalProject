-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2025 at 02:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_tbl`
--

CREATE TABLE `blog_tbl` (
  `ID` int(11) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Content` varchar(255) NOT NULL,
  `Author` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_tbl`
--

INSERT INTO `blog_tbl` (`ID`, `Title`, `Content`, `Author`) VALUES
(1, 'The Magic of Morning Sunlight', 'It’s not just beautiful; it’s actually good for you. Morning sun helps regulate your body clock, improves your mood, and gives you a healthy dose of Vitamin D. Even five to ten minutes can make a big difference in how you feel the rest of the day.', 'Lena Rivera'),
(2, 'Why Plants Make Us Happier at Home', 'Have you ever noticed how a small plant on your desk or window can brighten your day? It’s not just in your head—studies show that houseplants can reduce stress, boost creativity, and even clean the air.', 'Jordan Malik'),
(3, 'The Joy of a Screen-Free Hour', 'In today’s world, we’re constantly looking at screens—phones, TVs, laptops. But what happens when we step away for just one hour?', 'Maya Ellis');

-- --------------------------------------------------------

--
-- Table structure for table `login_tbl`
--

CREATE TABLE `login_tbl` (
  `ID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_tbl`
--

INSERT INTO `login_tbl` (`ID`, `username`, `password`) VALUES
(1, 'Marty', '$2b$10$q80Vh3G5Ybv/lLAb1QrfOe2lfAPVjU1OAuAA9nhTGux'),
(2, 'marty', '$2b$10$Mpwc1BUH83Uh5sNc5/mGW.dAnWCyPmPOt0U8HIJyTft'),
(3, 'naga', '$2b$10$wVdW1VIh8rlyWbEaDWRc/epi7KbLLsNLNGlpYft6FNv53SdTokGD6'),
(4, 'Matt', '$2b$10$zmiRIMzNCttw/7vWSrcEmO1AOo8.jdxXdTbBG2A8ZVJtppPAUZTtK'),
(5, 'Azi', '$2b$10$eB/fb..DXToSNxaVsPKrlurY06zuKbC2O9bRy2j9kYiU/70rE7Jpi'),
(6, 'naga', '$2b$10$xYCmjZEQSg/37hpNVqPhHuLIJTbl3DoJWfzveuRdiZPCaiIbSL7bq'),
(7, 'MartyMen', '$2b$10$eOZkd8a.7NPScAzOTqHkxO4drfUWnjAFrsgoMiyNDd7vI8KeNc9OS'),
(8, 'Matchieee', '$2b$10$2ahCpuessAPXJ/HYAw.zbeKpel76qVvaxxLU5yvy8qLvlSi38DEo.'),
(10, 'emerot', '$2b$10$/OX9FlUK7mk7GZr4hxWIB.HUmfYUD22F1HthIbhsGspuO3Ibe.PkO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_tbl`
--
ALTER TABLE `blog_tbl`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `login_tbl`
--
ALTER TABLE `login_tbl`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_tbl`
--
ALTER TABLE `blog_tbl`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `login_tbl`
--
ALTER TABLE `login_tbl`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
