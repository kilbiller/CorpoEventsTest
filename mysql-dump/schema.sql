-- Fix issue with nodejs mysql driver
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tp';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'tp';

CREATE TABLE IF NOT EXISTS `books` (
    isbn varchar(255) NOT NULL PRIMARY KEY,
    name varchar(255) NOT NULL,
    author varchar(255) NOT NULL,
    release_date INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
