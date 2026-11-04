# JobFinder

O JobFinder é um projeto em desenvolvimento com a proposta de ser um portal para ajudar programadores a encontrar vagas de trabalho.

## Estado atual

Até o momento, o projeto conta com:

- Páginas HTML para a tela inicial e o formulário de cadastro de vagas (`index.html` e `add.html`), com estilos em `public/css/styles.css`.
- Um servidor feito com Node.js e Express, que disponibiliza os arquivos estáticos e atende as rotas da aplicação.
- Uma rota de teste em `/jobs/test` e uma rota POST em `/jobs/add` para receber os dados de uma vaga.
- Um modelo de vaga com campos para título, descrição, salário, empresa, e-mail e indicação de vaga nova.
- Configuração do Sequelize para usar SQLite. O arquivo do banco local fica em `db/app.db` e não deve ser enviado ao GitHub.

O projeto ainda está em fase inicial: as funcionalidades e a interface poderão mudar conforme o desenvolvimento avançar.

## Requisitos

- Node.js e npm instalados.

## Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura principal

```text
.
├── app.js              # Inicialização do servidor Express
├── index.html          # Página inicial
├── add.html            # Página de cadastro de vaga
├── routes/jobs.js      # Rotas relacionadas a vagas
├── models/job.js       # Modelo de vaga
├── db/connection.js    # Conexão com SQLite
└── public/             # CSS e imagens
```

## Atualizações

Este README descreve o estado atual do projeto e será atualizado conforme novas funcionalidades e melhorias forem adicionadas ao JobFinder.
