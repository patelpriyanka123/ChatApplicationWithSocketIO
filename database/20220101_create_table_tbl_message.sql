CREATE TABLE `tbl_message` (
  `messageId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `senderId` INT NOT NULL COMMENT '',
  `receiverId` INT NOT NULL COMMENT '',
  `message` VARCHAR(256) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`messageId`)  COMMENT '');
