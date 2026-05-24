# Analise de Incidente

## Cenario

Usuarios relatam erro recorrente ao cadastrar uma nova divida. A tela permite preencher descricao, valor, vencimento e status, mas o registro nao aparece na listagem apos salvar.

## Sintomas

- O clique em "Salvar" nao persiste a divida.
- A listagem permanece sem alteracao.
- No navegador, a acao aparece apenas no console local quando o formulario nao chama a API.
- No backend, nao ha requisicao `POST /api/debts` correspondente.

## Evidencias esperadas em logs

Frontend:

```text
POST http://localhost:8080/api/debts
```

Backend:

```text
Creating debt: description=<descricao>, amount=<valor>, clientId=<id>, debtorId=<id>
Debt created with id=<id>
```

Quando a requisicao nao chega ao backend, a causa esta no fluxo do frontend ou na configuracao de rede entre frontend e API.

## Causa raiz

O formulario de divida estava validando campos e montando o objeto, mas nao chamava `DebtService.create`. Assim, nenhum `POST` era enviado para a API.

Tambem havia risco de uma divida ser enviada sem cliente e devedor selecionados, impedindo um cadastro completo para o dominio de recuperacao de credito.

## Correcao aplicada

- O formulario passou a carregar clientes e devedores via services.
- Foram adicionados campos de selecao para cliente e devedor.
- O submit passou a chamar `DebtService.create`.
- Ao salvar, o modal fecha com resultado `saved`.
- A pagina recarrega a listagem quando o modal informa sucesso.

## Prevencao

- Cobrir o fluxo com teste de componente no Angular, validando que o submit chama o service.
- Cobrir `POST /api/debts` com teste de integracao no backend.
- Adicionar logs no backend para criacao, atualizacao e falhas de validacao.
- Retornar erros padronizados quando cliente ou devedor forem invalidos.

## Status atual

O cadastro de divida foi corrigido para chamar a API e recarregar a listagem apos salvar. Tambem foram adicionadas validacoes para impedir envio sem cliente ou devedor selecionado. Ainda falta um teste de integracao especifico para `POST /api/debts`, registrado em `PENDENCIAS.md`.
