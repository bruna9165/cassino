-- use cassinoDesktop;
-- create database cassinoDesktop;

-- -- Tabela usuarios
-- CREATE TABLE usuarios (
--     id_usuario INT AUTO_INCREMENT PRIMARY KEY,
--     saldo DECIMAL(10,2) DEFAULT 0.00, 
--     nome VARCHAR(255) NOT NULL,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     cpf VARCHAR(14) UNIQUE NOT NULL,
--     data_nascimento DATE NOT NULL,
--     senha_hash VARCHAR(255) NOT NULL,
--     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );
-- INSERT INTO usuarios (nome, email, cpf, data_nascimento, senha_hash) VALUES("rafael", 'rafarafa@gmail.com', '09354233123', '1999-06-10', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
-- select * from usuarios;
-- SELECT email FROM usuarios;
-- drop table usuarios;
-- SELECT saldo
-- FROM usuarios
-- WHERE id_usuario = 1;

-- UPDATE usuarios
-- SET saldo = '20.04'
-- WHERE id_usuario = 2;

-- -- Tabela recuperacao_senha
-- CREATE TABLE recuperacao_senha (
--     id_recuperacao INT AUTO_INCREMENT PRIMARY KEY,
--     id_usuario INT NOT NULL,
--     token VARCHAR(255) NOT NULL,
--     expira_em TIMESTAMP NOT NULL,
--     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
-- );

-- -- Tabela contas
-- CREATE TABLE contas (
--     id_conta INT AUTO_INCREMENT PRIMARY KEY,
--     id_usuario INT UNIQUE NOT NULL,
--     saldo DECIMAL(10,2) DEFAULT 0.00,
--     moeda VARCHAR(3) DEFAULT 'BRL',
--     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
-- );

-- -- Tabela transacoes
-- CREATE TABLE transacoes (
--     id_transacao INT AUTO_INCREMENT PRIMARY KEY,
--     id_conta INT NOT NULL,
--     tipo ENUM('deposito', 'saque', 'aposta', 'ganho') NOT NULL,
--     valor DECIMAL(10,2) NOT NULL,
--     status ENUM('pendente', 'concluido', 'falhou') DEFAULT 'pendente',
--     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (id_conta) REFERENCES contas(id_conta) ON DELETE CASCADE
-- );

-- -- Tabela limites
-- CREATE TABLE limites (
--     id_limite INT AUTO_INCREMENT PRIMARY KEY,
--     id_usuario INT NOT NULL,
--     tipo_limite VARCHAR(50) NOT NULL,
--     valor_limite DECIMAL(10,2) NOT NULL,
--     periodo ENUM('diario', 'semanal', 'mensal') NOT NULL,
--     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
-- );

-- -- Tabela jogos
-- CREATE TABLE jogos (
--     id_jogo INT AUTO_INCREMENT PRIMARY KEY,
--     nome VARCHAR(100) NOT NULL,
--     tipo VARCHAR(50) NOT NULL,
--     aposta_min DECIMAL(10,2) NOT NULL,
--     aposta_max DECIMAL(10,2) NOT NULL,
--     descricao TEXT,
--     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Tabela apostas
-- CREATE TABLE apostas (
--     id_aposta INT AUTO_INCREMENT PRIMARY KEY,
--     id_usuario INT NOT NULL,
--     id_jogo INT NOT NULL,
--     valor DECIMAL(10,2) NOT NULL,
--     detalhes_aposta TEXT,
--     status ENUM('pendente', 'ganhou', 'perdeu') DEFAULT 'pendente',
--     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
--     FOREIGN KEY (id_jogo) REFERENCES jogos(id_jogo) ON DELETE CASCADE
-- );

-- -- Tabela resultados_jogos
-- CREATE TABLE resultados_jogos (
--     id_resultado INT AUTO_INCREMENT PRIMARY KEY,
--     id_jogo INT NOT NULL,
--     detalhes_resultado TEXT NOT NULL,
--     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (id_jogo) REFERENCES jogos(id_jogo) ON DELETE CASCADE
-- );

-- -- Tabela ganhos
-- CREATE TABLE ganhos (
--     id_ganho INT AUTO_INCREMENT PRIMARY KEY,
--     id_aposta INT NOT NULL,
--     valor DECIMAL(10,2) NOT NULL,
--     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (id_aposta) REFERENCES apostas(id_aposta) ON DELETE CASCADE
-- );



