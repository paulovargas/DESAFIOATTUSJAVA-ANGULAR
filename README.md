# Debt Recovery Attus

Sistema para cadastro e acompanhamento de clientes, devedores, dividas, propostas de negociacao e indicadores de recuperacao.

## Stack

- Backend: Java 11, Spring Boot 2.7, Spring Data JPA, Bean Validation, Springdoc OpenAPI.
- Frontend: Angular 19, Bootstrap, ng-bootstrap.
- Banco de dados: PostgreSQL 15 em Docker.

## Executando com Docker

Na raiz do projeto:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Servicos:

- Frontend: http://localhost:4200
- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/api-docs
- PostgreSQL: localhost:5432

O `docker-compose.dev.yml` tambem possui servicos de backup e restore do PostgreSQL. O backup e gerado em `java-web-spring-api-attus/database/backups/debt_recovery_db.backup`.

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
- `GET /api/debitors`
- `POST /api/debitors`
- `PUT /api/debitors/{id}`
- `DELETE /api/debitors/{id}`
- `GET /api/debts`
- `GET /api/debts/debtor/{id}`
- `POST /api/debts`
- `PUT /api/debts/{id}`
- `DELETE /api/debts/{id}`
- `GET /api/proposals`
- `POST /api/proposals`
- `PUT /api/proposals/{id}`
- `DELETE /api/proposals/{id}`

Observacao: o endpoint de devedores foi mantido como `/api/debitors` para compatibilidade com o codigo atual.

## Validacao

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

Na ultima validacao local:

- Backend: 6 testes executados com sucesso.
- Frontend: 23 testes executados com sucesso.

## Funcionalidades implementadas

- Cadastro, edicao, listagem e exclusao de clientes.
- Cadastro, edicao, listagem e exclusao de devedores.
- Cadastro, edicao, listagem e exclusao de dividas com cliente e devedor vinculados.
- Cadastro, edicao, listagem e exclusao de propostas.
- Dashboard com indicadores da carteira.
- Consulta de CNPJ via backend, evitando chamada direta do navegador para a ReceitaWS.
- Validacao de CPF/CNPJ no frontend e validacoes basicas no backend.
- Busca de clientes por razao social ou CNPJ.
- Testes unitarios no frontend e backend.

## Documentacao complementar

- [Nota tecnica](NOTA_TECNICA.md)
- [Analise de incidente](ANALISE_INCIDENTE.md)
- [Pendencias](PENDENCIAS.md)
