# CineComp - Catálogo de Filmes (Front-End)

O CineComp é uma aplicação web front-end desenvolvida para a gestão e consulta de catálogos de filmes, integrada à API RESTful disponibilizada pela Comp Júnior. O sistema oferece visualização pública de títulos e detalhes, além de funcionalidades completas de CRUD (Criar, Ler, Atualizar e Eliminar) protegidas por autenticação baseada em tokens JWT e gestão de acesso por rotas privadas.

---

## Tecnologias Utilizadas e Justificativas

### Front-End (Aplicação Desenvolvida)
* **React (com Vite):** Escolhido pela elevada performance no desenvolvimento, renderização eficiente via Virtual DOM e facilidade na criação de interfaces reativas em Single Page Applications (SPA).
* **Context API (`AuthContext`):** Utilizado para gerir o estado global de autenticação e sessão do utilizador de forma totalmente reativa entre todos os componentes (`Header`, `Home`, `MovieDetails`, `CreateMovie`).
* **React Router DOM:** Adotado para a gestão de rotas do lado do cliente, incluindo o controlo de rotas protegidas (`ProtectedRoute`) e navegação sem recarregamento de página.
* **Axios:** Utilizado para a integração HTTP com a API REST, configurado com intercetores para inclusão automática do token Bearer nas requisições autenticadas.
* **Lucide React:** Biblioteca de ícones vetoriais em SVG adotada para padronização visual moderna e limpa da interface.
* **CSS3 Nativo (Variables, Flexbox & CSS Grid):** Opção por CSS puro para manter a aplicação leve, garantindo total controlo sobre estilização, componentes e responsividade.

### Back-End Consumido (API Comp Júnior)
* **Node.js com Express:** API RESTful que disponibiliza os recursos de filmes e autenticação.
* **Autenticação JWT (JSON Web Tokens):** Integração com token de sessão retornado no login e exigido nas rotas de criação, edição e exclusão.
* **Endpoints REST:** Integração com as rotas `/auth/login`, `/auth/register` e `/movies`.

---

## Arquitetura de Pastas do Front-End

A aplicação segue uma estrutura de pastas organizada e modular em `src/`, facilitando a manutenção e a reutilização de código:

```text
carolina-carvalhoms-frontend-cinecomp/
├── src/
│   ├── components/     # Componentes de interface reutilizáveis (Header)
│   ├── contexts/       # Contexto global de autenticação (AuthContext)
│   ├── pages/          # Páginas/Telas principais (Home, MovieDetails, CreateMovie, Login, Register)
│   ├── routes/         # Configuração de rotas e proteção de acesso (index.jsx, ProtectedRoute.jsx)
│   ├── services/       # Cliente HTTP configurado com Axios (api.js)
│   ├── index.css       # Estilos globais, variáveis e sistema de design
│   ├── App.jsx         # Componente raiz envelopado pelo AuthProvider
│   └── main.jsx        # Ponto de entrada do React
├── public/             # Ficheiros estáticos da aplicação
├── eslint.config.js    # Configurações do Linter
├── vite.config.js      # Configurações do bundler Vite
└── package.json        # Dependências e scripts do projeto
```

---

## Funcionalidades Principais

* **Catálogo Público:** Qualquer visitante pode navegar na página inicial e visualizar a lista de filmes cadastrados.
* **Visualização Detalhada Pública:** Acesso irrestrito à página de detalhes (`/movies/:id`), permitindo a qualquer utilizador consultar sinopse, ano, realizador, género e avaliação do filme.
* **Autenticação Reativa:** Sistema de login via e-mail e palavra-passe integrado ao `AuthContext`, garantindo que os botões de ação e acesso a formulários respondam instantaneamente ao estado da sessão.
* **Rota Protegida de Cadastro (`/cadastrar-filme`):** Formulário isolado em rota própria e protegido pelo componente `ProtectedRoute`, impedindo o acesso direto não autorizado de utilizadores deslogados.
* **Edição e Exclusão Restritas:** Botões de alteração e remoção exibidos na tela de detalhes apenas quando há uma sessão ativa (`signed`).
* **Persistência Híbrida e Resiliência:** Sincronização entre as chamadas da API via Axios e o `localStorage` do navegador (`custom_movies`), garantindo a permanência e integridade dos dados cadastrados, editados ou eliminados durante a navegação.
* **Prevenção de Duplicidade:** Sistema de validação com normalização de strings (`normalizeTitle()`), impedindo a criação ou renomeação de filmes com títulos já existentes no catálogo.
* **Feedback Visual Integrado (Inline UI):** Mensagens estilizadas de erro, sucesso e estado de carregamento (`loading`/`submitting`), fornecendo retorno claro sem bloqueios do navegador.
* **Design Responsivo:** Layout adaptado para dispositivos móveis, tablets e computadores desktop.

