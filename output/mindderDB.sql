-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: mindder.me    Database: mindder
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `feedcalendar`
--

DROP TABLE IF EXISTS `feedcalendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedcalendar` (
  `calendar_idx` int NOT NULL AUTO_INCREMENT,
  `calendar_date` date NOT NULL,
  `user_idx` int NOT NULL,
  `emote_complete_idx` int NOT NULL,
  PRIMARY KEY (`calendar_idx`),
  KEY `fk_feedCalendar_mainUser1_idx` (`user_idx`),
  KEY `fk_feedCalendar_feedEmoteColor1_idx` (`emote_complete_idx`),
  CONSTRAINT `fk_feedCalendar_feedEmoteColor1` FOREIGN KEY (`emote_complete_idx`) REFERENCES `feedemotecolor` (`emote_color_idx`),
  CONSTRAINT `fk_feedCalendar_feedEmoteComplete` FOREIGN KEY (`emote_complete_idx`) REFERENCES `feedemotecomplete` (`emote_complete_idx`),
  CONSTRAINT `fk_feedCalendar_mainUser1` FOREIGN KEY (`user_idx`) REFERENCES `mainuser` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedcalendar`
--

LOCK TABLES `feedcalendar` WRITE;
/*!40000 ALTER TABLE `feedcalendar` DISABLE KEYS */;
INSERT INTO `feedcalendar` VALUES (12,'2023-02-01',11,5),(13,'2023-02-01',12,5),(14,'2023-02-01',11,5),(15,'2023-02-02',18,4),(16,'2023-02-02',18,4);
/*!40000 ALTER TABLE `feedcalendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedcomment`
--

DROP TABLE IF EXISTS `feedcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedcomment` (
  `comment_idx` int NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `update_date` date NOT NULL DEFAULT (curdate()),
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `feed_idx` int NOT NULL,
  `user_idx` int NOT NULL,
  PRIMARY KEY (`comment_idx`),
  KEY `fk_feedComment_mainFeed1_idx` (`feed_idx`),
  KEY `fk_feedComment_mainUser1_idx` (`user_idx`),
  CONSTRAINT `fk_feedComment_mainFeed1` FOREIGN KEY (`feed_idx`) REFERENCES `mainfeed` (`feed_idx`),
  CONSTRAINT `fk_feedComment_mainUser1` FOREIGN KEY (`user_idx`) REFERENCES `mainuser` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedcomment`
--

LOCK TABLES `feedcomment` WRITE;
/*!40000 ALTER TABLE `feedcomment` DISABLE KEYS */;
INSERT INTO `feedcomment` VALUES (1,'김민식,, 너란 여자 잊지 못해','2023-02-01',0,10,11),(2,'돈까스==스윙스','2023-02-02',0,9,12),(3,'스윙스==김민식','2023-02-02',0,11,12),(4,'김민식,, 그거 어떻게 잊는건데..','2023-02-02',0,11,12),(5,'내 이름은 민지. 공주지','2023-02-02',0,7,12),(6,'김민식 그자식에게는 쿨 워터 향기가 가득했다','2023-02-02',0,7,12),(7,'댓글작성','2023-02-03',0,7,14),(10,'string','2023-02-03',0,7,14),(18,'테스트','2023-02-03',0,7,14),(20,'55string','2023-02-03',0,7,14),(21,'이유경이유경경경','2023-02-03',0,7,14),(23,'민지님께,,','2023-02-03',0,7,14),(24,'인기 스타 이유경의 피드','2023-02-03',0,7,14);
/*!40000 ALTER TABLE `feedcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedemote`
--

DROP TABLE IF EXISTS `feedemote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedemote` (
  `emote_idx` int NOT NULL AUTO_INCREMENT,
  `emote_tag` varchar(16) NOT NULL,
  `file_idx` int DEFAULT NULL,
  PRIMARY KEY (`emote_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedemote`
--

LOCK TABLES `feedemote` WRITE;
/*!40000 ALTER TABLE `feedemote` DISABLE KEYS */;
INSERT INTO `feedemote` VALUES (1,'aggro',5),(2,'joy',6),(3,'loneliness',7),(4,'depressed',8),(5,'fatigue',9),(6,'satisfied',10),(7,'happiness',11),(8,'sadness',12),(9,'unrest',13),(10,'pain',14),(11,'discomfort',15),(12,'disappointment',16),(13,'nervous',17),(14,'excited',18),(15,'boredom',19),(16,'etc',20);
/*!40000 ALTER TABLE `feedemote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedemotecolor`
--

DROP TABLE IF EXISTS `feedemotecolor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedemotecolor` (
  `emote_color_idx` int NOT NULL AUTO_INCREMENT,
  `emote_color_tag` varchar(20) NOT NULL,
  `emote_color_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`emote_color_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedemotecolor`
--

LOCK TABLES `feedemotecolor` WRITE;
/*!40000 ALTER TABLE `feedemotecolor` DISABLE KEYS */;
INSERT INTO `feedemotecolor` VALUES (1,'#F56161','Red'),(2,'#82AAE3','Blue'),(3,'#B6E2A1','Green'),(4,'#F8EDE3','Beige'),(5,'#AD8270','Brown'),(6,'#B2B2B2','Gray'),(7,'#FC9CBB','Pink'),(8,'#3A4F7A','Navy'),(9,'#FFC7C7','Peach'),(10,'#F8F388','Yellow'),(11,'#FFCC80','Orange'),(12,'#BA94D1','Purple'),(13,'#FFFFFF','White'),(14,'#7FE9DE','Mint'),(15,'#863A6F','Mauve'),(16,'#000000','Black');
/*!40000 ALTER TABLE `feedemotecolor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedemotecomplete`
--

DROP TABLE IF EXISTS `feedemotecomplete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedemotecomplete` (
  `emote_complete_idx` int NOT NULL AUTO_INCREMENT,
  `emote_idx` int NOT NULL,
  `emote_color_idx` int NOT NULL,
  `file_idx` int NOT NULL,
  PRIMARY KEY (`emote_complete_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedemotecomplete`
--

LOCK TABLES `feedemotecomplete` WRITE;
/*!40000 ALTER TABLE `feedemotecomplete` DISABLE KEYS */;
INSERT INTO `feedemotecomplete` VALUES (1,1,1,21),(2,1,2,22),(3,1,3,23),(4,1,4,24),(5,1,5,25),(6,1,6,26),(7,1,7,27),(8,1,8,28),(9,1,9,29),(10,1,10,30),(11,1,11,31),(12,1,12,32),(13,1,13,33),(14,1,14,34),(15,1,15,35),(16,1,16,36),(17,2,1,37),(18,2,2,38),(19,2,3,39),(20,2,4,40),(21,2,5,41),(22,2,6,42),(23,2,7,43),(24,2,8,44),(25,2,9,45),(26,2,10,46),(27,2,11,47),(28,2,12,48),(29,2,13,49),(30,2,14,50),(31,2,15,51),(32,2,16,52),(33,3,1,53),(34,3,2,54),(35,3,3,55),(36,3,4,56),(37,3,5,57),(38,3,6,58),(39,3,7,59),(40,3,8,60),(41,3,9,61),(42,3,10,62),(43,3,11,63),(44,3,12,64),(45,3,13,65),(46,3,14,66),(47,3,15,67),(48,3,16,68),(49,4,1,69),(50,4,2,70),(51,4,3,71),(52,4,4,72),(53,4,5,73),(54,4,6,74),(55,4,7,75),(56,4,8,76),(57,4,9,77),(58,4,10,78),(59,4,11,79),(60,4,12,80),(61,4,13,81),(62,4,14,82),(63,4,15,83),(64,4,16,84),(65,5,1,85),(66,5,2,86),(67,5,3,87),(68,5,4,88),(69,5,5,89),(70,5,6,90),(71,5,7,91),(72,5,8,92),(73,5,9,93),(74,5,10,94),(75,5,11,95),(76,5,12,96),(77,5,13,97),(78,5,14,98),(79,5,15,99),(80,5,16,100),(81,6,1,101),(82,6,2,102),(83,6,3,103),(84,6,4,104),(85,6,5,105),(86,6,6,106),(87,6,7,107),(88,6,8,108),(89,6,9,109),(90,6,10,110),(91,6,11,111),(92,6,12,112),(93,6,13,113),(94,6,14,114),(95,6,15,115),(96,6,16,116),(97,7,1,117),(98,7,2,118),(99,7,3,119),(100,7,4,120),(101,7,5,121),(102,7,6,122),(103,7,7,123),(104,7,8,124),(105,7,9,125),(106,7,10,126),(107,7,11,127),(108,7,12,128),(109,7,13,129),(110,7,14,130),(111,7,15,131),(112,7,16,132),(113,8,1,133),(114,8,2,134),(115,8,3,135),(116,8,4,136),(117,8,5,137),(118,8,6,138),(119,8,7,139),(120,8,8,140),(121,8,9,141),(122,8,10,142),(123,8,11,143),(124,8,12,144),(125,8,13,145),(126,8,14,146),(127,8,15,147),(128,8,16,148),(129,9,1,149),(130,9,2,150),(131,9,3,151),(132,9,4,152),(133,9,5,153),(134,9,6,154),(135,9,7,155),(136,9,8,156),(137,9,9,157),(138,9,10,158),(139,9,11,159),(140,9,12,160),(141,9,13,161),(142,9,14,162),(143,9,15,163),(144,9,16,164),(145,10,1,165),(146,10,2,166),(147,10,3,167),(148,10,4,168),(149,10,5,169),(150,10,6,170),(151,10,7,171),(152,10,8,172),(153,10,9,173),(154,10,10,174),(155,10,11,175),(156,10,12,176),(157,10,13,177),(158,10,14,178),(159,10,15,179),(160,10,16,180),(161,11,1,181),(162,11,2,182),(163,11,3,183),(164,11,4,184),(165,11,5,185),(166,11,6,186),(167,11,7,187),(168,11,8,188),(169,11,9,189),(170,11,10,190),(171,11,11,191),(172,11,12,192),(173,11,13,193),(174,11,14,194),(175,11,15,195),(176,11,16,196),(177,12,1,197),(178,12,2,198),(179,12,3,199),(180,12,4,200),(181,12,5,201),(182,12,6,202),(183,12,7,203),(184,12,8,204),(185,12,9,205),(186,12,10,206),(187,12,11,207),(188,12,12,208),(189,12,13,209),(190,12,14,210),(191,12,15,211),(192,12,16,212),(193,13,1,213),(194,13,2,214),(195,13,3,215),(196,13,4,216),(197,13,5,217),(198,13,6,218),(199,13,7,219),(200,13,8,220),(201,13,9,221),(202,13,10,222),(203,13,11,223),(204,13,12,224),(205,13,13,225),(206,13,14,226),(207,13,15,227),(208,13,16,228),(209,14,1,229),(210,14,2,230),(211,14,3,231),(212,14,4,232),(213,14,5,233),(214,14,6,234),(215,14,7,235),(216,14,8,236),(217,14,9,237),(218,14,10,238),(219,14,11,239),(220,14,12,240),(221,14,13,241),(222,14,14,242),(223,14,15,243),(224,14,16,244),(225,15,1,245),(226,15,2,246),(227,15,3,247),(228,15,4,248),(229,15,5,249),(230,15,6,250),(231,15,7,251),(232,15,8,252),(233,15,9,253),(234,15,10,254),(235,15,11,255),(236,15,12,256),(237,15,13,257),(238,15,14,258),(239,15,15,259),(240,15,16,260),(241,16,1,261),(242,16,2,262),(243,16,3,263),(244,16,4,264),(245,16,5,265),(246,16,6,266),(247,16,7,267),(248,16,8,268),(249,16,9,269),(250,16,10,270),(251,16,11,271),(252,16,12,272),(253,16,13,273),(254,16,14,274),(255,16,15,275),(256,16,16,276);
/*!40000 ALTER TABLE `feedemotecomplete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedlike`
--

DROP TABLE IF EXISTS `feedlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedlike` (
  `like_idx` int NOT NULL AUTO_INCREMENT,
  `like_type` int NOT NULL,
  `user_idx` int NOT NULL,
  `feed_idx` int NOT NULL,
  PRIMARY KEY (`like_idx`),
  KEY `fk_feedLike_mainFeed1_idx` (`feed_idx`),
  KEY `fk_feedLike_mainUser_idx` (`user_idx`),
  CONSTRAINT `fk_feedLike_mainFeed1` FOREIGN KEY (`feed_idx`) REFERENCES `mainfeed` (`feed_idx`),
  CONSTRAINT `fk_feedLike_mainUser` FOREIGN KEY (`user_idx`) REFERENCES `mainuser` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedlike`
--

LOCK TABLES `feedlike` WRITE;
/*!40000 ALTER TABLE `feedlike` DISABLE KEYS */;
INSERT INTO `feedlike` VALUES (1,2,14,7),(2,3,11,7),(4,2,13,7),(5,3,5,10),(7,2,14,10),(8,1,11,8),(9,1,11,10),(10,1,5,11),(11,3,6,11),(12,3,6,10),(13,2,6,9),(14,3,7,9),(21,3,12,9),(22,1,12,10);
/*!40000 ALTER TABLE `feedlike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedscrap`
--

DROP TABLE IF EXISTS `feedscrap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedscrap` (
  `scrap_idx` int NOT NULL AUTO_INCREMENT,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_idx` int NOT NULL,
  `feed_idx` int NOT NULL,
  PRIMARY KEY (`scrap_idx`,`user_idx`),
  KEY `fk_feedScrap_mainUser1_idx` (`user_idx`),
  KEY `fk_feedScrap_mainFeed1_idx` (`feed_idx`),
  CONSTRAINT `fk_feedScrap_mainFeed1` FOREIGN KEY (`feed_idx`) REFERENCES `mainfeed` (`feed_idx`),
  CONSTRAINT `fk_feedScrap_mainUser1` FOREIGN KEY (`user_idx`) REFERENCES `mainuser` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedscrap`
--

LOCK TABLES `feedscrap` WRITE;
/*!40000 ALTER TABLE `feedscrap` DISABLE KEYS */;
INSERT INTO `feedscrap` VALUES (7,'2023-02-02 06:50:04',11,7),(8,'2023-02-02 06:58:07',11,7),(12,'2023-02-02 07:13:52',12,8),(14,'2023-02-02 07:13:56',12,10);
/*!40000 ALTER TABLE `feedscrap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagefile`
--

DROP TABLE IF EXISTS `imagefile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagefile` (
  `file_idx` int NOT NULL AUTO_INCREMENT,
  `save_folder` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `original_file` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `save_file` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`file_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=300 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagefile`
--

LOCK TABLES `imagefile` WRITE;
/*!40000 ALTER TABLE `imagefile` DISABLE KEYS */;
INSERT INTO `imagefile` VALUES (1,'230130','temp.png','894922736401200.png'),(2,'230130','temp.png','453521744096943.png'),(3,'230131','temp.png','953707096371500.png'),(4,'230131','temp.png','512170492937707.png'),(5,'normal','aggro.png','aggro.png'),(6,'normal','joy.png','joy.png'),(7,'normal','loneliness.png','loneliness.png'),(8,'normal','depressed.png','depressed.png'),(9,'normal','fatigue.png','fatigue.png'),(10,'normal','satisfied.png','satisfied.png'),(11,'normal','happiness.png','happiness.png'),(12,'normal','sadness.png','sadness.png'),(13,'normal','unrest.png','unrest.png'),(14,'normal','pain.png','pain.png'),(15,'normal','discomfort.png','discomfort.png'),(16,'normal','disappointment.png','disappointment.png'),(17,'normal','nervous.png','nervous.png'),(18,'normal','excited.png','excited.png'),(19,'normal','boredom.png','boredom.png'),(20,'normal','etc.png','etc.png'),(21,'aggro','Red.png','Red.png'),(22,'aggro','Blue.png','Blue.png'),(23,'aggro','Green.png','Green.png'),(24,'aggro','Beige.png','Beige.png'),(25,'aggro','Brown.png','Brown.png'),(26,'aggro','Gray.png','Gray.png'),(27,'aggro','Pink.png','Pink.png'),(28,'aggro','Navy.png','Navy.png'),(29,'aggro','Peach.png','Peach.png'),(30,'aggro','Yellow.png','Yellow.png'),(31,'aggro','Orange.png','Orange.png'),(32,'aggro','Purple.png','Purple.png'),(33,'aggro','White.png','White.png'),(34,'aggro','Mint.png','Mint.png'),(35,'aggro','Mauve.png','Mauve.png'),(36,'aggro','Black.png','Black.png'),(37,'joy','Red.png','Red.png'),(38,'joy','Blue.png','Blue.png'),(39,'joy','Green.png','Green.png'),(40,'joy','Beige.png','Beige.png'),(41,'joy','Brown.png','Brown.png'),(42,'joy','Gray.png','Gray.png'),(43,'joy','Pink.png','Pink.png'),(44,'joy','Navy.png','Navy.png'),(45,'joy','Peach.png','Peach.png'),(46,'joy','Yellow.png','Yellow.png'),(47,'joy','Orange.png','Orange.png'),(48,'joy','Purple.png','Purple.png'),(49,'joy','White.png','White.png'),(50,'joy','Mint.png','Mint.png'),(51,'joy','Mauve.png','Mauve.png'),(52,'joy','Black.png','Black.png'),(53,'loneliness','Red.png','Red.png'),(54,'loneliness','Blue.png','Blue.png'),(55,'loneliness','Green.png','Green.png'),(56,'loneliness','Beige.png','Beige.png'),(57,'loneliness','Brown.png','Brown.png'),(58,'loneliness','Gray.png','Gray.png'),(59,'loneliness','Pink.png','Pink.png'),(60,'loneliness','Navy.png','Navy.png'),(61,'loneliness','Peach.png','Peach.png'),(62,'loneliness','Yellow.png','Yellow.png'),(63,'loneliness','Orange.png','Orange.png'),(64,'loneliness','Purple.png','Purple.png'),(65,'loneliness','White.png','White.png'),(66,'loneliness','Mint.png','Mint.png'),(67,'loneliness','Mauve.png','Mauve.png'),(68,'loneliness','Black.png','Black.png'),(69,'depressed','Red.png','Red.png'),(70,'depressed','Blue.png','Blue.png'),(71,'depressed','Green.png','Green.png'),(72,'depressed','Beige.png','Beige.png'),(73,'depressed','Brown.png','Brown.png'),(74,'depressed','Gray.png','Gray.png'),(75,'depressed','Pink.png','Pink.png'),(76,'depressed','Navy.png','Navy.png'),(77,'depressed','Peach.png','Peach.png'),(78,'depressed','Yellow.png','Yellow.png'),(79,'depressed','Orange.png','Orange.png'),(80,'depressed','Purple.png','Purple.png'),(81,'depressed','White.png','White.png'),(82,'depressed','Mint.png','Mint.png'),(83,'depressed','Mauve.png','Mauve.png'),(84,'depressed','Black.png','Black.png'),(85,'fatigue','Red.png','Red.png'),(86,'fatigue','Blue.png','Blue.png'),(87,'fatigue','Green.png','Green.png'),(88,'fatigue','Beige.png','Beige.png'),(89,'fatigue','Brown.png','Brown.png'),(90,'fatigue','Gray.png','Gray.png'),(91,'fatigue','Pink.png','Pink.png'),(92,'fatigue','Navy.png','Navy.png'),(93,'fatigue','Peach.png','Peach.png'),(94,'fatigue','Yellow.png','Yellow.png'),(95,'fatigue','Orange.png','Orange.png'),(96,'fatigue','Purple.png','Purple.png'),(97,'fatigue','White.png','White.png'),(98,'fatigue','Mint.png','Mint.png'),(99,'fatigue','Mauve.png','Mauve.png'),(100,'fatigue','Black.png','Black.png'),(101,'satisfied','Red.png','Red.png'),(102,'satisfied','Blue.png','Blue.png'),(103,'satisfied','Green.png','Green.png'),(104,'satisfied','Beige.png','Beige.png'),(105,'satisfied','Brown.png','Brown.png'),(106,'satisfied','Gray.png','Gray.png'),(107,'satisfied','Pink.png','Pink.png'),(108,'satisfied','Navy.png','Navy.png'),(109,'satisfied','Peach.png','Peach.png'),(110,'satisfied','Yellow.png','Yellow.png'),(111,'satisfied','Orange.png','Orange.png'),(112,'satisfied','Purple.png','Purple.png'),(113,'satisfied','White.png','White.png'),(114,'satisfied','Mint.png','Mint.png'),(115,'satisfied','Mauve.png','Mauve.png'),(116,'satisfied','Black.png','Black.png'),(117,'happiness','Red.png','Red.png'),(118,'happiness','Blue.png','Blue.png'),(119,'happiness','Green.png','Green.png'),(120,'happiness','Beige.png','Beige.png'),(121,'happiness','Brown.png','Brown.png'),(122,'happiness','Gray.png','Gray.png'),(123,'happiness','Pink.png','Pink.png'),(124,'happiness','Navy.png','Navy.png'),(125,'happiness','Peach.png','Peach.png'),(126,'happiness','Yellow.png','Yellow.png'),(127,'happiness','Orange.png','Orange.png'),(128,'happiness','Purple.png','Purple.png'),(129,'happiness','White.png','White.png'),(130,'happiness','Mint.png','Mint.png'),(131,'happiness','Mauve.png','Mauve.png'),(132,'happiness','Black.png','Black.png'),(133,'sadness','Red.png','Red.png'),(134,'sadness','Blue.png','Blue.png'),(135,'sadness','Green.png','Green.png'),(136,'sadness','Beige.png','Beige.png'),(137,'sadness','Brown.png','Brown.png'),(138,'sadness','Gray.png','Gray.png'),(139,'sadness','Pink.png','Pink.png'),(140,'sadness','Navy.png','Navy.png'),(141,'sadness','Peach.png','Peach.png'),(142,'sadness','Yellow.png','Yellow.png'),(143,'sadness','Orange.png','Orange.png'),(144,'sadness','Purple.png','Purple.png'),(145,'sadness','White.png','White.png'),(146,'sadness','Mint.png','Mint.png'),(147,'sadness','Mauve.png','Mauve.png'),(148,'sadness','Black.png','Black.png'),(149,'unrest','Red.png','Red.png'),(150,'unrest','Blue.png','Blue.png'),(151,'unrest','Green.png','Green.png'),(152,'unrest','Beige.png','Beige.png'),(153,'unrest','Brown.png','Brown.png'),(154,'unrest','Gray.png','Gray.png'),(155,'unrest','Pink.png','Pink.png'),(156,'unrest','Navy.png','Navy.png'),(157,'unrest','Peach.png','Peach.png'),(158,'unrest','Yellow.png','Yellow.png'),(159,'unrest','Orange.png','Orange.png'),(160,'unrest','Purple.png','Purple.png'),(161,'unrest','White.png','White.png'),(162,'unrest','Mint.png','Mint.png'),(163,'unrest','Mauve.png','Mauve.png'),(164,'unrest','Black.png','Black.png'),(165,'pain','Red.png','Red.png'),(166,'pain','Blue.png','Blue.png'),(167,'pain','Green.png','Green.png'),(168,'pain','Beige.png','Beige.png'),(169,'pain','Brown.png','Brown.png'),(170,'pain','Gray.png','Gray.png'),(171,'pain','Pink.png','Pink.png'),(172,'pain','Navy.png','Navy.png'),(173,'pain','Peach.png','Peach.png'),(174,'pain','Yellow.png','Yellow.png'),(175,'pain','Orange.png','Orange.png'),(176,'pain','Purple.png','Purple.png'),(177,'pain','White.png','White.png'),(178,'pain','Mint.png','Mint.png'),(179,'pain','Mauve.png','Mauve.png'),(180,'pain','Black.png','Black.png'),(181,'discomfort','Red.png','Red.png'),(182,'discomfort','Blue.png','Blue.png'),(183,'discomfort','Green.png','Green.png'),(184,'discomfort','Beige.png','Beige.png'),(185,'discomfort','Brown.png','Brown.png'),(186,'discomfort','Gray.png','Gray.png'),(187,'discomfort','Pink.png','Pink.png'),(188,'discomfort','Navy.png','Navy.png'),(189,'discomfort','Peach.png','Peach.png'),(190,'discomfort','Yellow.png','Yellow.png'),(191,'discomfort','Orange.png','Orange.png'),(192,'discomfort','Purple.png','Purple.png'),(193,'discomfort','White.png','White.png'),(194,'discomfort','Mint.png','Mint.png'),(195,'discomfort','Mauve.png','Mauve.png'),(196,'discomfort','Black.png','Black.png'),(197,'disappointment','Red.png','Red.png'),(198,'disappointment','Blue.png','Blue.png'),(199,'disappointment','Green.png','Green.png'),(200,'disappointment','Beige.png','Beige.png'),(201,'disappointment','Brown.png','Brown.png'),(202,'disappointment','Gray.png','Gray.png'),(203,'disappointment','Pink.png','Pink.png'),(204,'disappointment','Navy.png','Navy.png'),(205,'disappointment','Peach.png','Peach.png'),(206,'disappointment','Yellow.png','Yellow.png'),(207,'disappointment','Orange.png','Orange.png'),(208,'disappointment','Purple.png','Purple.png'),(209,'disappointment','White.png','White.png'),(210,'disappointment','Mint.png','Mint.png'),(211,'disappointment','Mauve.png','Mauve.png'),(212,'disappointment','Black.png','Black.png'),(213,'nervous','Red.png','Red.png'),(214,'nervous','Blue.png','Blue.png'),(215,'nervous','Green.png','Green.png'),(216,'nervous','Beige.png','Beige.png'),(217,'nervous','Brown.png','Brown.png'),(218,'nervous','Gray.png','Gray.png'),(219,'nervous','Pink.png','Pink.png'),(220,'nervous','Navy.png','Navy.png'),(221,'nervous','Peach.png','Peach.png'),(222,'nervous','Yellow.png','Yellow.png'),(223,'nervous','Orange.png','Orange.png'),(224,'nervous','Purple.png','Purple.png'),(225,'nervous','White.png','White.png'),(226,'nervous','Mint.png','Mint.png'),(227,'nervous','Mauve.png','Mauve.png'),(228,'nervous','Black.png','Black.png'),(229,'excited','Red.png','Red.png'),(230,'excited','Blue.png','Blue.png'),(231,'excited','Green.png','Green.png'),(232,'excited','Beige.png','Beige.png'),(233,'excited','Brown.png','Brown.png'),(234,'excited','Gray.png','Gray.png'),(235,'excited','Pink.png','Pink.png'),(236,'excited','Navy.png','Navy.png'),(237,'excited','Peach.png','Peach.png'),(238,'excited','Yellow.png','Yellow.png'),(239,'excited','Orange.png','Orange.png'),(240,'excited','Purple.png','Purple.png'),(241,'excited','White.png','White.png'),(242,'excited','Mint.png','Mint.png'),(243,'excited','Mauve.png','Mauve.png'),(244,'excited','Black.png','Black.png'),(245,'boredom','Red.png','Red.png'),(246,'boredom','Blue.png','Blue.png'),(247,'boredom','Green.png','Green.png'),(248,'boredom','Beige.png','Beige.png'),(249,'boredom','Brown.png','Brown.png'),(250,'boredom','Gray.png','Gray.png'),(251,'boredom','Pink.png','Pink.png'),(252,'boredom','Navy.png','Navy.png'),(253,'boredom','Peach.png','Peach.png'),(254,'boredom','Yellow.png','Yellow.png'),(255,'boredom','Orange.png','Orange.png'),(256,'boredom','Purple.png','Purple.png'),(257,'boredom','White.png','White.png'),(258,'boredom','Mint.png','Mint.png'),(259,'boredom','Mauve.png','Mauve.png'),(260,'boredom','Black.png','Black.png'),(261,'etc','Red.png','Red.png'),(262,'etc','Blue.png','Blue.png'),(263,'etc','Green.png','Green.png'),(264,'etc','Beige.png','Beige.png'),(265,'etc','Brown.png','Brown.png'),(266,'etc','Gray.png','Gray.png'),(267,'etc','Pink.png','Pink.png'),(268,'etc','Navy.png','Navy.png'),(269,'etc','Peach.png','Peach.png'),(270,'etc','Yellow.png','Yellow.png'),(271,'etc','Orange.png','Orange.png'),(272,'etc','Purple.png','Purple.png'),(273,'etc','White.png','White.png'),(274,'etc','Mint.png','Mint.png'),(275,'etc','Mauve.png','Mauve.png'),(276,'etc','Black.png','Black.png'),(277,'230201','temp.png','620789557170839.png'),(278,'230201','temp.png','620897214474140.png'),(279,'230201','a.txt','621309611390775.txt'),(280,'230201','temp.png','621720857312550.png'),(281,'230201','temp.png','1063593544296399.png'),(282,'230201','temp.png','1063634074555500.png'),(283,'230201','temp.png','1063718163105600.png'),(284,'230201','temp.png','1064246891580500.png'),(285,'230201','temp.png','1064320596855399.png'),(286,'230201','temp.png','1064599434689200.png'),(287,'230201','temp.png','1064621592785800.png'),(288,'230201','temp.png','1064642878485100.png'),(289,'230201','temp.png','1064794729867300.png'),(290,'230201','temp.png','1065147747206199.png'),(291,'230201','temp.png','1065231695047200.png'),(292,'230201','temp.png','1065302314641000.png'),(293,'230201','temp.png','1065541266057400.png'),(294,'230201','temp.png','1065662223470100.png'),(295,'230201','temp.png','1065906274339400.png'),(296,'230201','temp.png','624172505012086.png'),(297,'230201','temp.png','624174901882230.png'),(298,'230201','temp.png','624297028446467.png'),(299,'230201','temp.png','625246171705683.png');
/*!40000 ALTER TABLE `imagefile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mainfeed`
--

DROP TABLE IF EXISTS `mainfeed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mainfeed` (
  `feed_idx` int NOT NULL AUTO_INCREMENT,
  `social_id` varchar(50) DEFAULT NULL,
  `update_date` date NOT NULL DEFAULT (curdate()),
  `update_time` time NOT NULL DEFAULT (curtime()),
  `is_public` tinyint NOT NULL,
  `main_text` text NOT NULL,
  `normal_tag` text NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `user_idx` int NOT NULL,
  `emote_idx` int NOT NULL,
  `emote_color_idx` int NOT NULL,
  `feed_hit` int NOT NULL DEFAULT '0',
  `file_idx` int NOT NULL,
  `emote_complete_idx` varchar(45) NOT NULL,
  PRIMARY KEY (`feed_idx`),
  KEY `fk_mainFeed_mainUser_idx` (`user_idx`),
  KEY `fk_mainFeed_feedEmote1_idx` (`emote_idx`),
  KEY `fk_mainFeed_feedEmoteColor1_idx` (`emote_color_idx`),
  CONSTRAINT `fk_mainFeed_feedEmote1` FOREIGN KEY (`emote_idx`) REFERENCES `feedemote` (`emote_idx`),
  CONSTRAINT `fk_mainFeed_feedEmoteColor1` FOREIGN KEY (`emote_color_idx`) REFERENCES `feedemotecolor` (`emote_color_idx`),
  CONSTRAINT `fk_mainFeed_mainUser` FOREIGN KEY (`user_idx`) REFERENCES `mainuser` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mainfeed`
--

LOCK TABLES `mainfeed` WRITE;
/*!40000 ALTER TABLE `mainfeed` DISABLE KEYS */;
INSERT INTO `mainfeed` VALUES (7,'@mindder','2023-02-01','02:00:58',1,'오랜만에 뵙습니다!','#반가움#행복',0,14,3,1,106,110,'6'),(8,'@mindder','2023-02-01','02:01:46',1,'오늘 점심은 무엇인가용','#김치알밥_딱좋아',0,14,3,1,3,1,'6'),(9,'@mindder','2023-02-01','04:01:45',1,'퇴근까지 무려5시간','#김민식',0,11,1,1,1,2,'5'),(10,'@mindder','2023-02-02','04:01:58',1,'나를 살게하고 죽게하고 나를 변하게 하는 김민식,,,,','#김민식',0,12,1,1,2,2,'5'),(11,'@mindder','2023-02-01','04:02:12',1,'돈까스 그만 먹자 김민식','#돈까스',0,18,1,1,2,2,'5'),(12,'@민식','2023-02-02','07:36:20',0,'김민식,  세글자..그거 어떻게 잊는건데... ','#이별#아련',0,18,1,4,0,2,'4'),(13,'@mindder','2023-02-02','07:41:01',0,'김민식, 내 옆에서만 울어. 다른 데에서 울면.. 내가 눈물 못 닦아주잖아. ','#그리움#이별중',0,18,1,4,0,4,'4');
/*!40000 ALTER TABLE `mainfeed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mainuser`
--

DROP TABLE IF EXISTS `mainuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mainuser` (
  `user_idx` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `nickname` varchar(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `refresh_token` varchar(300) DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime DEFAULT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `emote_color_idx` int DEFAULT '13',
  `social_id` varchar(50) NOT NULL,
  `file_idx` int DEFAULT NULL,
  PRIMARY KEY (`user_idx`),
  KEY `fk_mainUser_feedEmoteColor1_idx` (`emote_color_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mainuser`
--

LOCK TABLES `mainuser` WRITE;
/*!40000 ALTER TABLE `mainuser` DISABLE KEYS */;
INSERT INTO `mainuser` VALUES (5,'p','p','473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8','eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjc1MTQ2MzQzNDA2LCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzYzNTU5NDMsInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyaWR4Ijo1fQ.w1ZikGYXJr5ontvzNWdNLlm_ZBcKoYRkjWwNeTQYsdo','2023-01-19 14:34:30','2023-01-25 10:11:42',0,1,'@mindder',NULL),(6,'b','b','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjc1MTQ4NDk5NTQwLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzYzNTgwOTksInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyaWR4Ijo2fQ.AB9is1OI-zvroq7xHJWCUU660nlHwbAV6QaRp4Z2axA','2023-01-19 14:55:11',NULL,0,1,'@mindder',NULL),(7,'r','r','454349e422f05297191ead13e21d3db520e5abef52055e4964b82fb213f593a1',NULL,'2023-01-30 06:25:48',NULL,0,1,'@mindder',NULL),(8,'yi','yi','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',NULL,'2023-01-30 06:26:27',NULL,0,1,'@mindder',NULL),(9,'낫띵','sdf','6f25b3f4bc7eadafb8f57d69f8a59db3b23f198151dbf3c66ac3082381518329',NULL,'2023-01-30 07:16:31',NULL,0,1,'@mindder',NULL),(10,'uu','uu','5afab9a620f6f11284505be2fb9a975b4dccfdd30970dffc7ed875490160e4d0','eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjc1MDYzNDA2OTMwLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzYyNzMwMDYsInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyaWR4IjoxMH0.nTtnbFMLFYZHw1KN3vfRnkxkZkFwwePVmcybE6DF6mY','2023-01-30 07:23:24',NULL,0,1,'@mindder',NULL),(11,'string','string','473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8','eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjc1MjE2NzUyOTM1LCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzY0MjYzNTIsInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyaWR4IjoxMX0._klXXaQC49cqF7RFOzllETB0Ok-8aUw_wDedccwX2Z4','2023-01-31 08:23:27','2023-02-01 02:06:24',0,1,'@mindder',NULL),(12,'eunjikim8784@naver.com','eunji','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjc1MzIxNTE2MDcwLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzY1MzExMTYsInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyaWR4IjoxMn0.V_WJLPBWmoWKoqAAPyA1lSW4NJ2EfJlL0urmPMEAmnY','2023-01-31 08:36:30','2023-02-02 07:12:32',0,1,'@mindder',NULL),(13,'1','11','4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8',NULL,'2023-01-31 08:39:19',NULL,0,1,'@mindder',NULL),(14,'yiyou00@naver.com','영차앵차','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjc1Mzg2OTkxNzQzLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzY1OTY1OTEsInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyaWR4IjoxNH0.5lO26PaBdgaISnmfWetYHXWzs9F7hUT52wlfOnJvNj0','2023-01-31 23:26:58','2023-02-01 05:37:53',0,0,'@mindder',NULL),(15,'leeyou032@naver.com','이유경2','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',NULL,'2023-02-01 04:39:31',NULL,0,1,'@mindder',NULL),(16,'t','t','e3b98a4da31a127d4bde6e43033f66ba274cab0eb7eb1c70ec41402bf6273dd8',NULL,'2023-02-01 04:46:16',NULL,0,1,'@mindder',NULL),(17,'abin7989@gmail.com','민','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjc1MzE2MzU2MjUzLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzY1MjU5NTYsInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyaWR4IjoxN30.h1-Xj7woasP6gQTbWxEtABudoCMu_-3BDF_2OWaSFeg','2023-02-02 05:45:22','2023-02-02 05:45:22',0,6,'@mindder',NULL),(18,'pmj7755@naver.com','비번은123','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjc1MjM1NzQ5MDgxLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzY0NDUzNDksInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyaWR4IjoxOH0.D6k6QeGjBujmTFhN9nhbssBhIpEAc6I22Z8WReol15E','2023-02-01 07:07:25',NULL,0,3,'minji',NULL),(19,'string','string','473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8',NULL,'2023-02-01 07:08:03',NULL,0,1,'@',NULL),(20,'syhj0326@naver.com','양양','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjc1MzE1Njg0MjMyLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzY1MjUyODQsInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyaWR4IjoyMH0.ViIlxIftRrGa5myom1EvuSaSINHSSRR38oqYwwlj474','2023-02-01 07:20:05',NULL,0,0,'@mindder',NULL);
/*!40000 ALTER TABLE `mainuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userfollow`
--

DROP TABLE IF EXISTS `userfollow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userfollow` (
  `follow_idx` int NOT NULL AUTO_INCREMENT,
  `target_user_idx` int NOT NULL,
  `user_idx` int NOT NULL,
  PRIMARY KEY (`follow_idx`),
  KEY `fk_userFollower_mainUser1_idx` (`user_idx`),
  CONSTRAINT `fk_userFollower_mainUser1` FOREIGN KEY (`user_idx`) REFERENCES `mainuser` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userfollow`
--

LOCK TABLES `userfollow` WRITE;
/*!40000 ALTER TABLE `userfollow` DISABLE KEYS */;
INSERT INTO `userfollow` VALUES (1,11,14),(2,12,14),(4,14,18),(5,14,17),(6,14,20),(7,14,12);
/*!40000 ALTER TABLE `userfollow` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-03 10:49:11
