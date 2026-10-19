# 🎬 CineComp - Catálogo de Filmes Full-Stack

O **CineComp** é uma aplicação web full-stack desenvolvida para gerenciamento e consulta de catálogos de filmes. O sistema oferece visualização pública de títulos e detalhes, além de funcionalidades completas de **CRUD** (Criar, Ler, Atualizar e Eliminar) protegidas por autenticação baseada em tokens JWT.

---

##  Tecnologias Utilizadas e Justificativas

### **Front-end (`Front-end Comp`)**
* **React** (com Vite): Escolhido pela alta performance no desenvolvimento, renderização eficiente via Virtual DOM e facilidade na criação de interfaces reativas em Single Page Applications (SPA).
* **React Router DOM**: Adotado para o gerenciamento de rotas do lado do cliente, permitindo uma navegação fluida e rápida entre telas sem recarregar a página.
* **Axios**: Utilizado para a integração HTTP com a API, facilitando a configuração centralizada da URL base e o tratamento padronizado de respostas e erros de rede.
* **CSS3 Nativo (Variables & Flexbox/Grid)**: Opção por CSS puro para manter a aplicação leve, sem dependências pesadas de frameworks UI, garantindo total controle sobre a estilização e responsividade via Media Queries.

### **Back-end (`cinecomp-api`)**
* **Node.js com Express**: Selecionado pela eficiência no tratamento de requisições assíncronas e facilidade na construção de APIs RESTful estruturadas e escaláveis.
* **JWT (JSON Web Tokens)**: Implementado para autenticação segura e controle de acesso baseado em sessão sem estado (*stateless*).
* **Bcrypt.js**: Utilizado para a criptografia (*hashing*) segura de senhas antes de serem armazenadas no banco de dados.
* **Validação e Normalização de Dados**: Lógica customizada para sanitização de entradas e prevenção de cadastros duplicados (tratando acentuação e caracteres especiais).

---

##  Arquitetura de Pastas do Front-End

A aplicação segue uma estrutura de pastas organizada e lógica para facilitar a manutenção e escalabilidade:

```
Front-end Comp/
├── src/
│   ├── components/     # Componentes reutilizáveis (Ex: Header)
│   ├── pages/          # Páginas da aplicação (Home, MovieDetails, Login)
│   ├── routes/         # Configuração das rotas com React Router
│   ├── services/       # Configuração da API e requisições Axios
│   ├── index.css       # Estilos globais e sistema de design (Tema Claro)
│   ├── App.jsx         # Componente raiz da aplicação
│   └── main.jsx        # Ponto de entrada do React
├── public/             # Arquivos estáticos
└── package.json        # Dependências e scripts do projeto
```

---

##  Funcionalidades Principais

*  **Catálogo Público:** Qualquer visitante pode navegar e visualizar os filmes cadastrados e suas sinopses.
*  **Autenticação Segura:** Autenticação de utilizadores com login via e-mail e senha, com persistência de sessão via `localStorage` e botão de logout.
*  **Cadastro de Filmes (Protegido):** Formulário dinâmico com validação contra duplicados e campos padronizados (gêneros via `datalist`, seleção de ano e nota de 0 a 10).
*  **Edição e Exclusão (Protegido):** Alteração de dados e remoção de filmes restritas a utilizadores autenticados com confirmação visual.
*  **Design Responsivo:** Layout adaptado para dispositivos móveis, tablets e monitores desktop com visual moderno em cards.
*  **Feedback Visual:** Indicadores de carregamento (*loading*) em requisições e mensagens claras de sucesso/erro.

---

##  Como Executar e Testar o Projeto Localmente

### **Pré-requisitos**
* **Node.js** (versão 18 ou superior)
* **npm** ou **yarn**
* Navegador moderno (Google Chrome, Firefox, Edge ou Safari)

---

### **1. Executando o Back-end (API)**

1. Abra um terminal e navegue até a pasta da API:
   ```bash
   cd cinecomp-api
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   *(O servidor rodará por padrão no endereço local configurado, ex: `http://localhost:3000`).*

---

### **2. Executando o Front-end (React)**

1. Abra um **segundo terminal** e navegue até a pasta do Front-end:
   ```bash
   cd "Front-end Comp"
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação React:
   ```bash
   npm run dev
   ```
4. Acesse a URL informada no terminal (ex: `http://localhost:5173`) no seu navegador.

---

##  Rotas da API (Endpoints)

| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Autentica o utilizador e retorna o token JWT | Não |
| `GET` | `/movies` | Lista todos os filmes do catálogo | Não |
| `GET` | `/movies/:id` | Retorna os detalhes de um filme específico | Não |
| `POST` | `/movies` | Cadastra um novo filme no catálogo | **Sim (Bearer Token)** |
| `PUT` | `/movies/:id` | Atualiza os dados de um filme existente | **Sim (Bearer Token)** |
| `DELETE`| `/movies/:id` | Remove um filme do catálogo | **Sim (Bearer Token)** |

---

##  Dificuldades Encontradas e Soluções

1. **Sincronização entre Front-end e Back-end:** 
   * *Desafio:* Coordenar a execução simultânea de duas aplicações em portas diferentes e gerenciar erros de conexão.
   * *Solução:* Configuração do Axios com tratamentos `try/catch` centralizados e mensagens amigáveis de erro ao usuário quando a API estiver inacessível.
2. **Prevenção de Cadastros Duplicados:**
   * *Desafio:* Evitar o cadastro de filmes com títulos idênticos porém com diferenças de maiúsculas, minúsculas ou acentos.
   * *Solução:* Implementação de uma função de normalização de strings (removendo acentos e caracteres especiais) para comparar títulos antes do envio para a API.
3. **Gestão do Estado de Autenticação:**
   * *Desafio:* Proteger ações sensíveis (criar, editar e excluir) mantendo a interface reativa.
   * *Solução:* Leitura do token no `localStorage` e renderização condicional dos botões e formulários de gestão de conteúdo.
4. **Design Responsivo e Experiência do Usuário (UX):**
   * *Desafio:* Adaptar formulários com múltiplos campos e tabelas para telas pequenas de telemóveis.
   * *Solução:* Migração do layout para CSS Grid dinâmico (`minmax`) e criação de um componente reutilizável de cabeçalho (`Header`).

---

##  Melhorias Futuras

*  **Fluxo de Recuperação de Senha:** Implementação de envio de e-mail com token temporário para redefinição de senhas esquecidas.
*  **Busca e Filtros Avançados:** Filtro por gênero, ano de lançamento e ordenação por avaliação.
*  **Upload de Capas/Posters:** Suporte ao upload de arquivos de imagem no cadastro do filme.