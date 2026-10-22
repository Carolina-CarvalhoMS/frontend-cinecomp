# CineComp - Catálogo de Filmes Full-Stack

O CineComp é uma aplicação web full-stack desenvolvida para a gestão e consulta de catálogos de filmes. O sistema oferece visualização pública de títulos e detalhes, além de funcionalidades completas de CRUD (Criar, Ler, Atualizar e Eliminar) protegidas por autenticação baseada em tokens JWT e gestão de acesso por rotas dedicadas.

---

## Tecnologias Utilizadas e Justificativas

### Front-end (Front-end Comp)
* **React (com Vite):** Escolhido pela elevada performance no desenvolvimento, renderização eficiente via Virtual DOM e facilidade na criação de interfaces reativas em Single Page Applications (SPA).
* **Context API (AuthContext):** Utilizado para gerir o estado global de autenticação e sessão do utilizador de forma totalmente reativa entre todos os componentes (Header, Home, MovieDetails, CreateMovie).
* **React Router DOM:** Adotado para a gestão de rotas do lado do cliente, incluindo o controlo de rotas protegidas (ProtectedRoute) e navegação sem recarregamento de página.
* **Axios:** Utilizado para a integração HTTP com a API, configurado com intercetores para inclusão automática do token Bearer e fallback seguro da URL base.
* **Lucide React:** Biblioteca de ícones vetoriais em SVG adotada para padronização visual moderna e limpa da interface.
* **CSS3 Nativo (Variables & Flexbox/Grid):** Opção por CSS puro para manter a aplicação leve, garantindo total controlo sobre a estilização, temas e responsividade.

### Back-end (cinecomp-api)
* **Node.js com Express:** Selecionado pela eficiência no tratamento de requisições assíncronas e facilidade na construção de APIs RESTful estruturadas e escaláveis.
* **JWT (JSON Web Tokens):** Implementado para autenticação segura e controlo de acesso baseado em sessão sem estado (stateless).
* **Bcrypt.js:** Utilizado para a criptografia (hashing) segura de palavras-passe antes de serem armazenadas na base de dados.
* **Validação e Normalização de Dados:** Lógica customizada para higienização de entradas e prevenção de cadastros e edições duplicadas.

---

## Arquitetura de Pastas do Front-End

A aplicação segue uma estrutura de pastas organizada e lógica para facilitar a manutenção e escalabilidade:

```text
Front-end Comp/
├── src/
│   ├── components/     # Componentes reutilizáveis (Header, ProtectedRoute)
│   ├── contexts/       # Contexto global de autenticação (AuthContext)
│   ├── pages/          # Páginas da aplicação (Home, MovieDetails, CreateMovie, Login)
│   ├── routes/         # Configuração das rotas do React Router
│   ├── services/       # Configuração da API e requisições Axios (api.js)
│   ├── index.css       # Estilos globais e sistema de design
│   ├── App.jsx         # Componente raiz com roteamento e AuthProvider
│   └── main.jsx        # Ponto de entrada do React
├── public/             # Ficheiros estáticos
├── .env                # Variáveis de ambiente (VITE_API_URL)
└── package.json        # Dependências e scripts do projeto
```

---

## Funcionalidades Principais

* **Catálogo Público:** Qualquer visitante pode navegar na página inicial e visualizar a lista de filmes cadastrados.
* **Visualização Detalhada Pública:** Acesso irrestrito à página de detalhes (/movies/:id), permitindo que qualquer utilizador leia a sinopse, ano, realizador, género e nota dos filmes.
* **Autenticação Reativa:** Autenticação via e-mail e palavra-passe integrada ao AuthContext, garantindo que botões de ação e acesso a formulários responda instantaneamente ao login ou logout.
* **Rota Protegida de Cadastro (/cadastrar-filme):** Formulário isolado em rota própria e envolvido por ProtectedRoute, impedindo o acesso não autorizado de utilizadores deslogados.
* **Edição e Exclusão Restritas:** Botões de alteração e remoção exibidos dinamicamente no ecrã de detalhes apenas quando há uma sessão ativa (signed).
* **Persistência Híbrida de Dados:** Sincronização entre as chamadas da API via Axios e o localStorage do navegador, garantindo a permanência dos dados cadastrados, editados ou eliminados mesmo após recarregamentos de página ou encerramento de sessão.
* **Prevenção de Duplicidade no Cadastro e Edição:** Sistema de validação rigoroso com normalização de strings, impedindo a criação ou renomeação de filmes com títulos já existentes no catálogo.
* **Feedback Visual Integrado (Inline UI):** Banners estilizados de sucesso e erro na interface, fornecendo retorno imediato ao utilizador sem a utilização de janelas de aviso bloqueantes do navegador.
* **Design Responsivo:** Layout adaptado para dispositivos móveis, tablets e monitores desktop utilizando CSS Grid e Flexbox.

