<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/william-ribeiro/api-healthy-mind?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/william-ribeiro/api-healthy-mind">

  <a href="https://github.com/william-ribeiro/api-healthy-mind/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/william-ribeiro/api-healthy-mind">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/william-ribeiro/api-healthy-mind/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/william-ribeiro/api-healthy-mind?style=social">
  </a>

  <a href="https://www.gama.academy/">
    <img alt="Desafio proposto pela Gama Academy" src="https://img.shields.io/badge/proposto%20pela-Gama Academy-%237519C1">
  </a>
  
  <a href="https://www.gama.academy/gama-station">
    <img alt="NaveTeam" src="https://img.shields.io/badge/Gama-Academy-%237159c1?style=flat&logo=ghost">
    </a>
    
  <div align="center" style="margin-bottom: 20px;">
<img src="https://e3ba6e8732e83984.cdn.gocache.net/uploads/image/file/2538167/large_1921aa6c4ada2058f41bf79d80b1e22c.png" alt="" width="700" height="250"/>
</div>

</p>

<h4 align="center"> 
	🚧  API Healthy Mind 🚧
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> •  
 <a href="#-autor">Autor</a> • 
 <a href="#user-content--licença">Licença</a>
</p>

## 💻 Sobre o projeto

🚀 Healthy Mind - é a API do sistema web que visa conectar Psicólogos/Psiquiatras com seus pacientes.

A API é um desafio prosposto durante a jornada Dev For Tech proposto pela [Gama Academy](https://www.gama.academy/).

---

## ⚙️ Funcionalidades

- [V] Cadastro de profissionais:
- [V] Autenticação JWT,
- [V] Refresh token,
- [V] Cadastramento de Pacientes
- [V] Cadastramento de sessões

---

## 🚧 Requisitos para executar o projeto

- NodeJS -> [Docs](https://nodejs.org/en/docs/)
- Docker -> [Getting started](https://docs.docker.com/get-started/)
- Criar seu arquivo .env com base no .env.example

---

## 🚀 Como executar o projeto

```bash

# Clone este repositório
$ git clone git@github.com:william-ribeiro/api-healthy-mind.git

# Acesse a pasta do projeto no terminal/cmd
$ cd api-healthy-mind

# Após configurar o .env execute o comando para:
# ->instalar as dependências
# ->instanciar o servidor e banco de dados
# ->executar as migrações
# ->rodar os testes e subir o servidor
$ yarn docker:start

# Acesse o endpoint para testar a API
$ http://localhost:4000/api-docs

```

<p align="center">
  <a href="https://github.com/william-ribeiro/api-healthy-mind/blob/develop/Insomnia_api_collection.yaml" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

---

## 🛠 Tecnologias

Foi utilizado na aplicação as seguintes tecnologias

##### [](https://github.com/william-ribeiro/api-healthy-mind#backend-nodejs--typescript)**Backend** ([NodeJS](https://nodejs.org/en/) + [TypeScript](https://www.typescriptlang.org/))

- **[Express](https://expressjs.com/)**
- **[Typeorm](https://typeorm.io/#/)**
- **[Jest](https://jestjs.io/pt-BR/)**
- **[Docker](v)**
- **[JWT](https://jwt.io/)**
- **[UUID](https://www.uuidgenerator.net/)**

---

## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
   > Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://docs.github.com/pt/get-started/quickstart/contributing-to-projects)

---

## 🦸 Autor

<a href="https://github.com/william-ribeiro/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/60985185?s=460&u=389f6878e2b972d3f66348a698c7ecfbbb245582&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>William Ribeiro</b></sub></a> <a href="https://blog.rocketseat.com.br/author/thiago/" title="AlunoRocketseat">🚀</a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-William-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/william-ribeiro-0b5ab911a/)](https://www.linkedin.com/in/william-ribeiro-0b5ab911a/)
[![Gmail Badge](https://img.shields.io/badge/-sbrdigital15@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:sbrdigital15@gmail.com)](mailto:sbrdigital15@gmail.com)

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

---
