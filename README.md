# Debt Recovery Attus

Sistema para cadastro e acompanhamento de clientes, devedores, dívidas, propostas de negociação e indicadores de recuperação.

## Stack

- Backend: Java 11, Spring Boot 2.7, Spring Data JPA, Bean Validation, Springdoc OpenAPI.
- Frontend: Angular 19, Bootstrap, ng-bootstrap.
- Banco de dados: PostgreSQL 15 em Docker.

## Executando com Docker

Na raiz do projeto:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Serviços:

- Frontend: http://localhost:4200
- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/api-docs
- PostgreSQL: localhost:5432

O `docker-compose.dev.yml` também possui serviços de backup e restore do PostgreSQL. O backup é gerado em `java-web-spring-api-attus/database/backups/debt_recovery_db.backup`.

## Executando localmente

Suba o banco:

```bash
docker-compose -f docker-compose.dev.yml up postgres
```

Backend:

```bash
cd java-web-spring-api-attus
mvn spring-boot:run
```

Frontend:

```bash
cd debt-recovery-attus
npm install
npm start
```

## Endpoints principais

- `GET /api/dashboard`
- `GET /api/clients`
- `POST /api/clients`
- `PUT /api/clients/{id}`
- `DELETE /api/clients/{id}`
- `GET /api/cnpj/{cnpj}`
- `GET /api/debtors`
- `POST /api/debtors`
- `PUT /api/debtors/{id}`
- `DELETE /api/debtors/{id}`
- `GET /api/debts`
- `GET /api/debts/debtor/{id}`
- `POST /api/debts`
- `PUT /api/debts/{id}`
- `DELETE /api/debts/{id}`
- `GET /api/proposals`
- `POST /api/proposals`
- `PUT /api/proposals/{id}`
- `DELETE /api/proposals/{id}`

Observação: `/api/debitors` continua aceito como alias de compatibilidade, mas o frontend usa `/api/debtors`.

## Validação

Comandos usados para validar o projeto:

```bash
cd java-web-spring-api-attus
mvn test
```

```bash
cd debt-recovery-attus
node ./node_modules/@angular/cli/bin/ng.js build
```

```bash
cd debt-recovery-attus
node ./node_modules/@angular/cli/bin/ng.js test --watch=false --karma-config=karma.conf.js --browsers=ChromeHeadlessNoGpu
```

Na última validação local:

- Backend: 14 testes executados com sucesso.
- Frontend: 21 testes executados com sucesso.

## Funcionalidades implementadas

- Cadastro, edição, listagem e exclusão de clientes.
- Cadastro, edição, listagem e exclusão de devedores.
- Cadastro, edição, listagem e exclusão de dívidas com cliente e devedor vinculados.
- Cadastro, edição, listagem e exclusão de propostas.
- Dashboard com indicadores da carteira.
- Consulta de CNPJ via backend, evitando chamada direta do navegador para a ReceitaWS.
- Consulta de CNPJ com cache simples no backend.
- Validação de CPF/CNPJ no frontend e no backend.
- Busca de clientes por razão social ou CNPJ, com paginação real e ordenação.
- Filtros nas telas de devedores, dívidas e propostas.
- Ordenação nas telas de devedores, dívidas e propostas.
- Mensagens visuais de campos obrigatórios e documentos inválidos nos formulários.
- Respostas de erro padronizadas no backend e mensagens de falha no frontend.
- Testes unitários no frontend e backend.
- Testes de integração dos principais endpoints de criação, atualização, exclusão e falha.

## Documentação complementar

- [Nota técnica](NOTA_TECNICA.md)
- [Análise de incidente](ANALISE_INCIDENTE.md)
- [Pendencias](PENDENCIAS.md)
