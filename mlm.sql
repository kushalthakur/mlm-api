-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2022 at 10:14 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mlm`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `parentId` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `sponsorId` varchar(128) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `userId`, `parentId`, `level`, `sponsorId`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 0, 0, 'KKT99142', 1, '2021-11-10 16:20:54', '2021-11-10 16:20:54'),
(2, 2, 1, 1, '82130414', 2, '2021-11-10 16:23:27', '2021-11-10 16:33:14'),
(3, 3, 1, 1, '29444104', 2, '2021-11-10 16:24:02', '2021-11-10 16:33:11'),
(4, 4, 1, 1, '94412025', 2, '2021-11-10 16:24:40', '2021-11-10 16:33:08'),
(5, 5, 1, 1, '55133190', 2, '2021-11-10 16:24:59', '2021-11-10 16:33:05'),
(6, 6, 1, 1, '95859769', 2, '2021-11-10 16:25:16', '2021-11-10 16:33:01'),
(7, 7, 1, 1, '24222996', 2, '2021-11-10 16:25:34', '2021-11-10 16:32:58'),
(8, 8, 1, 1, '24092089', 2, '2021-11-10 16:25:43', '2021-11-10 16:32:54'),
(9, 9, 1, 1, '93850563', 2, '2021-11-10 16:25:58', '2021-11-10 16:33:48'),
(10, 10, 2, 2, '54231951', 2, '2021-11-10 16:28:12', '2021-11-10 16:33:44'),
(11, 11, 2, 2, '44402280', 2, '2021-11-10 16:28:27', '2021-11-10 16:33:40'),
(12, 12, 3, 2, '52596283', 2, '2021-11-10 16:29:13', '2021-11-10 16:33:37'),
(13, 13, 4, 2, '40985267', 1, '2021-11-10 16:29:45', '2021-11-10 16:29:45'),
(14, 14, 4, 2, '13274174', 1, '2021-11-10 16:30:01', '2021-11-10 16:30:01'),
(15, 15, 5, 2, '45604771', 2, '2021-11-10 16:30:36', '2021-11-10 16:33:28'),
(16, 16, 5, 2, '78716496', 2, '2021-11-10 16:30:51', '2021-11-10 16:33:31'),
(17, 17, 6, 2, '86219555', 2, '2021-11-10 16:31:40', '2021-11-10 16:33:24'),
(18, 18, 9, 2, '94787565', 2, '2021-11-10 16:32:17', '2021-11-10 16:33:20'),
(19, 19, 17, 3, '42194098', 1, '2021-11-10 16:37:06', '2021-11-10 16:37:06'),
(20, 20, 17, 3, '66341034', 2, '2021-11-10 16:37:16', '2021-11-10 16:37:29'),
(21, 21, 19, 4, '34701886', 1, '2021-11-10 16:38:29', '2021-11-10 16:38:29'),
(22, 22, 19, 4, '89509505', 1, '2021-11-10 16:38:44', '2021-11-10 16:38:44'),
(23, 23, 16, 3, '30656320', 2, '2021-11-10 16:39:56', '2021-11-10 16:41:48'),
(24, 24, 23, 4, '10561964', 1, '2021-11-10 16:40:43', '2021-11-10 16:40:43'),
(25, 25, 24, 5, '83737025', 1, '2021-11-10 16:41:33', '2021-11-10 16:41:33'),
(26, 26, 13, 3, '38057404', 1, '2021-11-10 16:42:42', '2021-11-10 16:42:42'),
(27, 27, 13, 3, '79703116', 1, '2021-11-10 16:43:01', '2021-11-10 16:43:01'),
(28, 28, 13, 3, '49799732', 1, '2021-11-10 16:43:11', '2021-11-10 16:43:11'),
(29, 29, 12, 3, '97870597', 1, '2021-11-10 16:44:27', '2021-11-10 16:44:27'),
(30, 30, 12, 3, '79819116', 1, '2021-11-10 16:44:37', '2021-11-10 16:44:37'),
(31, 31, 12, 3, '21915865', 1, '2021-11-10 16:44:49', '2021-11-10 16:44:49'),
(32, 32, 11, 3, '54939635', 1, '2021-11-10 16:45:36', '2021-11-10 16:45:36'),
(33, 33, 11, 3, '43473904', 1, '2021-11-10 16:45:46', '2021-11-10 16:45:46'),
(34, 34, 10, 3, '44212748', 1, '2021-11-10 16:47:02', '2021-11-10 16:47:02'),
(35, 35, 10, 3, '25018300', 2, '2021-11-10 16:47:13', '2021-11-10 16:47:46'),
(36, 36, 10, 3, '40100802', 2, '2021-11-10 16:47:22', '2021-11-10 16:47:49'),
(37, 37, 15, 3, '61281421', 1, '2021-11-10 16:49:19', '2021-11-10 16:49:19'),
(38, 38, 15, 3, '91301168', 2, '2021-11-10 16:49:36', '2021-11-10 16:59:25'),
(39, 39, 15, 3, '27430713', 1, '2021-11-10 16:49:48', '2021-11-10 16:49:48'),
(40, 40, 35, 4, '72021967', 1, '2021-11-10 16:51:38', '2021-11-10 16:51:38'),
(41, 41, 32, 4, '17562033', 1, '2021-11-10 16:54:14', '2021-11-10 16:54:14'),
(42, 42, 32, 4, '83527186', 1, '2021-11-10 16:54:24', '2021-11-10 16:54:24'),
(43, 43, 32, 4, '31477820', 1, '2021-11-10 16:54:33', '2021-11-10 16:54:33'),
(44, 44, 34, 4, '57439527', 2, '2021-11-10 16:55:40', '2021-11-10 16:56:17'),
(45, 45, 34, 4, '18547466', 1, '2021-11-10 16:55:50', '2021-11-10 16:55:50'),
(46, 46, 34, 4, '44257280', 1, '2021-11-10 16:55:59', '2021-11-10 16:55:59'),
(47, 47, 36, 4, '19976223', 1, '2021-11-10 16:56:47', '2021-11-10 16:56:47'),
(48, 48, 36, 4, '52787145', 1, '2021-11-10 16:56:54', '2021-11-10 16:56:54'),
(49, 49, 38, 4, '32731465', 1, '2021-11-10 16:58:48', '2021-11-10 16:58:48'),
(50, 50, 38, 4, '79003002', 1, '2021-11-10 16:58:58', '2021-11-10 16:58:58'),
(51, 51, 38, 4, '25885744', 1, '2021-11-10 16:59:07', '2021-11-10 16:59:07'),
(52, 52, 39, 4, '67600023', 1, '2021-11-10 17:00:24', '2021-11-10 17:00:24'),
(53, 53, 39, 4, '50129097', 1, '2021-11-10 17:00:34', '2021-11-10 17:00:34'),
(54, 54, 37, 4, '15840475', 1, '2021-11-10 17:01:13', '2021-11-10 17:01:13'),
(55, 55, 37, 4, '38120120', 1, '2021-11-10 17:02:01', '2021-11-10 17:02:01'),
(56, 56, 33, 4, '55350617', 1, '2021-11-10 17:04:34', '2021-11-10 17:04:34'),
(57, 57, 29, 4, '82022150', 1, '2021-11-10 17:06:36', '2021-11-10 17:06:36'),
(58, 58, 30, 4, '93064522', 1, '2021-11-10 17:08:52', '2021-11-10 17:08:52'),
(59, 59, 31, 4, '29722809', 1, '2021-11-10 17:09:23', '2021-11-10 17:09:23'),
(60, 60, 26, 4, '82212513', 1, '2021-11-10 17:09:52', '2021-11-10 17:09:52'),
(61, 61, 27, 4, '66616725', 1, '2021-11-10 17:10:28', '2021-11-10 17:10:28'),
(62, 62, 54, 5, '74133847', 1, '2021-11-10 17:11:15', '2021-11-10 17:11:15'),
(63, 63, 55, 5, '96349801', 1, '2021-11-10 17:11:46', '2021-11-10 17:11:46'),
(64, 64, 55, 5, '11156882', 1, '2021-11-10 17:12:01', '2021-11-10 17:12:01'),
(65, 65, 45, 5, '80535818', 1, '2021-11-12 06:23:20', '2021-11-12 06:23:20'),
(66, 66, 41, 5, '23859956', 1, '2021-11-12 06:24:56', '2021-11-12 06:24:56'),
(67, 67, 42, 5, '76340001', 1, '2021-11-12 06:25:01', '2021-11-12 06:25:01'),
(68, 68, 49, 5, '17739874', 1, '2021-11-12 06:32:07', '2021-11-12 06:32:07'),
(69, 69, 51, 5, '97369260', 1, '2021-11-12 06:33:09', '2021-11-12 06:33:09'),
(70, 70, 15, 3, '53289381', 2, '2021-12-16 12:03:48', '2021-12-16 12:04:06'),
(71, 71, 32, 4, '17004768', 1, '2022-01-06 09:06:00', '2022-01-06 09:06:00'),
(72, 72, 71, 5, '23769439', 1, '2022-01-06 09:07:07', '2022-01-06 09:07:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstName` varchar(128) NOT NULL,
  `lastName` varchar(128) DEFAULT NULL,
  `username` varchar(128) NOT NULL,
  `email` varchar(128) DEFAULT NULL,
  `phone` varchar(56) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `dateOfBirth` datetime DEFAULT NULL,
  `role` varchar(56) NOT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `email`, `phone`, `password`, `address`, `age`, `dateOfBirth`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Gasaoon', 'Khatetu', 'Gasaoon', 'kushalkumarthakur52@gmail.com', '9914287637', '$2a$10$pChRV1CgHQ.gIEnKCUy5L.HBauGKYicnHZ6guYW5p9scxezUjjIC2', 'Village-Lulani, PO Dharer, Tehsil Baijnath, District-Kangra (HP)', 28, '1992-08-20 00:00:00', 'ADMIN', 1, '2021-11-10 16:20:54', '2021-11-10 16:20:54'),
