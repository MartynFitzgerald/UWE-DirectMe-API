-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2020 at 04:27 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `scraping_location` (
  `scraping_location_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `radius` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `external_provider` (
  `external_provider_id` varchar(255),
  `name` varchar(255),
  `place_id` varchar(255) NOT NULL,
  `reference` varchar(255) NOT NULL,
  `rating` float NOT NULL,
  `user_ratings_total` int(11) NOT NULL,
  PRIMARY KEY (`external_provider_id`, `name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `car_park` (
  `car_park_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `last_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `scraping_location_id` int(11),
  `external_provider_id` varchar(255),
  FOREIGN KEY (`scraping_location_id`) REFERENCES scraping_location(`scraping_location_id`),
  FOREIGN KEY (`external_provider_id`) REFERENCES external_provider(`external_provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `user_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `fName` varchar(255) NOT NULL,
  `lName`varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `darkmode` BOOLEAN NOT NULL,
  `radius` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `review` (
  `review_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `car_park_id` int(11),
  `user_id` int(11),
  FOREIGN KEY (`car_park_id`) REFERENCES car_park(`car_park_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `admin` (
  `user_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `admin_level` int(11) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `history` (
  `user_id` int(11),
  `car_park_id` int(11),
  PRIMARY KEY (`user_id`, `car_park_id`), 
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`),
  FOREIGN KEY (`car_park_id`) REFERENCES car_park(`car_park_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT IGNORE INTO `scraping_location` (`scraping_location_id`, `name`, `latitude`, `longitude`, `radius`) VALUES 
(1, 'Bristol - City Centre', 51.4545, -2.5879, 2500),
(2, 'Bristol - Avonmouth', 51.499, -2.68676, 2500),
(3, 'Bristol - Cribbs Causeway', 51.5252, -2.59372, 2500);
