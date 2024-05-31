CREATE SCHEMA `fullstack_react_2022` NOT EXISTS;
CREATE USER 'trayan' @'localhost' IDENTIFIED WITH mysql_native_password BY 'trayan';
GRANT ALL PRIVILEGES ON `fullstack_react_2022`.* TO 'trayan' @'localhost';
CREATE TABLE IF NOT EXISTS `fullstack_react_2022`.`posts` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(80) NOT NULL,
    `content` VARCHAR(1024) NULL,
    `author_id` BIGINT(20) NULL,
    `image_url` VARCHAR(256) NULL,
    `tags` VARCHAR(80) NOT NULL,
    `categories` VARCHAR(80) NOT NULL,
    `created` DATETIME NOT NULL DEFAULT NOW(),
    `modified` DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (`id`)
);
INSERT INTO `fullstack_react_2022`.`posts` (
        `title`,
        `content`,
        `author_id`,
        `image_url`,
        `tags`,
        `categories`
    )
VALUES (
        'Intro To SQL',
        'SQL is a standart for accessing relational data ...',
        '1',
        'https://cdn-icons-png.flaticon.com/512/2772/2772165.png',
        'sql, intro',
        'database'
    );