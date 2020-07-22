/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  DirectMe.sql  
|  Description:  This SQL file creates the schema of the database storing 
|                any data that's needed to run the DirectMe system.
*===========================================================================*/

CREATE TABLE `scraping_location` (
  `scraping_location_id`  varchar(255) PRIMARY KEY,
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
  `car_park_id`  varchar(255),
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `last_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `scraping_location_id`  varchar(255),
  `external_provider_id` varchar(255) UNIQUE,
  PRIMARY KEY (`car_park_id`, `latitude`, `longitude`),
  FOREIGN KEY (`scraping_location_id`) REFERENCES scraping_location(`scraping_location_id`),
  FOREIGN KEY (`external_provider_id`) REFERENCES external_provider(`external_provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `user_id` varchar(255) PRIMARY KEY,
  `fName` varchar(255) NOT NULL,
  `lName`varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `darkmode` BOOLEAN NOT NULL,
  `radius` float NOT NULL,
  `profile_picture` varchar(255) NOT NULL,
  `scheme` varchar(255) NOT NULL,
  `last_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `review` (
  `review_id` varchar(255) PRIMARY KEY,
  `description` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `car_park_id`  varchar(255),
  `user_id` varchar(255),
  FOREIGN KEY (`car_park_id`) REFERENCES car_park(`car_park_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `admin` (
  `user_id` varchar(255) PRIMARY KEY,
  `permission_level` int(11) NOT NULL,
  `api_usage` int(11) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `history` (
  `user_id` varchar(255),
  `car_park_id`  varchar(255),
  PRIMARY KEY (`user_id`, `car_park_id`), 
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`),
  FOREIGN KEY (`car_park_id`) REFERENCES car_park(`car_park_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT IGNORE INTO `scraping_location` (`scraping_location_id`, `name`, `latitude`, `longitude`, `radius`) VALUES 
('58858a10-8a43-11ea-87e4-2d5a157f4c19', 'Bristol - City Centre', 51.4545, -2.5879, 2500),
('58858a10-8a43-11ea-87e4-2d5a157f4c11', 'Bristol - Avonmouth', 51.499, -2.68676, 2500),
('58858a10-8a43-11ea-87e4-2d5a157f4c12', 'Bristol - Cribbs Causeway', 51.5252, -2.59372, 2500);

INSERT IGNORE INTO `user` (`user_id`, `fName`, `lName`, `email_address`, `password`, `phone_number`, `darkmode`, `radius`, `profile_picture`, `scheme`) VALUES
("a92c0620-ac2a-11ea-bc8d-67c1927ee7f3", "System", "N/A", "N/A", "worker@directme.com", "1234567890", 0, 0, "avatar2.png", "None");

INSERT IGNORE INTO `admin` (`user_id`, `permission_level`, `api_usage`) VALUES
("a92c0620-ac2a-11ea-bc8d-67c1927ee7f3", "3", "-1");
