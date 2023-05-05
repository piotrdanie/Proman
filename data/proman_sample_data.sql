--
-- PostgreSQL database Proman
--
SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;


---
--- drop tables
---
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS columns CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS boards_types;


---
--- create tables
---

CREATE TABLE boards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    title       VARCHAR(500)        NOT NULL,
    user_id     INTEGER,
    type        INTEGER             NOT NULL default 1    
);

CREATE TABLE columns (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER       REFERENCES boards(id) ON DELETE CASCADE ON UPDATE CASCADE,
    title       VARCHAR (500)       NOT NULL,
    column_order  INTEGER           NOT NULL
);

CREATE TABLE cards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    column_id   INTEGER       REFERENCES columns(id) ON DELETE CASCADE ON UPDATE CASCADE,
    title       VARCHAR (500)       NOT NULL,
    card_order  INTEGER             NOT NULL
);

CREATE TABLE users (
    id                  SERIAL PRIMARY KEY       NOT NULL,
    registration_time   TIMESTAMP                NOT NULL,
    user_name           TEXT                     NOT NULL,
    email               VARCHAR(255)  UNIQUE     NOT NULL,
    password            VARCHAR(255)             NOT NULL
);


CREATE TABLE boards_types (
    id       SERIAL PRIMARY KEY     NOT NULL,
    title    VARCHAR(200)           NOT NULL
);


---
--- insert data
---
--  1 - public / 2 - private
INSERT INTO boards_types(title) VALUES ('public'); 
INSERT INTO boards_types(title) VALUES ('private');


INSERT INTO boards(title) VALUES ('Board 1');
INSERT INTO boards(title) VALUES ('Board 2');
INSERT INTO boards(title) VALUES ('Board 3');
INSERT INTO boards(title, user_id, type) VALUES ('Board 1 user 1', 1, 2);
INSERT INTO boards(title, user_id, type) VALUES ('Board 2 user 2', 2, 2);
INSERT INTO boards(title, user_id, type) VALUES ('Board 3 user 1', 1, 2);

INSERT INTO columns VALUES (nextval('columns_id_seq'), 1, 'planning', 1);
INSERT INTO columns VALUES (nextval('columns_id_seq'), 1, 'to do', 2);
INSERT INTO columns VALUES (nextval('columns_id_seq'), 1, 'testing', 3);
INSERT INTO columns VALUES (nextval('columns_id_seq'), 1, 'done', 4);
INSERT INTO columns VALUES (nextval('columns_id_seq'), 2, 'planning', 1);
INSERT INTO columns VALUES (nextval('columns_id_seq'), 2, 'to do', 2);
INSERT INTO columns VALUES (nextval('columns_id_seq'), 2, 'testing', 3);
INSERT INTO columns VALUES (nextval('columns_id_seq'), 2, 'done', 4);

INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 3, 'planning', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 4, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 4, 'done card 1', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 5, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 5, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 6, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 7, 'planning', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 8, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 8, 'done card 1', 2);


---
--- add constraints
---
ALTER TABLE ONLY columns
    ADD CONSTRAINT fk_columns_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_column_id FOREIGN KEY (column_id) REFERENCES columns(id);