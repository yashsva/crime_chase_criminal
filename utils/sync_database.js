const db = require("./database");

const adminTable = "CREATE TABLE IF NOT EXISTS `admin` ("
    + "`id` int NOT NULL AUTO_INCREMENT,"
    + "`password` varchar(45) NOT NULL,"
    + "PRIMARY KEY (`id`)"
    + ") ENGINE=InnoDB AUTO_INCREMENT=10002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci";

const police_table="CREATE TABLE IF NOT EXISTS `police` ("
+ "    `name` varchar(30) NOT NULL,"
+ "   `department` varchar(20) NOT NULL,"
+ "   `phone` char(10) NOT NULL,"
+ "   `email` varchar(30) NOT NULL,"
+ "   `dob` date NOT NULL,"
+ "   `password` varchar(45) NOT NULL,"
+ "   `id` int NOT NULL AUTO_INCREMENT,"
+ "   `photo_filename` varchar(45) NOT NULL,"
+ "   `gender` varchar(6) NOT NULL,"
+ "   PRIMARY KEY (`id`),"
+ "   UNIQUE KEY `phone_UNIQUE` (`phone`),"
+ "    UNIQUE KEY `email_UNIQUE` (`email`),"
+ "    UNIQUE KEY `photo_filename_UNIQUE` (`photo_filename`)"
+ " ) ENGINE=InnoDB AUTO_INCREMENT=10007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Police details' ";
      

const all_crime_types_table = "CREATE TABLE IF NOT EXISTS `all_crime_types` ("
    + "`id` int NOT NULL AUTO_INCREMENT,"
    + "`type_name` varchar(45) NOT NULL,"
    + "PRIMARY KEY (`id`),"
    + "UNIQUE KEY `type_name_UNIQUE` (`type_name`)"
    + " ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"

const crime_table = "CREATE TABLE IF NOT EXISTS `crime` ("
    + "  `id` int NOT NULL AUTO_INCREMENT,"
    + "  `date` date NOT NULL,"
    + "  `city` varchar(45) NOT NULL,"
    + "    `description` varchar(300) NOT NULL,"
    + "    PRIMARY KEY (`id`)"
    + "  ) ENGINE=InnoDB AUTO_INCREMENT=10015 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci";

const criminal_table = "CREATE TABLE IF NOT EXISTS `criminal` ("
    + "   `name` varchar(30) NOT NULL,"
    + "   `photo_filename` varchar(45) NOT NULL,"
    + "    `height` int NOT NULL,"
    + "    `weight` int NOT NULL,"
    + "   `dob` date NOT NULL,"
    + "   `id` int NOT NULL AUTO_INCREMENT,"
    + "    `city` varchar(25) NOT NULL,"
    + "   `gender` varchar(15) NOT NULL,"
    + "   PRIMARY KEY (`id`)"
    + " ) ENGINE=InnoDB AUTO_INCREMENT=10006 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='criminal table' ";

const crime_criminal_table="CREATE TABLE IF NOT EXISTS `crime_criminal` ("
+ "   `crime_id` int NOT NULL,"
+ "   `criminal_id` int NOT NULL,"
+ "   UNIQUE KEY `index3` (`crime_id`,`criminal_id`),"
+ "   KEY `crime_id_idx` (`crime_id`),"
+ "   KEY `criminal_id_idx` (`criminal_id`),"
+ "   CONSTRAINT `crime_criminal_ibfk_1` FOREIGN KEY (`crime_id`) REFERENCES `crime` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,"
+ "   CONSTRAINT `crime_criminal_ibfk_2` FOREIGN KEY (`criminal_id`) REFERENCES `criminal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE"
+ " ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci";
  
const crime_to_crime_type_table="CREATE TABLE IF NOT EXISTS `crime_to_crime_types` ("
+ "   `crime_id` int NOT NULL,"
+ "   `crime_type_id` int NOT NULL,"
+ "   KEY `crime_id_idx` (`crime_id`),"
+ "   KEY `crime_type_id_idx` (`crime_type_id`),"
+ "   CONSTRAINT `crime_id` FOREIGN KEY (`crime_id`) REFERENCES `crime` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,"
+ "   CONSTRAINT `crime_type_id` FOREIGN KEY (`crime_type_id`) REFERENCES `all_crime_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE"
+ " ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci";
  

function sync() {
    // console.log(adminTable);
    db.execute(adminTable);

    // console.log(police_table);
    db.execute(police_table);

    // console.log(crime_table);
    db.execute(crime_table);
    
    // console.log(criminal_table);
    db.execute(criminal_table);

    // console.log(all_crime_types_table);
    db.execute(all_crime_types_table);    

    // console.log(crime_to_crime_type_table);
    db.execute(crime_to_crime_type_table);    

    // console.log(crime_criminal_table);
    db.execute(crime_criminal_table);
    
}

module.exports = { sync };