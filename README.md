# MONITORIA-ESTRUTURADA-MSC

# Repositório de Mentoria Estruturada de Arquitetura MSC da Trybe (18/10/2023)

Este é o repositório da mentoria estruturada de 18/2023 sobre arquitetura MSC da Trybe.

## Rodando o Projeto

Para rodar o projeto, siga os seguintes passos:

   ```bash
   npm i
   docker-compose up -d
   npm run initdb
   docker exec -it TryBurger_db_api bash
   npm run debug
