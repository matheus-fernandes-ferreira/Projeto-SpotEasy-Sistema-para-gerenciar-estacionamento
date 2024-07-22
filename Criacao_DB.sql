-- cria banco de dados no postegrees
create database SpotEasy_DB;

CREATE TABLE cliente
(
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(50),
    telefone VARCHAR(15) NOT NULL
);

CREATE TABLE Veiculo
(
    placa CHAR(7) PRIMARY KEY,
    modelo VARCHAR(20),
    cor CHAR(15),
    tipo_veiculo VARCHAR(15) NOT NULL
);

CREATE TABLE Vaga
(
    numero_vaga INT PRIMARY KEY,
    tipo varchar(20) NOT NULL,
    disponibilidade varchar(10)
);

CREATE TABLE Entrada
(
    id_entrada SERIAL PRIMARY KEY,
    data_entrada DATE NOT NULL,
    hora_entrada TIME NOT NULL,
    numero_vaga INT NOT NULL,
    FOREIGN KEY (numero_vaga) REFERENCES Vaga(numero_vaga)
);

CREATE TABLE Pagamento
(
    id_pagamento SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    placa CHAR(7) NOT NULL,
    data_pagamento DATE NOT NULL,
    hora_pagamento TIME NOT NULL,
    tarifa DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (placa) REFERENCES Veiculo(placa)
);

CREATE TABLE Saida
(
    id_saida INT PRIMARY KEY,
    id_cliente INT,
    data_saida DATE,
    hora_saida TIME,
    tempo_permanencia TIME,
    id_pagamento INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_pagamento) REFERENCES Pagamento(id_pagamento)
);












-- Cria banco de dados no sql server
-- create database DB_SpotEasy;
-- USE DB_SpotEasy;

-- CREATE TABLE Cliente (
--     id_cliente INT PRIMARY KEY IDENTITY(1,1),
--     nome NVARCHAR(100) NOT NULL,
--     cpf NVARCHAR(15) NOT NULL UNIQUE,
--     email NVARCHAR(50),
--     telefone NVARCHAR(15) NOT NULL
-- );

-- CREATE TABLE Veiculo (
--     placa CHAR(7) PRIMARY KEY,
--     modelo NVARCHAR(20),
--     cor CHAR(15),
--     tipo_veiculo NVARCHAR(15) NOT NULL
-- );

-- CREATE TABLE Vaga (
--     numero_vaga INT PRIMARY KEY,
--     tipo nvarchar(20) NOT NULL,
--     disponibilidade nvarchar(10)
-- );

-- CREATE TABLE Entrada (
--     id_entrada INT PRIMARY KEY IDENTITY(1,1),
--     data_entrada DATE NOT NULL,
--     hora_entrada TIME NOT NULL,
--     numero_vaga INT NOT NULL,
-- 	FOREIGN KEY (numero_vaga) REFERENCES Vaga(numero_vaga)
-- 	);

-- CREATE TABLE Pagamento (
--     id_pagamento INT PRIMARY KEY IDENTITY(1,1),
--     id_cliente INT NOT NULL,
-- 	placa CHAR(7) NOT NULL,
-- 	data_pagamento DATE NOT NULL,
--     hora_pagamento TIME NOT NULL,
--     tarifa DECIMAL(5,2) NOT NULL
-- 	FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
-- 	FOREIGN KEY (placa) REFERENCES Veiculo(placa)
-- );

-- CREATE TABLE Saida (
--     id_saida INT PRIMARY KEY,
--     id_cliente INT,
--     data_saida DATE,
--     hora_saida TIME,
--     tempo_permanencia TIME,
--     id_pagamento INT,
-- 	FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
-- 	FOREIGN KEY (id_pagamento) REFERENCES Pagamento(id_pagamento)
-- );