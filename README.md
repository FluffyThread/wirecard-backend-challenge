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
