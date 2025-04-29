# EstudeFlow
Software para gestão de tarefas estudantis - Projeto da Equipa 23 - UAB - Portugal

# Boas-vindas ao repositório do projeto EstudeFlow

## Do que se trata o repositório em questão?

Este repositório contém a API responsável por gerenciar as funcionalidades do sistema EstudeFlow, uma aplicação web desenvolvida para auxiliar estudantes no acompanhamento de suas tarefas acadêmicas.

O sistema segue a arquitetura MVC e expõe endpoints para cadastro e consulta de tarefas, unidades curriculares e usuários.

Funcionalidades principais:

- Cadastro e listagem de tarefas acadêmicas;

- Organização por componente curricular;

- Registro de status das tarefas (pendente, atrasada ou concluída);

- Integração com frontend para exibição dos dados no dashboard, calendário e gráfico.




A aplicação foi construída em [TypeScript](https://www.typescriptlang.org/), [node.js](https://nodejs.org/pt), [Express](https://expressjs.com/) e [Prisma ORM](https://www.prisma.io/), utilizando um banco de dado MySQL.


 <details>
  <summary><strong>📝 Os requisitos são:</strong></summary><br />

 :construction: EM CONSTRUÇÃO :construction:
</details>

## Orientações:

 <details>
  <summary><strong>👨‍💻 Antes de começar:</strong></summary><br />

 - No seu terminal, clone o repositório executando o comando: ```git clone https://github.com/IngrydCosta/EstudeFlow.git```
 - Certifique-se de ter o [node.js](https://nodejs.org/pt) instalado na sua máquina.
 - No seu terminal, execute o comando: ```cd EstudeFlow```
 - Para abrir o vs code, execute o comando ```code .```
 - Para instalar as dependencias, na raiz do projeto execute o comando: ```npm install```
 - Para configurar o banco, crie na raiz do projeto um arquivo chamado ```.env```
 - No arquivo .env use a seguinte variável: ```DATABASE_URL=seubanco://root:sua-senha@localhost:porta/nomeDoBanco```
 - Observação: configure a variável de ambiente do .env de acordo com as conexões do seu banco de dados.
 - Para gerar o banco de dados, execute o comando ```npx prisma generate```
 - Para criar o banco no seu SGBD, execute: ```npx prisma db push```
 - Para rodar a aplicação, execute: ```npm run dev```
</details>