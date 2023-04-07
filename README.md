# abatcaverna-api

## Rotas

- [x] auth
  - manejar sessões dos usuários, armazenar JWT e criar novas sessões
- [x] produtos
  - CRUD produtos no stripe
- [ ] access
  - verifica código de acesso dos moradores
- [x] change-password
  - trocar a senha do morador
- [ ] recover-password
  - recuperar a senha do morador
- [ ] moradores
  - CRUD dos moradores
- [ ] tarefas
  - lista de tarefas no excel da rep
- [x] checkout
  - compra no stripe
- [x] webhooks
  - webhooks para verificar ações no stripe

## Boas leituras

- Boas práticas
  - [Performance](https://expressjs.com/pt-br/advanced/best-practice-performance.html)
  - [Segurança](https://expressjs.com/pt-br/advanced/best-practice-security.html)

## Stripe

Em alguma rotas é necessário uma conexão com o stripe, para isso é necessário instalar a [stripe-cli](https://stripe.com/docs/stripe-cli?locale=pt-BR).

Para iniciar ela é preciso fazer o login, com o comando ```stripe loing --api-key STRIPE_PRIVATE_KEY```.

E para iniciar a ouvir os comando deve iniciar com ```stripe listen```