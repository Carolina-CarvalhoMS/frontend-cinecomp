# CineComp - Catálogo de Filmes Full-Stack

O CineComp é uma aplicação web full-stack desenvolvida para gerenciamento e consulta de catálogos de filmes. O sistema oferece visualização pública de títulos e detalhes, além de funcionalidades completas de CRUD (Criar, Ler, Atualizar e Eliminar) protegidas por autenticação baseada em tokens JWT.

## Tecnologias Utilizadas e Justificativas

### Front-end (Front-end Comp)

* **React (com Vite):** Escolhido pela alta performance no desenvolvimento, renderização eficiente via Virtual DOM e facilidade na criação de interfaces reativas em Single Page Applications (SPA).

* **React Router DOM:** Adotado para o gerenciamento de rotas do lado do cliente e implementação de rotas protegidas, permitindo uma navegação fluida sem recarregar a página.

* **Context API (AuthContext):** Implementada para o gerenciamento de estado global de autenticação, mantendo a sessão do usuário sincronizada entre componentes e reativa a ações de login e logout.

* **Axios:** Utilizado para a integração HTTP com a API, facilitando a configuração centralizada da URL base via variáveis de ambiente e o envio automático do token JWT via interceptors.

* **Lucide React:** Biblioteca de ícones vetoriais adotada para padronização visual da interface de usuário em substituição aos emojis nativos.

* **CSS3 Nativo (Variables & Flexbox/Grid):** Opção por CSS puro para manter a aplicação leve, sem dependências pesadas de frameworks UI, garantindo total controle sobre a estilização e responsividade via Media Queries.

### Back-end (cinecomp-api)

* **Node.js com Express:** Selecionado pela eficiência no tratamento de requisições assíncronas e facilidade na construção de APIs RESTful estruturadas e escaláveis.

* **JWT (JSON Web Tokens):** Implementado para autenticação segura e controle de acesso baseado em sessão sem estado (stateless).

* **Bcrypt.js:** Utilizado para a criptografia (hashing) segura de senhas antes de serem armazenadas no banco de dados.

* **Validação e Normalização de Dados:** Lógica customizada para sanitização de entradas e prevenção de cadastros duplicados (tratando acentuação e caracteres especiais).

## Arquitetura de Pastas do Front-End

A aplicação segue uma estrutura de pastas organizada e lógica para facilitar a manutenção e escalabilidade:

```
Front-end Comp/
├── src/
│   ├── components/     # Componentes reutilizáveis (Header, Card, etc.)
│   ├── contexts/       # Gerenciamento de estado global (AuthContext)
│   ├── pages/          # Páginas da aplicação (Home, MovieDetails, Login, Register)
│   ├── routes/         # Configuração de rotas e rotas protegidas (index, ProtectedRoute)
│   ├── services/       # Configuração da API e requisições Axios
│   ├── index.css       # Estilos globais e sistema de design (Tema Claro)
│   ├── App.jsx         # Componente raiz com provedores de contexto
│   └── main.jsx        # Ponto de entrada do React
├── .env                # Variáveis de ambiente (URL da API)
├── public/             # Arquivos estáticos
└── package.json        # Dependências e scripts do projeto

```

## Funcionalidades Principais

* **Catálogo Público:** Qualquer visitante pode navegar e visualizar os filmes cadastrados, buscar por título ou diretor e ler sinopses.

* **Autenticação Global e Persistente:** Autenticação de usuários com login via e-mail e senha gerenciada pelo AuthContext, com persistência segura no localStorage e encerramento de sessão reativo.

* **Rotas Protegidas:** Componente ProtectedRoute responsável por impedir o acesso direto via URL a páginas restritas para usuários não autenticados.

* **Cadastro de Filmes (Protegido):** Formulário dinâmico com validação contra duplicados e campos padronizados (gêneros via datalist, seleção de ano e nota de 0 a 10).

* **Edição e Exclusão (Protegido):** Alteração de dados e remoção de filmes restritas a usuários autenticados com confirmação e atualização imediata no estado da aplicação.

* **Design Responsivo e Iconografia:** Layout adaptado para dispositivos móveis, tablets e computadores, utilizando ícones vetoriais profissionais da biblioteca Lucide React.

* **Feedback Visual:** Indicadores de carregamento (loading) em requisições e mensagens claras de sucesso ou erro no envio de dados.

## Como Executar e Testar o Projeto Localmente

