CREATE DATABASE  IF NOT EXISTS `beeline2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `beeline2`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: beeline2
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customerId` int unsigned NOT NULL AUTO_INCREMENT,
  `customerName` varchar(45) NOT NULL,
  `customerEmail` varchar(255) NOT NULL,
  `customerPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`customerId`),
  UNIQUE KEY `customeremail_UNIQUE` (`customerEmail`),
  UNIQUE KEY `customerid_UNIQUE` (`customerId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Zachary','zachary543@example.com','J%1G^Zn*'),(2,'Jack','jack166@example.com','gd8^BDknnG+U'),(3,'Tiffany','tiffany424@example.com','1fK2Ius7@'),(4,'Erica','erica646@example.com',')C!CUOpp&b3'),(5,'Teresa','teresa881@example.com','Xf$42AVur'),(6,'Joseph','joseph524@example.com','uo0Nz)f_y+z'),(7,'John','john252@example.com','$0TMRsSajx'),(8,'Autumn','autumn697@example.com','#0lrXdVP4X'),(9,'Juan','juan641@example.com','+680F5a#7&'),(10,'Catherine','catherine329@example.com','*DG3L_)aFB');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerorder`
--

DROP TABLE IF EXISTS `customerorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerorder` (
  `orderId` int unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int unsigned NOT NULL,
  `orderStatus` varchar(45) NOT NULL,
  `orderType` varchar(45) DEFAULT NULL,
  `orderTotal` decimal(15,2) DEFAULT NULL,
  `orderDateTime` datetime DEFAULT NULL,
  `paymentType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`orderId`),
  UNIQUE KEY `orderId_UNIQUE` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerorder`
--

LOCK TABLES `customerorder` WRITE;
/*!40000 ALTER TABLE `customerorder` DISABLE KEYS */;
INSERT INTO `customerorder` VALUES (1,1,'Pending','Takeaway',0.00,'2023-10-21 19:00:01','Cashless'),(2,1,'Completed','Takeaway',23.20,'2023-10-21 12:13:29','Credit/Debit Card'),(3,1,'Pending','Dine-in',21.00,'2023-10-21 13:03:25','Cash'),(4,1,'Completed','Takeaway',9.00,'2023-10-21 13:36:27','Credit/Debit Card'),(5,1,'Pending','Delivery',9.00,'2023-10-21 13:38:22','Credit/Debit Card'),(6,1,'Completed','Dine-in',74.50,'2023-10-21 13:39:52','Cash'),(7,1,'Pending','Takeaway',35.50,'2023-10-21 14:48:10','3rd Party'),(8,1,'Unsubmitted',NULL,NULL,NULL,NULL),(9,2,'Pending','Dine-in',9.50,'2023-10-21 16:00:58','Credit/Debit Card'),(10,3,'Pending','Takeaway',114.40,'2023-10-21 16:02:36','Credit/Debit Card'),(11,4,'Pending','Takeaway',33.00,'2023-10-22 02:02:59','Cash'),(12,5,'Pending','Delivery',16.20,'2023-10-29 19:28:51','Cash'),(13,6,'Unsubmitted',NULL,NULL,NULL,NULL),(14,2,'Pending','Takeaway',5.00,'2023-10-21 16:01:50','3rd Party'),(15,2,'Unsubmitted',NULL,NULL,NULL,NULL),(16,3,'Unsubmitted',NULL,NULL,NULL,NULL),(17,4,'Pending','Delivery',26.30,'2023-10-22 02:03:52','Credit/Debit Card'),(18,4,'Pending','Dine-in',10.00,'2023-10-22 02:16:09','3rd Party'),(19,4,'Pending','Takeaway',83.00,'2023-10-23 15:56:51','3rd Party'),(20,4,'Pending','Delivery',10.50,'2023-10-23 20:13:13','Credit/Debit Card'),(21,4,'Pending','Delivery',30.87,'2023-10-23 21:12:15','Cash'),(22,4,'Pending','Takeaway',35.90,'2023-10-24 00:40:35','Credit/Debit Card'),(23,4,'Pending','Delivery',4.60,'2023-10-25 13:06:32','3rd Party'),(24,4,'Pending','Delivery',6.65,'2023-10-25 14:23:03','3rd Party'),(25,4,'Pending','Delivery',23.30,'2023-10-25 14:34:37','Credit/Debit Card'),(26,4,'Pending','Delivery',16.20,'2023-10-25 14:55:13','Cash'),(27,4,'Pending','Dine-in',4.15,'2023-10-25 15:04:39','Credit/Debit Card'),(28,4,'Pending','Takeaway',0.00,'2023-10-25 16:21:10','Credit/Debit Card'),(29,4,'Pending','Takeaway',3.60,'2023-10-25 16:20:55','Credit/Debit Card'),(30,4,'Unsubmitted',NULL,NULL,NULL,NULL),(31,4,'Unsubmitted',NULL,NULL,NULL,NULL),(32,5,'Unsubmitted',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `customerorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish`
--

DROP TABLE IF EXISTS `dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish` (
  `dishId` int NOT NULL AUTO_INCREMENT,
  `dishName` varchar(45) NOT NULL,
  `dishDescription` varchar(255) DEFAULT NULL,
  `dishPrice` decimal(15,2) unsigned NOT NULL,
  `dishAvailable` tinyint NOT NULL,
  `dishImgPath` varchar(255) DEFAULT NULL,
  `storeId` int NOT NULL,
  PRIMARY KEY (`dishId`),
  UNIQUE KEY `dishid_UNIQUE` (`dishId`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish`
--

LOCK TABLES `dish` WRITE;
/*!40000 ALTER TABLE `dish` DISABLE KEYS */;
INSERT INTO `dish` VALUES (1,'Chicken Rice','Tender chicken served with flavorful rice',3.50,1,'food1.jpg',1),(2,'Hainanese Chicken','Poached chicken with soy sauce and sesame oil',18.00,1,'food2.jpg',1),(3,'Carrot Cake','Stir-fried radish cake cubes, eggs and preserved radish',4.00,1,'food3.jpg',2),(4,'Char Kway Teow','Stir-fried flat rice noodles with shrimp, bloody cockles, and egg',5.00,1,'food4.jpg',2),(5,'Fried Oysters','Stir-fried oysters in batter with eggs',6.00,1,'food5.jpg',2),(6,'Hokkien Mee','Stir-fried prawn noodles',5.00,1,'food6.jpg',2),(7,'Laksa','Noodles in spicy tangy coconut broth',4.00,1,'food7.jpg',3),(8,'Fish Balls Noodles','Spongy fish balls served with noodles',4.00,1,'food8.jpg',3),(9,'Otah','Grilled fish cake wrapped in banana leaves',1.00,1,'food9.jpg',7),(10,'Satay','Grilled skewers with peanut sauce',1.00,1,'food10.jpg',7),(11,'Ice Kachang','Red bean shaved ice',2.50,1,'food11.jpg',4),(12,'Chendol','Shaved ice with coconut milk',3.00,1,'food12.jpg',4),(13,'Plain Prata','Flaky Indian flatbread, served with delicious curry',1.00,1,'food13.jpg',5),(14,'Egg Prata','Prata with a beaten egg filling, served with delicious curry',1.50,1,'food14.jpg',5),(15,'Tissue Prata','Super thin, crisp prata in the shape of a giant cone',4.00,1,'food15.jpg',5),(16,'Wanton Mee','Noodles with pork dumplings',4.00,1,'food16.jpg',6),(17,'Fried Wanton','Deep-fried dumplings',5.00,1,'food17.jpg',6),(18,'Char Siew','Roasted pork',6.00,0,'food18.jpg',6),(19,'Nasi Lemak','Fragrant rice dish cooked in coconut milk and pandan leaf',2.50,0,'food19.jpg',7),(20,'Fried Chicken Wings','Aromatic crispy deep-fried wings',2.00,0,'food20.jpg',7),(21,'Bak Kut Teh','Pork rib soup with spices',5.00,1,'food21.jpg',8),(22,'You Tiao','Fried dough fritters',1.50,1,'food22.jpg',8),(23,'Braised Peanuts','Soft peanuts in soy sauce',2.30,1,'food23.jpg',8),(24,'Fish & Chips','Deep-fried fish fillet served with fries',7.00,1,'food24.jpg',9),(25,'Grilled Chicken Chop','Grilled chicken served with mashed potatoes and veggies',6.50,0,'food25.jpg',9),(26,'Pasta Aglio e Olio','Spaghetti with garlic, chili, and olive oil',5.80,1,'food26.jpg',9),(27,'Beef Steak','Juicy flame-grilled beef steak, served with sides',7.90,0,'food27.jpg',9),(28,'Chicken Caesar Salad','Salad with chicken, romaine lettuce, and Caesar dressing',5.60,0,'food28.jpg',9);
/*!40000 ALTER TABLE `dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dishingredient`
--

DROP TABLE IF EXISTS `dishingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dishingredient` (
  `dishIngredientId` int NOT NULL AUTO_INCREMENT,
  `dishId` int NOT NULL,
  `ingredientId` int NOT NULL,
  `dishIngredientQty` int NOT NULL,
  `dishIngredientUnit` varchar(45) NOT NULL,
  PRIMARY KEY (`dishIngredientId`),
  UNIQUE KEY `dishingredientid_UNIQUE` (`dishIngredientId`),
  KEY `FK_dishingredient_dish` (`dishId`),
  KEY `FK_dishingredient_ingredient` (`ingredientId`),
  CONSTRAINT `FK_dishingredient_dish` FOREIGN KEY (`dishId`) REFERENCES `dish` (`dishId`),
  CONSTRAINT `FK_dishingredient_ingredient` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient` (`ingredientId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dishingredient`
--

LOCK TABLES `dishingredient` WRITE;
/*!40000 ALTER TABLE `dishingredient` DISABLE KEYS */;
INSERT INTO `dishingredient` VALUES (11,1,1,2,'cups'),(12,1,2,200,'grams'),(13,1,3,3,'tablespoons'),(14,2,5,2,'fillets'),(15,2,2,3,'cups');
/*!40000 ALTER TABLE `dishingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient` (
  `ingredientId` int NOT NULL AUTO_INCREMENT,
  `ingredientName` varchar(45) NOT NULL,
  `ingredientQty` int unsigned DEFAULT NULL,
  `ingredientMin` int unsigned DEFAULT NULL,
  `ingredientMax` int unsigned DEFAULT NULL,
  `expiryDate` date DEFAULT NULL,
  `ingredientUnit` varchar(45) NOT NULL,
  PRIMARY KEY (`ingredientId`),
  UNIQUE KEY `ingredientid_UNIQUE` (`ingredientId`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (1,'Chicken',500,100,1000,'2024-06-30','grams'),(2,'Ginger',300,50,500,'2024-07-15','grams'),(3,'Garlic',1500,200,2000,'2024-08-10','milliliters'),(4,'Chicken stock',1000,100,2000,'2024-05-20','milliliters'),(5,'Rice',20,5,30,'2024-07-10','grams'),(6,'Salt',1000,200,1500,'2024-09-30','grams'),(7,'Sesame oil',40,10,50,'2024-07-01','sheets'),(8,'Soy sauce',500,100,1000,'2024-06-15','grams'),(9,'Red chilies',500,100,1000,'2024-06-30','grams'),(10,'Lime juice',300,50,500,'2024-07-15','grams'),(11,'Sugar',100,10,300,'2025-12-31','grams'),(12,'Flat rice noodles',500,100,1000,'2024-11-30','grams'),(13,'Prawns',300,100,600,'2024-08-15','grams'),(14,'Bloody cockles',200,50,400,'2024-08-10','grams'),(15,'Eggs',5,1,12,'2024-07-30','unit'),(16,'Chinese sausage',200,50,500,'2024-09-30','grams'),(17,'Bean sprouts',150,30,300,'2024-07-15','grams'),(18,'Chives',50,10,150,'2024-08-05','grams'),(19,'Dark soy sauce',100,20,200,'2024-10-30','ml'),(20,'Light soy sauce',100,20,200,'2024-11-30','ml'),(21,'Chili paste',100,20,250,'2024-12-31','grams'),(22,'Oysters',200,50,400,'2024-08-10','grams'),(23,'Flour',500,100,1000,'2025-12-31','grams'),(24,'Pepper',30,5,70,'2025-12-31','grams'),(25,'Oil',500,100,1000,'2024-12-31','ml'),(26,'Yellow noodles',500,100,1000,'2024-10-30','grams'),(27,'Rice vermicelli',400,80,800,'2024-11-30','grams'),(28,'Squid',300,100,600,'2024-08-20','grams'),(29,'Pork belly',400,80,800,'2024-10-15','grams'),(30,'Fish sauce',100,20,200,'2024-12-31','ml'),(31,'Chili',50,10,150,'2024-08-30','grams'),(32,'Vermicelli',400,80,800,'2024-10-30','grams'),(33,'Coconut milk',400,100,800,'2024-09-30','ml'),(34,'Shrimp',300,100,600,'2024-08-15','grams'),(35,'Fish cake',250,50,500,'2024-09-25','grams'),(36,'Spices',100,10,300,'2025-12-31','grams'),(37,'Fish',400,100,800,'2024-08-25','grams'),(38,'Banana leaves',10,1,20,'2024-07-15','leaves'),(39,'Turmeric',50,10,150,'2024-12-31','grams'),(40,'Lemongrass',50,10,150,'2024-09-15','stalks'),(41,'Peanut sauce',150,30,300,'2024-10-31','ml'),(42,'Beef',500,100,1000,'2024-10-05','grams'),(43,'Mutton',500,100,1000,'2024-10-05','grams'),(44,'Ghee',200,40,400,'2024-12-31','ml'),(45,'Meat/vegetables',500,100,1000,'2024-09-30','grams'),(46,'Curry powder',100,10,300,'2025-12-31','grams'),(47,'Egg noodles',500,100,1000,'2024-10-30','grams'),(48,'Pork',500,100,1000,'2024-10-15','grams'),(49,'Leafy greens',200,40,400,'2024-07-25','grams'),(50,'Pork shoulder',400,80,800,'2024-10-15','grams'),(51,'Honey',150,30,300,'2024-12-31','ml'),(52,'Preserved radish',100,20,200,'2024-12-31','grams'),(53,'Turnip',200,50,400,'2024-08-30','grams'),(54,'Dried shrimp',100,20,200,'2024-11-30','grams'),(55,'Mushrooms',200,40,400,'2024-08-25','grams'),(56,'Glutinous rice',500,100,1000,'2024-12-31','grams'),(57,'Peanuts',200,40,400,'2024-11-15','grams'),(58,'Shallots',100,20,200,'2024-08-25','grams'),(59,'Pandan leaves',10,2,25,'2024-07-20','leaves'),(60,'Shrimp paste',100,20,200,'2024-12-31','grams'),(61,'Chicken wings',500,100,2500,'2025-10-25','grams'),(62,'Lettuce',100,20,500,'2024-11-01','grams'),(63,'Hoisin sauce',250,50,1250,'2024-12-20','ml'),(64,'Popiah skin',20,4,100,'2025-01-01','pieces'),(65,'Pastry cups',25,5,125,'2025-11-15','pieces'),(66,'Tofu',300,60,1500,'2024-12-01','grams'),(67,'Lime',100,20,500,'2025-02-01','pieces'),(68,'Ground beef',500,100,2500,'2024-10-20','grams'),(69,'Cabbage',200,40,1000,'2024-11-10','grams'),(70,'Cucumber',150,30,750,'2025-10-15','grams'),(71,'Chinese herbs',50,10,250,'2025-01-20','grams'),(72,'Yeast',20,4,100,'2024-10-30','grams'),(73,'Baking soda',50,10,250,'2024-12-25','grams'),(74,'Pineapple',500,100,2500,'2025-01-10','grams'),(75,'Fried dough',200,40,1000,'2024-11-20','pieces'),(76,'Boiled egg',50,10,250,'2025-02-05','pieces'),(77,'Cuttlefish',300,60,1500,'2025-12-15','grams'),(78,'Shrimp fritters',200,40,1000,'2024-10-10','pieces'),(79,'Carrot',200,40,1000,'2025-11-20','grams'),(80,'Fish fillets',500,100,2500,'2025-12-01','grams'),(81,'Batter',300,60,1500,'2024-12-20','grams'),(82,'Tartar sauce',250,50,1250,'2025-01-05','ml'),(83,'Lemon',100,20,500,'2024-10-25','pieces'),(84,'Fries',500,100,2500,'2025-11-05','grams'),(85,'Chicken thigh',500,100,2500,'2025-10-20','grams'),(86,'Olive oil',500,100,2500,'2024-12-15','ml'),(87,'Herbs',50,10,250,'2024-11-05','grams'),(88,'Vegetables',500,100,2500,'2025-02-01','grams'),(89,'Mashed potato',300,60,1500,'2025-01-20','grams'),(90,'Spaghetti',500,100,2500,'2024-11-25','grams'),(91,'Chili flakes',30,6,150,'2024-12-10','grams'),(92,'Parsley',30,6,150,'2025-01-15','grams'),(93,'Parmesan cheese',200,40,1000,'2024-10-15','grams'),(94,'Beef cut (ribeye)',500,100,2500,'2025-11-10','grams'),(95,'Butter',250,50,1250,'2025-10-30','grams'),(96,'Romaine lettuce',100,20,500,'2025-02-05','grams'),(97,'Chicken breast',500,100,2500,'2025-01-25','grams'),(98,'Croutons',100,20,500,'2024-11-15','grams'),(99,'Caesar dressing',250,50,1250,'2025-12-05','ml'),(100,'Anchovies',100,20,500,'2024-10-05','grams'),(101,'Rice flour',500,100,2500,'2025-11-30','grams');
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitem`
--

DROP TABLE IF EXISTS `orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitem` (
  `orderItemId` int unsigned NOT NULL AUTO_INCREMENT,
  `orderId` int unsigned NOT NULL,
  `dishId` int NOT NULL,
  `orderItemQty` int DEFAULT NULL,
  `orderModifier` varchar(255) DEFAULT NULL,
  `orderSurcharge` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`orderItemId`),
  KEY `orderId` (`orderId`),
  KEY `orderitem_ibfk_2` (`dishId`),
  CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `customerorder` (`orderId`),
  CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`dishId`) REFERENCES `dish` (`dishId`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitem`
--

LOCK TABLES `orderitem` WRITE;
/*!40000 ALTER TABLE `orderitem` DISABLE KEYS */;
INSERT INTO `orderitem` VALUES (31,2,1,1,'Small; Add-Ons Two',1.00),(32,2,1,4,'Large; Add-Ons Three',2.00),(38,3,3,1,'Small',0.00),(39,4,5,1,'Small; Add-Ons One; Add-Ons Two; Add-Ons Three',3.00),(40,5,4,1,'Large; Add-Ons One; Add-Ons Two; Add-Ons Three',4.00),(42,6,6,10,'Large; Add-Ons One; Add-Ons Three; Add-Ons Two',4.00),(43,6,7,3,'Regular; Add-Ons One; Add-Ons Two; Add-Ons Three',4.00),(44,7,2,1,'Small',-2.00),(45,7,8,1,'Small',0.00),(46,7,9,1,'Small',0.00),(47,7,9,1,'Small; Add-Ons One; Add-Ons Three',2.00),(48,7,2,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons One; Add-Ons Two; Add-Ons Three',3.00),(49,7,5,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Two; Add-Ons Three; Add-Ons One',3.00),(50,8,6,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons One; Add-Ons Two; Add-Ons Three',3.00),(51,9,7,1,'Large; Ingredient One; Ingredient Two; Add-Ons Three',2.00),(52,9,4,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Three',1.00),(53,14,3,2,'Regular; Ingredient One; Ingredient Three; Add-Ons Two',1.00),(54,10,8,10,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Two; Add-Ons Three; Add-Ons One',3.00),(55,10,8,8,'Large; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Three',2.00),(56,11,8,5,'Regular; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons One',1.00),(57,11,9,2,'Small; Ingredient One; Ingredient Two; Ingredient Three',0.00),(58,17,5,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Three',0.00),(59,17,10,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Two',1.00),(60,17,5,1,'Small; Ingredient One; Ingredient Two; Ingredient Three',-1.00),(62,18,6,10,'Small; Ingredient One; Ingredient Two; Ingredient Three',0.00),(63,19,12,1,'Small\n; Ingredient One; Ingredient Two; Ingredient Three\n',0.00),(64,19,1,1,'Small; Ingredient One; Ingredient Two; Ingredient Three',0.00),(65,19,11,1,'Large; Ingredient One; Ingredient Two; Add-Ons One; Add-Ons Two; Add-Ons Three',4.00),(66,19,16,1,'Large; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons One; Add-Ons Two; Add-Ons Three',4.00),(67,19,16,1,'Large; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Two; Add-Ons One; Add-Ons Three',4.00),(68,19,16,1,'Large; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons One; Add-Ons Two; Add-Ons Three',4.00),(69,19,2,1,'Large; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Three; Add-Ons Two; Add-Ons One',5.00),(70,19,2,1,'Large; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Two; Add-Ons One; Add-Ons Three',5.00),(71,20,22,1,'Small; Ingredient One; Ingredient Two; Ingredient Three',0.00),(72,20,22,1,'Small; Ingredient One; Ingredient Two; Ingredient Three',0.00),(73,20,1,1,'Large; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Two; Add-Ons Three; Add-Ons One',4.00),(74,21,23,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Three',1.27),(75,21,22,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Two; Add-Ons Three',2.35),(76,21,11,1,'Small; Ingredient One; Add-Ons One; Add-Ons Two; Add-Ons Three',3.25),(77,21,2,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Three',-0.30),(78,22,2,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons Three; Add-Ons Two; Add-Ons One',1.70),(79,22,2,1,'Small; Ingredient One',-1.80),(81,23,15,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons One',0.60),(82,24,1,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons One; Add-Ons Two; Add-Ons Three',3.15),(83,25,2,1,'Large; Ingredient One; Ingredient Two; Add-Ons One; Add-Ons Two; Add-Ons Three',5.30),(84,26,2,1,'Small; Ingredient One; Ingredient Two; Ingredient Three',-1.80),(85,27,1,1,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons One',0.65),(88,28,1,3,'Small; Ingredient One; Ingredient Two; Ingredient Three; Add-Ons One; Add-Ons Two; Add-Ons Three',3.15),(90,29,7,1,'Small; Ingredient One; Ingredient Two; Ingredient Three',-0.40),(91,12,2,1,'Small; Ingredient One; Ingredient Two; Ingredient Three',-1.80),(92,32,12,1,'Small; Ingredient One; Ingredient Two; Ingredient Three',-0.30),(93,32,19,1,'Small; Ingredient One; Ingredient Two; Ingredient Three',-0.25);
/*!40000 ALTER TABLE `orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `storeId` int NOT NULL AUTO_INCREMENT,
  `storeName` varchar(45) NOT NULL,
  `storeUnit` varchar(10) NOT NULL,
  `storePhone` varchar(45) NOT NULL,
  `storeCategory` varchar(45) NOT NULL,
  `storeEmail` varchar(255) DEFAULT NULL,
  `storePassword` varchar(255) NOT NULL,
  PRIMARY KEY (`storeId`),
  UNIQUE KEY `storeid_UNIQUE` (`storeId`),
  UNIQUE KEY `storephone_UNIQUE` (`storePhone`),
  UNIQUE KEY `storeemail_UNIQUE` (`storeEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'Chicken Rise','#01-100','6564071352','Chinese','luckyricestall@email.com','5fskHqI^b!5C'),(2,'Wok Fragrance','#01-101','6566045601','Chinese','charkwayteow@email.com','!PkVpkpuK7'),(3,'Noodle Master','#01-102','6569501475','Chinese','noodlemaster@email.com','@i38nPZt78'),(4,'Icy Paradise','#01-103','6568328025','Dessert','icyparadise@email.com','L)*7Vwwawc'),(5,'Roti Palace','#01-104','6564803179','Indian','rotipalace@email.com','NdlXI3ZK+4'),(6,'Wanton Mee','#01-105','6565159366','Chinese','wantonmee@email.com','VHIuqAyKx5*3'),(7,'Muslim Delight','#01-109','6567848477','Malay/Muslim','muslimdelight@email.com','$5u8I#o%'),(8,'Original Bak Kut Teh','#01-110','6568274046','Chinese','originalbakkutteh@email.com','5fsk08I^b!5C'),(9,'Western Grill','#01-112','6568799577','Western','westerngrill@email.com','@i38nPZt79');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-29 19:34:51