---

## Como Executar e Testar o Projeto Localmente

### Pré-requisitos
* Node.js (versão 18 ou superior)
* npm ou yarn
* Navegador moderno (Google Chrome, Firefox, Edge ou Safari)

---

### 1. Executar o Back-end (API)

1. Abra um terminal e navegue até à pasta da API:
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
   *(O servidor será executado no endereço `http://localhost:3000` com endpoints em `/api`).*

---

### 2. Executar o Front-end (React)

1. Abra um segundo terminal e navegue até à pasta do Front-end:
   ```bash
   cd "Front-end Comp"
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o ficheiro `.env` na raiz do front-end:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Inicie a aplicação React:
   ```bash
   npm run dev
   ```
5. Aceda ao URL informado no terminal (ex: `http://localhost:5173`) no seu navegador.

---

## Rotas da API (Endpoints)

| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Autentica o utilizador e retorna o token JWT | Não |
| `GET` | `/movies` | Lista todos os filmes do catálogo | Não |
| `GET` | `/movies/:id` | Retorna os detalhes de um filme específico | Não |
| `POST` | `/movies` | Cadastra um novo filme no catálogo | **Sim (Bearer Token)** |
| `PUT` | `/movies/:id` | Atualiza os dados de um filme existente | **Sim (Bearer Token)** |
| `DELETE` | `/movies/:id` | Remove um filme do catálogo | **Sim (Bearer Token)** |

---

## Dificuldades Encontradas e Soluções

1. **Gestão Reativa de Autenticação e Proteção de Rotas:**
   * **Desafio:** Garantir que a rota de criação de filmes estivesse protegida contra acessos diretos via URL por utilizadores não autenticados e que os botões de ação respondessem ao login/logout.
   * **Solução:** Implementação do componente `ProtectedRoute` combinado ao `AuthContext` e hook `useAuth()`, redirecionando tentativas não autorizadas e gerindo o acesso a rotas privadas.

2. **Persistência de Dados e Resiliência contra Limitações de API:**
   * **Desafio:** Garantir que os filmes cadastrados, editados ou eliminados permanecessem visíveis de forma consistente em todos os ecrãs (público e privado) mesmo quando a API operava de forma não persistente.
   * **Solução:** Desenvolvimento de uma estratégia híbrida no front-end, combinando as requisições HTTP do Axios com armazenamento persistente em `localStorage` (`custom_movies`), mantendo a sincronização do catálogo em todas as navegações e atualizações de página.

3. **Prevenção de Cadastros e Edições Duplicadas:**
   * **Desafio:** Evitar o cadastro ou a edição de filmes que gerassem títulos duplicados no catálogo, ignorando variações de maiúsculas, minúsculas, acentos ou pontuações.
   * **Solução:** Criação da função `normalizeTitle()`, aplicada tanto no fluxo de cadastro (`/cadastrar-filme`) quanto no formulário de edição (`MovieDetails`), validando a lista completa antes de efetuar a gravação.

4. **Resolução de Cache do Navegador (HTTP 304):**
   * **Desafio:** O navegador mantinha em memória cache respostas antigas de `GET /movies`, impedindo a atualização imediata da interface ao navegar entre ecrãs.
   * **Solução:** Adição de parâmetros dinâmicos de timestamp/aleatoriedade nas requisições e configuração de cabeçalhos de controlo de cache (`Cache-Control`, `Pragma`, `If-None-Match`) nas chamadas do Axios.

5. **Experiência do Utilizador (UX) e Feedback Visual:**
   * **Desafio:** Substituir avisos nativos do navegador (`window.alert`) por um sistema visualmente integrado e não intrusivo.
   * **Solução:** Criação de componentes de feedback inline (banners estilizados de erro e sucesso) e integração da biblioteca `lucide-react` para sinalização com ícones.

---

## Melhorias Futuras

* **Fluxo de Recuperação de Palavra-Passe:** Implementação de envio de e-mail com token temporário para redefinição de palavras-passe esquecidas.
* **Busca e Filtros Avançados:** Filtro por género, ano de lançamento, realizador e ordenação por avaliação.
* **Upload de Capas/Cartazes:** Suporte ao envio de ficheiros de imagem no formulário de cadastro do filme.
* **Notificações Toast:** Integração com bibliotecas flutuantes temporizadas (como `sonner`) para confirmações de ações.
* **Tema Escuro (Dark Mode):** Alternância dinâmica entre modo claro e escuro utilizando variáveis CSS e persistência da preferência do utilizador.