---

## Como Executar e Testar o Projeto Localmente

### Pré-requisitos
* Node.js (versão 18 ou superior)
* npm ou yarn
* Navegador moderno

---

### 1. Executar o Back-End (API Fornecida)

1. Abra o terminal e navegue até à pasta da API fornecida:
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
   *(A API estará a ser executada no endereço `http://localhost:3000/api`).*

---

### 2. Executar o Front-End (Aplicação React)

1. Abra um segundo terminal e navegue até à pasta do Front-End:
   ```bash
   cd carolina-carvalhoms-frontend-cinecomp
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação React:
   ```bash
   npm run dev
   ```
4. Aceda ao URL informado no terminal (geralmente `http://localhost:5173`) no seu navegador.

---

## Rotas da API Consumida

| Método | Rota | Descrição | Autenticação Exigida |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Autentica o utilizador e retorna o token JWT | Não |
| `POST` | `/auth/register` | Cadastra um novo utilizador no sistema | Não |
| `GET` | `/movies` | Lista todos os filmes do catálogo | Não |
| `GET` | `/movies/:id` | Retorna os detalhes de um filme específico | Não |
| `POST` | `/movies` | Cadastra um novo filme no catálogo | **Sim (Bearer Token)** |
| `PUT` | `/movies/:id` | Atualiza os dados de um filme existente | **Sim (Bearer Token)** |
| `DELETE` | `/movies/:id` | Remove um filme do catálogo | **Sim (Bearer Token)** |

---

## Dificuldades Encontradas e Soluções

1. **Gestão Reativa de Autenticação e Proteção de Rotas:**
   * **Desafio:** Proteger rotas sensíveis contra acessos diretos por URL e garantir a atualização da interface sem necessidade de recarregar a página.
   * **Solução:** Desenvolvimento do componente `ProtectedRoute` combinado ao `AuthContext` e hook `useAuth()`, redirecionando utilizadores não autenticados e controlando a visibilidade de ações do CRUD.

2. **Persistência de Dados e Sincronização com a API:**
   * **Desafio:** Assegurar a integridade da visualização dos dados cadastrados e editados, garantindo a exibição consistente dos filmes em todas as telas.
   * **Solução:** Implementação de uma arquitetura híbrida no front-end, associando requisições HTTP do Axios com armazenamento persistente em `localStorage` (`custom_movies`), sincronizando o catálogo após operações de adição, edição ou remoção.

3. **Prevenção de Cadastros e Edições Duplicadas:**
   * **Desafio:** Impedir cadastros e edições com títulos duplicados, ignorando diferenças de maiúsculas, minúsculas, acentos ou caracteres especiais.
   * **Solução:** Criação da função de normalização `normalizeTitle()`, aplicada nas páginas de criação (`CreateMovie`) e alteração (`MovieDetails`) antes do envio dos formulários.

4. **Experiência do Utilizador (UX) e Feedback Visual:**
   * **Desafio:** Substituir alertas padrão do navegador por elementos visuais integrados ao layout.
   * **Solução:** Criação de componentes de feedback inline (banners estilizados de erro e sucesso) e inclusão da biblioteca `lucide-react` para representação visual contextualizada.

---

## Melhorias Futuras

* **Filtros e Pesquisa Avançada:** Busca por título, filtro por género e ordenação por avaliação/ano.
* **Upload de Capas:** Suporte para envio e exibição de imagens dos cartazes dos filmes.
* **Notificações Toast:** Integração de alertas temporizados e flutuantes para ações do CRUD.
* **Tema Escuro (Dark Mode):** Alternância entre temas claro e escuro armazenada nas preferências do utilizador.