# Nota Técnica

## Decisões

O projeto foi separado em dois módulos: backend Spring Boot e frontend Angular. A API concentra as regras de persistência e exposição dos recursos, enquanto o Angular consome os endpoints e organiza as telas por domínio funcional.

O PostgreSQL foi escolhido para aproximar o ambiente local de um banco relacional de produção. O `docker-compose.dev.yml` sobe banco, backend e frontend para reduzir atrito na execução, além de manter rotinas simples de backup e restore para o banco local.

No backend, os recursos principais seguem a estrutura controller, service, repository, entity e DTO. O Swagger foi incluído para documentar e testar os endpoints. A consulta de CNPJ foi centralizada no backend para evitar bloqueios de CORS no navegador, manter o frontend consumindo apenas a API local e permitir cache simples de consultas repetidas.

No frontend, as páginas foram divididas por funcionalidades: dashboard, clientes, devedores, dívidas e propostas. Os formulários usam Reactive Forms para validações antes de enviar dados para a API, incluindo validação de CPF/CNPJ e consulta de CNPJ por meio do backend. As listagens possuem filtros e ordenação para facilitar a revisão dos registros. As URLs da API ficam centralizadas em `environment.ts`.

## Trade-offs

- O fluxo atual prioriza simplicidade e demonstração funcional. As respostas de erro foram padronizadas no backend e os formulários exibem mensagens visuais para campos obrigatórios e documentos inválidos.
- O CORS foi centralizado em `CorsConfig` e permite `http://localhost:4200` por padrão. Em produção, a propriedade `app.cors.allowed-origins` deve ser configurada com os domínios permitidos.
- A criação de dívidas envia cliente e devedor selecionados como objetos. Para uma API mais enxuta, o contrato poderia usar apenas `clientId` e `debtorId`.
- O endpoint legado `/api/debitors` foi mantido como alias de compatibilidade, mas o frontend passou a usar `/api/debtors`.

## Melhorias futuras

- Adicionar autenticação e autorização caso o sistema seja exposto fora do ambiente local.
