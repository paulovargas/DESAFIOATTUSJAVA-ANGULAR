# Análise de Incidente

## Cenário

Usuários relatam erro recorrente ao cadastrar uma nova dívida. A tela permite preencher descrição, valor, vencimento e status, mas o registro não aparece na listagem após salvar.

## Sintomas

- O clique em "Salvar" não persiste a dívida.
- A listagem permanece sem alteração.
- No navegador, a ação aparece apenas no console local quando o formulário não chama a API.
- No backend, não há requisição `POST /api/debts` correspondente.

## Evidências esperadas em logs

Frontend:

```text
POST http://localhost:8080/api/debts
```

Backend:

```text
Creating debt: description=<descrição>, amount=<valor>, clientId=<id>, debtorId=<id>
Debt created with id=<id>
```

Quando a requisição não chega ao backend, a causa está no fluxo do frontend ou na configuração de rede entre frontend e API.

## Causa raiz

O formulário de dívida estava validando campos e montando o objeto, mas não chamava `DebtService.create`. Assim, nenhum `POST` era enviado para a API.

Também havia risco de uma dívida ser enviada sem cliente e devedor selecionados, impedindo um cadastro completo para o domínio de recuperação de crédito.

## Correção aplicada

- O formulário passou a carregar clientes e devedores via services.
- Foram adicionados campos de seleção para cliente e devedor.
- O submit passou a chamar `DebtService.create`.
- Ao salvar, o modal fecha com resultado `saved`.
- A página recarrega a listagem quando o modal informa sucesso.

## Prevencao

- Cobrir o fluxo com teste de componente no Angular, validando que o submit chama o service.
- Cobrir `POST /api/debts` com teste de integração no backend.
- Adicionar logs no backend para criação, atualização e falhas de validação.
- Retornar erros padronizados quando cliente ou devedor forem inválidos.

## Status atual

O cadastro de dívida foi corrigido para chamar a API e recarregar a listagem após salvar. Também foram adicionadas validações para impedir envio sem cliente ou devedor selecionado. O endpoint `POST /api/debts` passou a ser coberto por teste de integração no backend.
