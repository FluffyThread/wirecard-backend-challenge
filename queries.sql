-- Active: 1674140464867@@35.226.146.116@3306@jbl-4416399-leonardo-souza
CREATE TABLE clients (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  cpf VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE payments (
  id VARCHAR(255) PRIMARY KEY,
  client_id VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(50) NOT NULL,
  card_holder VARCHAR(255),
  card_number VARCHAR(50),
  card_expiration_date VARCHAR(15),
  card_cvv VARCHAR(5),
  boleto_number VARCHAR(255),
  status VARCHAR(20) DEFAULT 'PENDING',
  FOREIGN KEY (client_id) REFERENCES clients(id)
);


drop table payments;

drop table clients;