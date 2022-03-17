USE redchain_practice;

CREATE TABLE `campaign` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `account` varchar(255) not NULL,
  `title` varchar(255) not NULL,
  `endtime` timestamp not NULL DEFAULT,
  `goal` int,
  `status` boolean
);

CREATE TABLE `group` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) not NULL,
  `account` varchar(255) not NULL,
);

CREATE TABLE `user` (
  `account` varchar(255) not NULL,
  `name` varchar(255) not NULL,
  `amount` int,
  `profileimg` varchar(255)
);

CREATE TABLE `orderbook`(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `from` varchar(255) not NULL,
  `to` varchar(255) not NULL,
  `amount` int
)

CREATE TABLE `offers` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `from` varchar(255) not NULL,
    `amount` int,
    `created_at` timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
    `endtime` timestamp not NULL DEFAULT
);


-- ALTER TABLE `user` ADD roleId int;
-- ALTER TABLE `user` ADD FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);
*/