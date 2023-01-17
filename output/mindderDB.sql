-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mindder
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mindder
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mindder` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mindder` ;

-- -----------------------------------------------------
-- Table `mindder`.`feedEmote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindder`.`feedEmote` (
  `emote_idx` INT NOT NULL AUTO_INCREMENT,
  `emote_tag` VARCHAR(16) NOT NULL,
  `emote_image` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`emote_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mindder`.`feedEmoteColor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindder`.`feedEmoteColor` (
  `emote_color_idx` INT NOT NULL AUTO_INCREMENT,
  `emote_color_tag` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`emote_color_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mindder`.`mainUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindder`.`mainUser` (
  `user_idx` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(16) NOT NULL,
  `nickname` VARCHAR(16) NOT NULL,
  `password` VARCHAR(16) NOT NULL,
  `refresh_token` VARCHAR(45) NOT NULL,
  `create_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` TINYINT NOT NULL DEFAULT '0',
  `emote_color_idx` INT NOT NULL,
  PRIMARY KEY (`user_idx`),
  INDEX `fk_mainUser_feedEmoteColor1_idx` (`emote_color_idx` ASC) VISIBLE,
  CONSTRAINT `fk_mainUser_feedEmoteColor1`
    FOREIGN KEY (`emote_color_idx`)
    REFERENCES `mindder`.`feedEmoteColor` (`emote_color_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mindder`.`feedCalendar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindder`.`feedCalendar` (
  `calendar_idx` INT NOT NULL AUTO_INCREMENT,
  `calendar_date` DATETIME NOT NULL,
  `emote_idx` INT NOT NULL,
  `user_idx` INT NOT NULL,
  `emote_color_idx` INT NOT NULL,
  PRIMARY KEY (`calendar_idx`, `user_idx`),
  INDEX `fk_feedCalendar_feedEmote1_idx` (`emote_idx` ASC) VISIBLE,
  INDEX `fk_feedCalendar_mainUser1_idx` (`user_idx` ASC) VISIBLE,
  INDEX `fk_feedCalendar_feedEmoteColor1_idx` (`emote_color_idx` ASC) VISIBLE,
  CONSTRAINT `fk_feedCalendar_feedEmote1`
    FOREIGN KEY (`emote_idx`)
    REFERENCES `mindder`.`feedEmote` (`emote_idx`),
  CONSTRAINT `fk_feedCalendar_feedEmoteColor1`
    FOREIGN KEY (`emote_color_idx`)
    REFERENCES `mindder`.`feedEmoteColor` (`emote_color_idx`),
  CONSTRAINT `fk_feedCalendar_mainUser1`
    FOREIGN KEY (`user_idx`)
    REFERENCES `mindder`.`mainUser` (`user_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mindder`.`mainFeed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindder`.`mainFeed` (
  `feed_idx` INT NOT NULL AUTO_INCREMENT,
  `update_date` DATE NOT NULL DEFAULT curdate(),
  `update_time` TIME NOT NULL DEFAULT curtime(),
  `is_public` TINYINT NOT NULL,
  `main_text` TEXT NOT NULL,
  `normal_tag` TEXT NOT NULL,
  `is_deleted` TINYINT NOT NULL DEFAULT '0',
  `user_idx` INT NOT NULL,
  `emote_idx` INT NOT NULL,
  `emote_color_idx` INT NOT NULL,
  `feed_hit` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`feed_idx`),
  INDEX `fk_mainFeed_mainUser_idx` (`user_idx` ASC) VISIBLE,
  INDEX `fk_mainFeed_feedEmote1_idx` (`emote_idx` ASC) VISIBLE,
  INDEX `fk_mainFeed_feedEmoteColor1_idx` (`emote_color_idx` ASC) VISIBLE,
  CONSTRAINT `fk_mainFeed_feedEmote1`
    FOREIGN KEY (`emote_idx`)
    REFERENCES `mindder`.`feedEmote` (`emote_idx`),
  CONSTRAINT `fk_mainFeed_feedEmoteColor1`
    FOREIGN KEY (`emote_color_idx`)
    REFERENCES `mindder`.`feedEmoteColor` (`emote_color_idx`),
  CONSTRAINT `fk_mainFeed_mainUser`
    FOREIGN KEY (`user_idx`)
    REFERENCES `mindder`.`mainUser` (`user_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mindder`.`feedComment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindder`.`feedComment` (
  `comment_idx` INT NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `update_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` TINYINT NOT NULL DEFAULT '0',
  `feed_idx` INT NOT NULL,
  `user_idx` INT NOT NULL,
  PRIMARY KEY (`comment_idx`),
  INDEX `fk_feedComment_mainFeed1_idx` (`feed_idx` ASC) VISIBLE,
  INDEX `fk_feedComment_mainUser1_idx` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `fk_feedComment_mainFeed1`
    FOREIGN KEY (`feed_idx`)
    REFERENCES `mindder`.`mainFeed` (`feed_idx`),
  CONSTRAINT `fk_feedComment_mainUser1`
    FOREIGN KEY (`user_idx`)
    REFERENCES `mindder`.`mainUser` (`user_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mindder`.`feedLike`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindder`.`feedLike` (
  `like_idx` INT NOT NULL AUTO_INCREMENT,
  `like_type` INT NOT NULL,
  `like_count` INT NOT NULL DEFAULT '0',
  `is_deleted` TINYINT NOT NULL DEFAULT '0',
  `feed_idx` INT NOT NULL,
  PRIMARY KEY (`like_idx`),
  INDEX `fk_feedLike_mainFeed1_idx` (`feed_idx` ASC) VISIBLE,
  CONSTRAINT `fk_feedLike_mainFeed1`
    FOREIGN KEY (`feed_idx`)
    REFERENCES `mindder`.`mainFeed` (`feed_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mindder`.`feedScrap`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindder`.`feedScrap` (
  `scrap_idx` INT NOT NULL AUTO_INCREMENT,
  `update_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` TINYINT NOT NULL DEFAULT '0',
  `user_idx` INT NOT NULL,
  `feed_idx` INT NOT NULL,
  PRIMARY KEY (`scrap_idx`, `user_idx`),
  INDEX `fk_feedScrap_mainUser1_idx` (`user_idx` ASC) VISIBLE,
  INDEX `fk_feedScrap_mainFeed1_idx` (`feed_idx` ASC) VISIBLE,
  CONSTRAINT `fk_feedScrap_mainFeed1`
    FOREIGN KEY (`feed_idx`)
    REFERENCES `mindder`.`mainFeed` (`feed_idx`),
  CONSTRAINT `fk_feedScrap_mainUser1`
    FOREIGN KEY (`user_idx`)
    REFERENCES `mindder`.`mainUser` (`user_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mindder`.`userFollower`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindder`.`userFollower` (
  `follower_idx` INT NOT NULL AUTO_INCREMENT,
  `target_user_idx` INT NOT NULL,
  `is_deleted` TINYINT NOT NULL DEFAULT '0',
  `user_idx` INT NOT NULL,
  PRIMARY KEY (`follower_idx`),
  INDEX `fk_userFollower_mainUser1_idx` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `fk_userFollower_mainUser1`
    FOREIGN KEY (`user_idx`)
    REFERENCES `mindder`.`mainUser` (`user_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mindder`.`userFollowing`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindder`.`userFollowing` (
  `following_idx` INT NOT NULL AUTO_INCREMENT,
  `target_user_idx` INT NOT NULL,
  `is_deleted` TINYINT NOT NULL DEFAULT '0',
  `user_idx` INT NOT NULL,
  PRIMARY KEY (`following_idx`),
  INDEX `fk_userFollowing_mainUser1_idx` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `fk_userFollowing_mainUser1`
    FOREIGN KEY (`user_idx`)
    REFERENCES `mindder`.`mainUser` (`user_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
