DROP TABLE IF EXISTS chess;
CREATE TABLE chess  (
  id int IDENTITY,
  name varchar(255),
  color varchar(255),
  x varchar(255),
  y varchar(255),
  state varchar(255),
  location varchar(255)
);
DROP TABLE IF EXISTS person;
CREATE TABLE person  (
  id int IDENTITY,
  username varchar(50) ,
  password varchar(50),
  color varchar(20),
  role varchar(20),
  state varchar(20) ,
  opponent_id varchar(10)
)

