-- MySQL dump 10.17  Distrib 10.3.17-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: novomoden
-- ------------------------------------------------------
-- Server version	10.3.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversations` (
  `convers_id` int(11) NOT NULL AUTO_INCREMENT,
  `id1` int(11) NOT NULL,
  `conversant1` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `id2` int(11) NOT NULL,
  `conversant2` varchar(20) COLLATE utf8mb4_slovenian_ci DEFAULT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`convers_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_slovenian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,90166281,'Matej',90164981,'Katni','2020-10-18 10:48:02'),(2,90164981,'Katni',87260640,'Bejbi','2020-11-22 16:38:00');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enjoyers`
--

DROP TABLE IF EXISTS `enjoyers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enjoyers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mango_id` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `street` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `town` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `post_number` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `street_ship` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `town_ship` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `post_number_ship` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `bank_account` tinyint(1) NOT NULL DEFAULT 0,
  `iban` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `bic` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `reset_exp` bigint(20) NOT NULL DEFAULT 0,
  `reset_attempts` int(11) NOT NULL DEFAULT 0,
  `signup_exp` bigint(20) NOT NULL DEFAULT 0,
  `confirmed` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enjoyers`
--

LOCK TABLES `enjoyers` WRITE;
/*!40000 ALTER TABLE `enjoyers` DISABLE KEYS */;
INSERT INTO `enjoyers` VALUES (35,'85960305','Kati','Katkova','Podzemna 7','Pod nebom','7777','Podzemna 7','Pod nebom','7777','000444555','katkova@email.com',1,'SI56040000700000150','KBMASI2X','$2b$10$qM9okcRn.kz7xVHH2ZLlsOtHO8lsLGvmdnmMt.vPO5hTAJ3rAGKp6','2020-08-16 14:39:19','2020-09-05 18:31:59',0,0,1597667959910,1),(36,'85960683','Kiki','Kitty','Pod jablano 22','Jablana','3999','Pod jablano 22','Jablana','3999','555888000','kitty@email.com',1,'SI56040000700000150','KBMASI2X','$2b$10$wRYt4lX6A4Zh56Mp4cm2he5u8sQxCBvf8UG5GYoPF6GmWpCGH2Hv.','2020-08-16 15:05:16','2020-09-05 18:37:07',0,0,1597669516445,1),(40,'86780646','Mili','Jovovich','Blabla 10','Blabla','5555','Blabla 10','Blabla','5555','5588558','mili@email.com',0,'3280705800823','WKM6666','$2b$10$6.krnkkcX.t7xYswwDR2LuMJR.Yex358FmsNnmJzVFXOSPVVEY8Oe','2020-08-30 19:21:05','2020-08-30 19:21:05',0,0,1598808125559,0),(41,'86780852','Tim','Timček','Videm 18C','Dol pri Ljubljani','2250','Videm 18C','Dol pri Ljubljani','2250','654686','tim@email.com',0,'SI56031051000493357','SI859VMX','$2b$10$aintWH.Aof1KbVPVx47cmeqpfmTVTdJAkFb07lbm4nfjx.AET4XsS','2020-08-30 19:37:35','2020-08-30 19:37:35',0,0,1598809115386,0),(42,'86780916','Ivan','Hribar','Hribarjeva 9','Butalci','4334','Hribarjeva 9','Butalci','4334','55555555','ivan.hribar@email.com',0,'SI56031051000493222','LJBASI2X','$2b$10$HRqKbsF5p3HnaIRN8YL7KeKjid/VadZc24iRhSDi5takI/b5yKtl2','2020-08-30 19:40:54','2020-08-30 19:40:54',0,0,1598809314411,0),(43,'86780927','Riki','Martin','rew','sdfsdf','3223','rew','sdfsdf','3223','3454334','riki@email.com',0,'SI56 0290 0000 0233 020','LJBASI2X','$2b$10$v1781zTTAA5F3bkUwdlNZeXGq/uNwr/S37OaxDKNwWxjpnJWOaC0S','2020-08-30 19:42:37','2020-08-30 19:42:37',0,0,1598809417298,0),(44,'86780978','gtgrtew','grewrew','regre 543','Dol pri Ljubljani','4343','regre 543','Dol pri Ljubljani','4343','34554325234','neki@gmail.com',0,'SI56 0290 0000 0200 020','KSPKSI22XX','$2b$10$DiIZoltMCW8k1BK4LhUmPuZGdM3kck/SfohW3ftLlqVWldv7pCkmC','2020-08-30 19:45:48','2020-08-30 19:45:48',0,0,1598809608324,0),(45,'87260640','Bejbi','Bejbi','jheuher','sdgdgdf','3232','Tratnikova 9','Puščava','7000','50520365','bejbi@email.com',1,'SI56040000700000150','KBMASI2X','$2b$10$aWRjfJ5UTTNNYyVPxEsvfecpDTB3uDIvTjIaARJyUfOpDDF55/PI2','2020-09-05 15:20:17','2020-09-05 18:31:16',0,0,1599312852117,1),(46,'87271819','Manja','Tertinek','Krnekje 29','Krnekje','6666','Krnekje 29','Krnekje','6666','5484864684','manja@email.com',1,'SI56040000700000150','KBMASI2X','$2b$10$GDDIjZ37uxbDHUuJb15OL.TH/ezUyhAh029QvWslqgpi1N3RPFVA.','2020-09-05 18:44:32','2020-09-05 18:44:34',0,0,1599324332740,1),(47,'90164981','Katni','Kozel','Pod marelo 1','Ljubljana','1000','Pod marelo 1','Ljubljana','1000','0038641880149','katjacatia@gmail.com',1,'SI56040000700000150','KBMASI2X','$2b$10$ts6t5r1qPn45zR4.gDm0NOc0mz5e/pyXZ.GRd2imkWIOVIloN/rX.','2020-10-18 08:53:03','2020-10-18 08:53:04',0,0,1603026207267,1),(48,'90166281','Matej','Ločniškar','Videm 18c','Dol pri Ljubljani','1262','Videm 18c','Dol pri Ljubljani','1262','031648659','kombajn@gmail.com',1,'SI56 2633 0001 2039 086','SKBASI2X','$2b$10$dVfwJTztAsxLnyB65LNnmua0YtQ7z.VwLnQ66wwbc2BIpACxFkiYO','2020-10-18 10:27:58','2020-10-18 10:28:00',0,0,1603031600804,1);
/*!40000 ALTER TABLE `enjoyers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listings` (
  `ad_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `date_created` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL DEFAULT 'active',
  `category` int(11) NOT NULL,
  `subcategory` int(11) NOT NULL,
  `subcategory_name` varchar(40) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `size` varchar(100) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `material` varchar(100) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `state` varchar(40) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `brand` varchar(40) COLLATE utf8mb4_slovenian_ci NOT NULL DEFAULT '',
  `description` varchar(1000) COLLATE utf8mb4_slovenian_ci NOT NULL DEFAULT '',
  `weight` float(6,2) NOT NULL,
  `price` float(6,2) NOT NULL,
  `photo1_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `photo1_orig` varchar(100) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `photo2_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `photo2_orig` varchar(100) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `photo3_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `photo3_orig` varchar(100) COLLATE utf8mb4_slovenian_ci NOT NULL,
  PRIMARY KEY (`ad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_slovenian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (1,90164981,'Katni','2020-10-18 09:06:59','2020-10-18 09:06:59','active',1,18,'Kompleti','2','3','2','hm','Bel poletni komplet srajčke in krila.',250.00,8.00,'./uploads/cropped9016498116030264185460.jpg','./uploads/cropped9016498116030264185460.jpg','./uploads/cropped9016498116030264185461.jpg','./uploads/cropped9016498116030264185461.jpg','./uploads/cropped9016498116030264185462.jpg','./uploads/cropped9016498116030264185462.jpg'),(3,90164981,'Katni','2020-10-18 10:19:45','2020-10-18 10:19:45','active',3,3,'Deklice 3 do 6 let','0','7','3','kidz','Otroška sončna očala',50.00,3.00,'./uploads/cropped9016498116030307849830.jpg','./uploads/cropped9016498116030307849830.jpg','./uploads/cropped9016498116030307849831.jpg','./uploads/cropped9016498116030307849831.jpg','./uploads/cropped9016498116030307849832.jpg','./uploads/cropped9016498116030307849832.jpg'),(4,90164981,'Katni','2020-10-18 10:21:10','2020-10-18 10:21:10','active',2,5,'Srajce','4','1','2','hm','Modra srajca z dolgimi rokavi',200.00,7.00,'./uploads/cropped9016498116030308698170.jpg','./uploads/cropped9016498116030308698170.jpg','./uploads/cropped9016498116030308698171.jpg','./uploads/cropped9016498116030308698171.jpg','./uploads/cropped9016498116030308698172.jpg','./uploads/cropped9016498116030308698172.jpg'),(5,90164981,'Katni','2020-10-18 10:22:33','2020-10-18 10:22:33','active',2,15,'Spodnje perilo','3','1','1','hm','Novo!',40.00,2.00,'./uploads/cropped9016498116030309528910.jpg','./uploads/cropped9016498116030309528910.jpg','./uploads/cropped9016498116030309528911.jpg','./uploads/cropped9016498116030309528911.jpg','./uploads/cropped9016498116030309528912.jpg','./uploads/cropped9016498116030309528912.jpg'),(6,90166281,'Matej','2020-10-24 09:33:19','2020-10-24 09:33:19','active',1,11,'Kratke hlače','2','7','2','Kitajska','',200.00,4.00,'./uploads/cropped9016628116035463994870.jpg','./uploads/cropped9016628116035463994870.jpg','./uploads/cropped9016628116035463994871.jpg','./uploads/cropped9016628116035463994871.jpg','./uploads/cropped9016628116035463994872.jpg','./uploads/cropped9016628116035463994872.jpg'),(7,90164981,'Katni','2020-11-08 16:58:45','2020-11-08 16:58:45','active',2,13,'Oblačila za spanje','4','1','2','nicey','',200.00,10.00,'./uploads/cropped9016498116048511254240.jpg','./uploads/cropped9016498116048511254240.jpg','./uploads/cropped9016498116048511254241.jpg','./uploads/cropped9016498116048511254241.jpg','./uploads/cropped9016498116048511254242.jpg','./uploads/cropped9016498116048511254242.jpg'),(8,87260640,'Bejbi','2020-11-22 15:01:44','2020-11-22 15:01:44','active',1,1,'Obleke','2','2','1','ezgr','',3.00,3.00,'./uploads/cropped8726064016060537043990.jpg','./uploads/cropped8726064016060537043990.jpg','./uploads/cropped8726064016060537043991.jpg','./uploads/cropped8726064016060537043991.jpg','./uploads/cropped8726064016060537043992.jpg','./uploads/cropped8726064016060537043992.jpg'),(9,87260640,'Bejbi','2020-11-22 15:47:03','2020-11-22 15:47:03','active',1,18,'Kompleti','1','5','3','dfg','',200.00,14.00,'./uploads/cropped8726064016060564236490.jpg','./uploads/cropped8726064016060564236490.jpg','./uploads/cropped8726064016060564236491.jpg','./uploads/cropped8726064016060564236491.jpg','./uploads/cropped8726064016060564236492.jpg','./uploads/cropped8726064016060564236492.jpg'),(10,87260640,'Bejbi','2020-11-22 16:02:40','2020-11-22 16:02:40','active',1,12,'Krila','4','2','3','hm','',200.00,4.00,'./uploads/cropped8726064016060573605720.jpg','./uploads/cropped8726064016060573605720.jpg','./uploads/cropped8726064016060573605721.jpg','./uploads/cropped8726064016060573605721.jpg','./uploads/cropped8726064016060573605722.jpg','./uploads/cropped8726064016060573605722.jpg');
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `convers_id` int(11) NOT NULL,
  `msg_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `sender` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `receiver` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `date_created` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `msg` varchar(1000) COLLATE utf8mb4_slovenian_ci NOT NULL,
  PRIMARY KEY (`msg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_slovenian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,1,90166281,'Matej',90164981,'Katni','2020-10-18 10:48:02',1,'Ali so gate nove in nenošene?\n\nLp'),(1,2,90164981,'Katni',90166281,'Matej','2020-10-18 10:53:21',1,'Pa sej ti piše bumbar!'),(1,3,90164981,'Katni',90166281,'Matej','2020-10-18 10:53:55',1,'Se opravičujem no haha'),(1,4,90166281,'Matej',90164981,'Katni','2020-10-18 10:54:34',1,'Zdej pa ne bom kupil!'),(1,5,90166281,'Matej',90164981,'Katni','2020-10-18 11:05:08',1,'Ok, sem plačal. kdaj boste poslali?????'),(1,6,90164981,'Katni',90166281,'Matej','2020-10-18 11:12:01',1,'Ko se mi zljubi hahaha'),(2,7,90164981,'Katni',87260640,'Bejbi','2020-11-22 16:38:00',1,'Hej Bejbi :D');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_id` int(11) NOT NULL,
  `buyer` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `date_created` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `date_modified` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `price` float(6,2) NOT NULL,
  `postage` float(6,2) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `seller` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `ad_ids` varchar(40) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `payment_id` varchar(30) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `payment_status` varchar(30) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `pay_status_modified` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `sent` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL,
  `dispute` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_slovenian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,90166281,'Matej','1603033091','1603033091',5.00,1.90,90164981,'Katni','3,5','90166723','','','0',-1,0),(2,90166281,'Matej','1603033124','1603033124',5.00,1.90,90164981,'Katni','3,5','90166724','SUCCEEDED','1603033280','0',4,0),(3,90164981,'Katni','1603546458','1603546458',4.00,3.00,90166281,'Matej','6','90559246','SUCCEEDED','1603546469','1603547061',2,0),(4,90164981,'Katni','1603551532','1603551532',4.00,3.00,90166281,'Matej','6','90559821','SUCCEEDED','1603551546','1603552169',2,0),(5,90164981,'Katni','1603618581','1603618581',4.00,3.00,90166281,'Matej','6','90568189','SUCCEEDED','1603618609','1603618920',4,0),(6,90164981,'Katni','1603634530','1603634530',4.00,3.00,90166281,'Matej','6','90569974','','','0',-1,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `event_id` varchar(30) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `date` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_slovenian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES ('90166724','SUCCEEDED','1603033280'),('90559246','SUCCEEDED','1603546469'),('90559821','SUCCEEDED','1603551546'),('90568189','SUCCEEDED','1603618609');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photos` (
  `photo_id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_url` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickets` (
  `ticket_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `typect` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `question_type` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `order_number` int(11) NOT NULL DEFAULT 0,
  `date_created` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `msg` varchar(1000) COLLATE utf8mb4_slovenian_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `date_closed` varchar(20) COLLATE utf8mb4_slovenian_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_slovenian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,'content',90166281,'reclamation',1603033124,'1603033999','Prodajalka me zajebava!',0,'0'),(2,'content',90166281,'reclamation',2,'1603034135','Hočem denar nazaj!!',0,'0'),(3,'content',90164981,'reclamation',3,'1603548173','Kva si mi to poslou!',0,'1603550674'),(4,'content',90164981,'reclamation',4,'1603553496','Kva si mi to poslou no!',0,'1603554694'),(5,'content',90164981,'reclamation',5,'1603619304','Ni v redu!',0,'0');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-03 20:46:42
