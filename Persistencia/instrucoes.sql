CREATE DATABASE sistema;

USE sistema;

CREATE TABLE pais (
    pais_codigo INT NOT NULL AUTO_INCREMENT,
    pais_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_pais PRIMARY KEY(pais_codigo)
);

CREATE TABLE cidade (
    cidade_codigo INT NOT NULL AUTO_INCREMENT,
    cidade_nome VARCHAR(100) NOT NULL,
    pais_codigo INT NOT NULL,
    CONSTRAINT pk_cidade PRIMARY KEY(cidade_codigo),
    CONSTRAINT fk_cidade_pais FOREIGN KEY(pais_codigo)
        REFERENCES pais(pais_codigo)
);