(2, 'Jangi Ram', NULL, 'jangi', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:23:27', '2021-11-10 16:33:14'),
(3, 'Chaimper', NULL, 'chaimper', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:24:02', '2021-11-10 16:33:11'),
(4, 'Batlu Ram', NULL, 'batlu', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:24:40', '2021-11-10 16:33:08'),
(5, 'Khadka', NULL, 'khadka', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:24:59', '2021-11-10 16:33:05'),
(6, 'Ghinnu', NULL, 'ghinnu', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:25:16', '2021-11-10 16:33:01'),
(7, 'Khollu', NULL, 'khollu', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:25:34', '2021-11-10 16:32:58'),
(8, 'Birbal', NULL, 'birbal', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:25:43', '2021-11-10 16:32:54'),
(9, 'Moni', NULL, 'moni', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:25:58', '2021-11-10 16:33:48'),
(10, 'Rumi Ram', NULL, 'rumi', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:28:12', '2021-11-10 16:33:44'),
(11, 'Puran', NULL, 'Puran', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:28:27', '2021-11-10 16:33:40'),
(12, 'Praima', NULL, 'prem', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:29:13', '2021-11-10 16:33:37'),
(13, 'Roshan Lal', NULL, 'Roshan', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:29:45', '2021-11-10 16:29:45'),
(14, 'Sarda', NULL, 'sarda', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:30:01', '2021-11-10 16:30:01'),
(15, 'Duana', NULL, 'duana', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:30:36', '2021-11-10 16:33:28'),
(16, 'Sirpat', NULL, 'sirpat', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:30:51', '2021-11-10 16:33:31'),
(17, 'Munshi', NULL, 'munshi', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:31:40', '2021-11-10 16:33:24'),
(18, 'Goda', NULL, 'Goda', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:32:17', '2021-11-10 16:33:20'),
(19, 'Pinka', NULL, 'pinka', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:37:06', '2021-11-10 16:37:06'),
(20, 'Kala', NULL, 'kala', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:37:16', '2021-11-10 16:37:29'),
(21, 'Munish', 'Thakur', 'munish', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:38:29', '2022-01-06 09:01:57'),
(22, 'Satish', 'Thakur', 'satish', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:38:44', '2022-01-06 09:02:33'),
(23, 'Mahant', NULL, 'mahant', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:39:56', '2021-11-10 16:41:48'),
(24, 'Heera', NULL, 'heera', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:40:43', '2021-11-10 16:40:43'),
(25, 'Akshit', NULL, 'akshit', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:41:33', '2021-11-10 16:41:33'),
(26, 'Ravi', NULL, 'Ravinder', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:42:42', '2021-11-10 16:42:42'),
(27, 'Sanjeev', NULL, 'sanjeev', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:43:01', '2021-11-10 16:43:01'),
(28, 'Rajeev', NULL, 'rajeev', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:43:11', '2021-11-10 16:43:11'),
(29, 'Prithhi', NULL, 'prithhi', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:44:27', '2021-11-10 16:44:27'),
(30, 'Jufa', NULL, 'jufa', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:44:37', '2021-11-10 16:44:37'),
(31, 'Narender', NULL, 'narender', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:44:49', '2021-11-10 16:44:49'),
(32, 'Achharu', NULL, 'achharu', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:45:36', '2021-11-10 16:45:36'),
(33, 'Lal Singh', NULL, 'lal', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:45:46', '2021-11-10 16:45:46'),
(34, 'Raju', NULL, 'rajkumar', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:47:02', '2021-11-10 16:47:02'),
(35, 'Jago', NULL, 'jagdish', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:47:13', '2021-11-10 16:47:46'),
(36, 'Vihari', NULL, 'vihari', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:47:22', '2021-11-10 16:47:49'),
(37, 'Jai Bahadur', NULL, 'jaibahadur', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:49:19', '2021-11-10 16:49:19'),
(38, 'Nihaal', NULL, 'Nihalu', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:49:36', '2021-11-10 16:59:25'),
(39, 'Tulsa', NULL, 'tulsa', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:49:48', '2021-11-10 16:49:48'),
(40, 'Kushal', 'Thakur', 'kushal', 'tkushalkumar@yahoo.in', '9816227980', NULL, '#866', 29, '1992-08-19 18:30:00', 'MEMBER', 1, '2021-11-10 16:51:38', '2021-11-10 16:51:38'),
(41, 'Jeetu', NULL, 'jeetu', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:54:14', '2021-11-10 16:54:14'),
(42, 'Jagta', NULL, 'Jagta', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:54:24', '2021-11-10 16:54:24'),
(43, 'Lovely', NULL, 'labbu', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:54:33', '2021-11-10 16:54:33'),
(44, 'Ashok', NULL, 'ashok', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-11-10 16:55:40', '2021-11-10 16:56:17'),
(45, 'Kishori', NULL, 'kishor', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:55:50', '2021-11-10 16:55:50'),
(46, 'Subhash', NULL, 'subhash', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:55:59', '2021-11-10 16:55:59'),
(47, 'Mangal', NULL, 'mangal', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:56:47', '2021-11-10 16:56:47'),
(48, 'Shiv', NULL, 'shiv', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:56:54', '2021-11-10 16:56:54'),
(49, 'Kuldeep', NULL, 'kuldeep', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:58:48', '2021-11-10 16:58:48'),
(50, 'Ramu', NULL, 'ramu', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:58:58', '2021-11-10 16:58:58'),
(51, 'Rajesh', NULL, 'rajesh', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 16:59:07', '2021-11-10 16:59:07'),
(52, 'Vikram', NULL, 'Babloo', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:00:24', '2021-11-10 17:00:24'),
(53, 'Harish', NULL, 'harish', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:00:34', '2021-11-10 17:00:34'),
(54, 'Purshotam', NULL, 'purshotam', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:01:13', '2021-11-10 17:01:13'),
(55, 'Parmesh', NULL, 'parmesh', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:02:01', '2021-11-10 17:03:14'),
(56, 'Bobby', NULL, 'abhishek', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:04:34', '2022-01-06 09:07:52'),
(57, 'Vikas', 'Thakur', 'vikas', NULL, '9625555173', NULL, NULL, 29, '1992-06-14 18:30:00', 'MEMBER', 1, '2021-11-10 17:06:36', '2021-11-10 17:06:36'),
(58, 'Vinay', 'Thakur', 'vinay', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:08:52', '2021-11-10 17:08:52'),
(59, 'Vishal', 'Thakur', 'kaka', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:09:23', '2021-11-10 17:09:23'),
(60, 'Ritik', 'Thakur', 'ritik', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:09:52', '2021-11-10 17:09:52'),
(61, 'Aditya', 'Thakur', 'aadi', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:10:28', '2021-11-10 17:10:28'),
(62, 'Abhi', NULL, 'abhi', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:11:15', '2021-11-10 17:11:15'),
(63, 'Prince', 'Thakur', 'prince', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-10 17:11:46', '2021-12-16 12:06:29'),
(64, 'Rudransh', 'Thakur', 'rudrr', NULL, NULL, NULL, NULL, 10, '2011-07-02 18:30:00', 'MEMBER', 1, '2021-11-10 17:12:01', '2021-12-16 12:06:42'),
(65, 'Yogesh', 'Thakur', 'yogesh', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-12 06:23:20', '2021-12-16 12:05:29'),
(66, 'Unknown', NULL, 'unknown1', '', NULL, NULL, NULL, 0, '2021-11-28 18:30:00', 'MEMBER', 1, '2021-11-12 06:24:56', '2021-12-02 12:01:41'),
(67, 'Daksh', 'Thakur', 'daksh', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-12 06:25:01', '2021-12-16 12:05:16'),
(68, 'Kartik', 'Thakur', 'kartik', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-12 06:32:07', '2021-12-16 12:05:59'),
(69, 'Naksh', 'Thakur', 'naksh', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2021-11-12 06:33:09', '2022-01-06 09:03:14'),
(70, 'Sher Singh', NULL, 'shersingh', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 2, '2021-12-16 12:03:48', '2021-12-16 12:04:06'),
(71, 'Chaman', 'Thakur', 'chaman', NULL, NULL, NULL, 'Chamba', 0, NULL, 'MEMBER', 1, '2022-01-06 09:06:00', '2022-01-06 09:06:00'),
(72, 'Unknown', NULL, 'Unknown2', NULL, NULL, NULL, NULL, 0, NULL, 'MEMBER', 1, '2022-01-06 09:07:07', '2022-01-06 09:07:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
