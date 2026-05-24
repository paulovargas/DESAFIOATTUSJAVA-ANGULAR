# Nota Tecnica

## Decisoes

O projeto foi separado em dois modulos: backend Spring Boot e frontend Angular. A API concentra as regras de persistencia e exposicao dos recursos, enquanto o Angular consome os endpoints e organiza as telas por dominio funcional.

O PostgreSQL foi escolhido para aproximar o ambiente local de um banco relacional de producao. O `docker-compose.dev.yml` sobe banco, backend e frontend para reduzir atrito na execucao, alem de manter rotinas simples de backup e restore para o banco local.

No backend, os recursos principais seguem a estrutura controller, service, repository, entity e DTO. O Swagger foi incluido para documentar e testar os endpoints. A consulta de CNPJ foi centralizada no backend para evitar bloqueios de CORS no navegador e manter o frontend consumindo apenas a API local.

No frontend, as paginas foram divididas por funcionalidades: dashboard, clientes, devedores, dividas e propostas. Os formularios usam Reactive Forms para validacoes antes de enviar dados para a API, incluindo validacao de CPF/CNPJ e consulta de CNPJ por meio do backend.

## Trade-offs

- O fluxo atual prioriza simplicidade e demonstracao funcional. Tratamento global de erros e mensagens detalhadas ao usuario ainda podem ser evoluidos.
- O CORS esta aberto com `@CrossOrigin(origins = "*")` para facilitar o teste local. Em producao, deve ser restrito aos dominios permitidos.
- As URLs da API estao fixas nos services Angular. Uma melhoria natural e mover para arquivos de environment.
- A criacao de dividas envia cliente e devedor selecionados como objetos. Para uma API mais enxuta, o contrato poderia usar apenas `clientId` e `debtorId`.
- O endpoint de devedores usa `/api/debitors`, nome mantido por compatibilidade com o codigo atual. Uma evolucao seria padronizar para `/api/debtors`.

## Melhorias futuras

- Adicionar `@RestControllerAdvice` para padronizar erros HTTP.
- Evoluir as validacoes Bean Validation dos DTOs para cobrir regras completas, como digitos verificadores de CPF/CNPJ.
- Adicionar logs estruturados nos services e nos fluxos de erro.
- Ampliar testes unitarios e adicionar testes de integracao cobrindo os principais cenarios de API.
- Melhorar filtros, paginacao e ordenacao das tabelas.
- Adicionar autenticacao e autorizacao caso o sistema seja exposto fora do ambiente local.
