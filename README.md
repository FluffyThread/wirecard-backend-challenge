# PTBR/EN
# Wirecard backend challenge
Este projeto consiste em um case da [Wirecard Brasil](https://github.com/wirecardBrasil/challenge/tree/master/backend), que tem como objetivo apresentar uma solução para simular um sistema bancário de pagamentos, através de uma API Rest simples, desenvolvida utilizando TypeScript e o banco de dados MySQL.

Durante o desenvolvimento desta aplicação, foram adotadas boas práticas de programação e arquitetura de software, visando a qualidade do código e a manutenibilidade do sistema. Além disso, foram aplicados testes unitários para assegurar o correto funcionamento da lógica implementada.

## Arquitetura 🛠️

A aplicação segue uma arquitetura em camadas, divididas em:

-   Camada de dados
-   Camada de negócios
-   Camada de controle

A camada de dados é responsável pelo acesso direto aos dados da aplicação, utilizando um ORM ou um driver de banco de dados. Neste projeto, estamos usando o Knex.js como ORM.

A camada de negócios é responsável pela lógica de negócios da aplicação, que pode incluir validações, cálculos e outras operações que não estão diretamente relacionadas com o acesso aos dados.

A camada de controle é responsável por receber as requisições HTTP, chamar a camada de negócios e enviar as respostas HTTP.

## Instalação 💻

 1. Clone o repositório
 
 

> `git clone https://github.com/FluffyThread/wirecard-backend-challenge`

 2. Instale as dependências

> `npm install`

 3. Rode o código

> `npm run start`

ou

> `npm run dev`

## API 
Para utilizar a API leia e siga corretamente as instruções da documentação:

[Documentação Postman](https://documenter.getpostman.com/view/22367197/2s93Y6szAe)

#### Link do Render: 
  
https://wirecard-backend-cjallenge.onrender.com
`

## Tecnologias utilizadas: 🚀

 - Knex
 - MySQL 
 - Node.js
 - Express.js
 - Jest
 - Typescript



## Testes 🎯

Para executar os testes da aplicação, basta executar o seguinte comando:

 1. Para testes na entidade 'clients':

> `npm run test-clients`

 2. Para testes na entidade 'payment'

> `npm run test-payment`


---
---
# Wirecard Backend Challenge

This project is a Wirecard Brazil case study, which aims to present a solution to simulate a payment banking system, through a simple REST API, developed using TypeScript and the MySQL database.

During the development of this application, good programming and software architecture practices were adopted, aiming at code quality and system maintainability. In addition, unit tests were applied to ensure the correct functioning of the implemented logic.

## Architecture 🛠️

The application follows a layered architecture, divided into:

 - Data layer
 - Business layer
 - Control layer

The data layer is responsible for direct access to application data, using an ORM or a database driver. In this project, we are using Knex.js as an ORM.

The business layer is responsible for the business logic of the application, which may include validations, calculations, and other operations that are not directly related to data access.

The control layer is responsible for receiving HTTP requests, calling the business layer, and sending HTTP responses.

## Installation 💻

 1. Clone the repository

>  `git clone https://github.com/FluffyThread/wirecard-backend-challenge`

 2. Install dependencies

> `npm install`

 3. Run the code

> `npm run start`

or

> `npm run dev`


## API

To use the API, read and follow the instructions in the documentation:

[Postman Documentation](https://documenter.getpostman.com/view/22367197/2s93Y6szAe)

#### Render Link: 
  
https://wirecard-backend-cjallenge.onrender.com

## Technologies used: 🚀

 - Knex
 - MySQL
 - Node.js
 - Express.js
 - Jest
 - Typescript


## Tests 🎯

To run the application tests, simply run the following command:

 1. For tests on the 'clients' entity:

> `npm run test-clients`

 2. For tests on the 'payment' entity:

> `npm run test-payment`