### Pré-requisitos

* **Node.js** (versão 18 ou superior)

* **npm** ou **yarn**

* Navegador moderno (Google Chrome, Firefox, Edge ou Safari)

### 1. Executando o Back-end (API)

1. Abra um terminal e navegue até a pasta da API:

   ```
   cd cinecomp-api
   
   ```

2. Instale as dependências:

   ```
   npm install
   
   ```

3. Inicie o servidor em modo de desenvolvimento:

   ```
   npm run dev
   
   ```

   *(O servidor rodará por padrão no endereço `http://localhost:3000`).*

### 2. Executando o Front-end (React)

1. Abra um **segundo terminal** e navegue até a pasta do Front-end:

   ```
   cd "Front-end Comp"
   
   ```

2. Instale as dependências:

   ```
   npm install
   
   ```

3. Crie um arquivo `.env` na raiz da pasta do Front-end contendo:

   ```
   VITE_API_URL=http://localhost:3000/api
   
   ```

4. Inicie a aplicação React:

   ```
   npm run dev
   
   ```

5. Acesse a URL informada no terminal (ex: `http://localhost:5173`) no seu navegador.

## Rotas da API (Endpoints)

| **Método** | **Rota** | **Descrição** | **Autenticação** | 
| `POST` | `/auth/login` | Autentica o usuário e retorna o token JWT | Não | 
| `POST` | `/auth/register` | Cadastra um novo usuário no sistema | Não | 
| `GET` | `/movies` | Lista todos os filmes do catálogo | Não | 
| `GET` | `/movies/:id` | Retorna os detalhes de um filme específico | Não | 
| `POST` | `/movies` | Cadastra um novo filme no catálogo | **Sim (Bearer Token)** | 
| `PUT` | `/movies/:id` | Atualiza os dados de um filme existente | **Sim (Bearer Token)** | 
| `DELETE` | `/movies/:id` | Remove um filme do catálogo | **Sim (Bearer Token)** | 

## Dificuldades Encontradas e Soluções

1. **Gerenciamento do Estado Global de Autenticação:**

   * *Desafio:* Sincronizar o estado de login e logout entre diferentes componentes (como o Header e as telas de login/cadastro) sem exigir recarregamento da página.

   * *Solução:* Criação de um provedor global de contexto (`AuthContext`) que armazena os dados do usuário e token em memória e sincroniza com o `localStorage`.

2. **Proteger Rotas e Ações Privadas:**

   * *Desafio:* Garantir que usuários não autenticados não consigam acessar formulários de criação/edição via digitação direta na URL do navegador.

   * *Solução:* Implementação do componente wrapper `ProtectedRoute` que avalia a autenticação do contexto e redireciona usuários não logados automaticamente para a tela de login.

3. **Configuração de Ambientes e Integração com a API:**

   * *Desafio:* Evitar o uso de URLs de servidor fixas no código-fonte e garantir o correto mapeamento dos prefixos de rotas (ex: `/api` e `/auth/login`).

   * *Solução:* Centralização do endereço base da API em arquivo de variáveis de ambiente (`.env`) lido nativamente pelo Vite e consumido na instância do Axios.

4. **Prevenção de Cadastros Duplicados:**

   * *Desafio:* Evitar o cadastro de filmes com títulos idênticos, porém com diferenças de maiúsculas, minúsculas ou acentos.

   * *Solução:* Implementação de uma função de normalização de strings (removendo acentos e caracteres especiais) para comparar títulos antes do envio para a API.

5. **Padronização Visual e Experiência do Usuário (UX):**

   * *Desafio:* Substituir ícones genéricos e emojis nativos do sistema operacional por um design limpo e consistente entre navegadores.

   * *Solução:* Integração da biblioteca de ícones em vetor `lucide-react` combinada com variáveis CSS globais no arquivo `index.css`.

## Melhorias Futuras

* **Fluxo de Recuperação de Senha:** Implementação de envio de e-mail com token temporário para redefinição de senhas esquecidas.

* **Busca e Filtros Avançados:** Adição de filtros por gênero, intervalo de anos de lançamento e ordenação por nota.

* **Upload de Capas/Posters:** Suporte ao upload de arquivos de imagem no cadastro e exibição das capas no catálogo.

* **Tema Escuro (Dark Mode):** Alternância dinâmica entre modo claro e escuro utilizando variáveis CSS e persistência da preferência do usuário.