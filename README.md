# Backend NodeJs Challenge 20201030 🏅

<p align="center">
  Projeto que obtém dados sobre diversos alimentos através da plataforma da Open Food Facts e exporta esses dados através de um CRUD API
</p>

# Tabela de conteúdos

- [Tabela de conteúdos](#tabela-de-conteúdos)
  - [⚙️ Funcionalidades](#️-funcionalidades)
  - [🚀 Como Executar o projeto](#-como-executar-o-projeto)
    - [Pré-requisitos](#pré-requisitos)
    - [🎲 Rodando a API](#-rodando-a-api)
  - [🛠 Tecnologias](#-tecnologias)
  - [👦 Autor](#-autor)
  - [📝 Licença](#-licença)

<h4 align="center"> 
  🚧 Concluído 🚀🚧
</h4>

---

## ⚙️ Funcionalidades

- [x] Informa os detalhes básicos do projeto, como tempo online do servidor, memória utilizada, tempo de execução da última CRON e o status do banco de dados
- [x] Lista todos os produtos.
- [x] Lista um produto por código
- [x] Atualiza um produto por seu código
- [x] Deleta um produto (muda seu status para 'trash')

---

## 🚀 Como Executar o projeto

### Pré-requisitos

É preciso ter instalado o [Node.js](https://nodejs.org/en/) (foi utilizado a versão 14.18.2), [Nest.js](https://nestjs.com/) e o [PostgreSQL](https://www.postgresql.org/) na sua máquina local se for desejado rodar a API localmente.

### 🎲 Rodando a API

Abra seu terminal/cmd e digite o comando abaixo:

```bash
# Clone este repositório
$ git clone git@github.com:gabbrieu/challenge20201030.git
```

Depois será necessário criar um banco de dados PostgreSQL.

Após, crie um arquivo chamado .env na raiz da pasta "challenge20201030" pelo terminal/cmd ou manualmente. Com isso, preencha-o seguindo como modelo o arquivo .env.example (as credenciais/opções do banco de dados estão definidas pelas variáveis prefixadas com TYPEORM, ou você pode utilizar as credencias default expostas no arquivo src/ormconfig.ts). Após, volte para o terminal/cmd e digite os comandos nessa ordem (levando em consideração que voçê esteja já na raiz do projeto, se não estiver a acesse pelo terminal/cmd):

```bash
# Instale as dependências
$ yarn

# Execute a aplicação
$ yarn start:dev

# O servidor inciará na porta definida no .env - acesse <http://localhost:PORT/api> lá terá a API toda documentada e pronta pra uso com o próprio Swagger seguindo a Open API 3.0.
# Mas você ainda pode utilizar o Postman e o Insomnia, ou qualquer outro se preferir.
```

Para os testes unitários rode o seguinte comando pelo terminal/cmd na pasta raíz do projeto:

```bash
$ yarn test:cov

# Para ver os detalhes dos testes o seguinte comando pode ser rodado também
$ yarn test:ver
```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Nest.js](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [class-validator](https://github.com/typestack/class-validator)
- [dotENV](https://github.com/motdotla/dotenv)

---

## 👦 Autor

<img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/73564749?s=460&u=dca37f3c329fbfd9342f541e37629f9c2747afd6&v=4" width="100px;" alt="foto perfil"/>

<sub><b>Gabriel Mendes</b></sub>

[![Linkedin Badge](https://img.shields.io/badge/-Gabriel-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabbrieu/)](https://www.linkedin.com/in/gabbrieu/) [![Gmail Badge](https://img.shields.io/badge/-gabrielhmendes@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gabrielhmendes@gmail.com)](mailto:gabrielhmendes@gmail.com)

---

## 📝 Licença

Este projeto está sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Gabriel Mendes 👋🏽 [Entre em contato!](https://www.linkedin.com/in/gabbrieu/)

---

> This is a challenge by [Coodesh](https://coodesh.com/)
