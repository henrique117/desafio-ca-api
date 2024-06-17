# Desafio Cidade Alta FULLSTACK - API

## Deve rodar apenas 3 comandos:
* #### `npm install` - Instalar as dependências
* #### `npm run typeorm migration:run -- -d './src/db/typeOrm.migration-config.ts'` - Rodar as migrations do projeto no seu DB
* #### `npm start` - Rodar a aplicação

## .env:

#### Deixei no projeto o .env.example para ser preenchido com as informações do seu DB local, nele também tem as variáveis do JWT, para geração de token de autenticação, o 'JWT_SECRET' é uma string qualquer, literalmente, e o 'JWT_EXPIRATION_TIME' como o próprio nome diz, é o tempo da sessão do usuário logado.

### Assim que todas as informações forem preenchidas e a API inicializada, pode rodar o Front!