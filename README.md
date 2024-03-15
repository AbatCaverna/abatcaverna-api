# abatcaverna-api

## Pré-requisitos

Antes de começar, certifique-se de atender aos seguintes requisitos:

- [Node.js](https://nodejs.org/) instalado em sua máquina
- [npm](https://www.npmjs.com/) (Gerenciador de Pacotes Node) 

## Primeiros Passos

Siga estes passos para configurar e executar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/abatcaverna/abatcaverna-api.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd abatcaverna-api
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Configure as Variáveis de Ambiente:**

   Crie um arquivo `.env` na raiz do projeto com base no modelo `.env.example` fornecido. Modifique os valores conforme necessário.

5. **Compile o código TypeScript:**

   ```bash
   npm run build
   ```

6. **Execute o aplicativo:**

   ```bash
   npm start
   ```
   O aplicativo estará acessível em [http://localhost:3333](http://localhost:3333) por padrão. Você pode modificar a porta no arquivo `.env`.

## Desenvolvimento

Para iniciar o servidor de desenvolvimento com recarregamento automático de código:

```bash
npm run dev
```

Este comando utiliza o [nodemon](https://nodemon.io/) para observar alterações nos arquivos TypeScript e reiniciar o servidor conforme necessário.

## Testes

Para executar os testes, utilize o seguinte comando:

```bash
npm test
```

## Estilo de Código

Utilizamos [ESLint](https://eslint.org/) para linting de código e [Prettier](https://prettier.io/) para formatação de código. Certifique-se de executar o seguinte comando antes de enviar uma solicitação pull:

```bash
npm run lint
```

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

## Background Jobs

Estamos usando o [agendajs](https://hokify.github.io/agenda/agenda/6.x/) para fazer as filas e os background jobs, usando como banco o mongodb.

**To-do**

- [x] Criar instancia do agenda
- [ ] Criar jobs de envio de email
  - [x] Checkout
  - [x] Novo usuario
  - [ ] Checkout com ingresso
- [ ] Criar job para criar pdf do ingresso


## Bugs e Melhorias

- [x] Remover senha do retorno da sessao
- [ ] Crud de moradores
- [ ] Remover stripe e adicionar produto no nosso banco
