# CineComp - Catálogo de Filmes Full-Stack

O **CineComp** é uma aplicação web full-stack desenvolvida para gerenciamento e consulta de catálogos de filmes. O sistema oferece visualização pública de títulos e detalhes, além de funcionalidades completas de **CRUD** (Criar, Ler, Atualizar e Eliminar) protegidas por autenticação baseada em tokens JWT.

---

## Tecnologias Utilizadas e Justificativas

### **Front-end (`Front-end Comp`)**
* **React** (com Vite): Escolhido pela alta performance no desenvolvimento, renderização eficiente via Virtual DOM e facilidade na criação de interfaces reativas em Single Page Applications (SPA).
* **Context API (`AuthContext`)**: Utilizado para gerenciar o estado global de autenticação e sessão do usuário de forma totalmente reativa entre todos os componentes (`Header`, `Home`, `MovieDetails`).
* **React Router DOM**: Adotado para o gerenciamento de rotas do lado do cliente, permitindo navegação fluida sem recarregar a página.
* **Axios**: Utilizado para a integração HTTP com a API, configurado com interceptores para inclusão automática do token Bearer e fallback seguro da URL base.
* **Lucide React**: Biblioteca de ícones vetoriais em SVG adotada para padronização visual moderna e limpa da interface.
* **CSS3 Nativo (Variables & Flexbox/Grid)**: Opção por CSS puro para manter a aplicação leve, garantindo total controle sobre a estilização, temas e responsividade.

### **Back-end (`cinecomp-api`)**
* **Node.js com Express**: Selecionado pela eficiência no tratamento de requisições assíncronas e facilidade na construção de APIs RESTful estruturadas e escaláveis.
* **JWT (JSON Web Tokens)**: Implementado para autenticação segura e controle de acesso baseado em sessão sem estado (*stateless*).
* **Bcrypt.js**: Utilizado para a criptografia (*hashing*) segura de senhas antes de serem armazenadas no banco de dados.
* **Validação e Normalização de Dados**: Lógica customizada para sanitização de entradas e prevenção de cadastros duplicados (tratando acentuação e caracteres especiais).

---

## Arquitetura de Pastas do Front-End

A aplicação segue uma estrutura de pastas organizada e lógica para facilitar a manutenção e escalabilidade:

```
Front-end Comp/
├── src/
│   ├── components/     # Componentes reutilizáveis (Ex: Header)
│   ├── contexts/       # Contexto global de autenticação (AuthContext)
│   ├── pages/          # Páginas da aplicação (Home, MovieDetails, Login, Register)
│   ├── routes/         # Configuração das rotas do React Router
│   ├── services/       # Configuração da API e requisições Axios
│   ├── index.css       # Estilos globais e sistema de design
│   ├── App.jsx         # Componente raiz envelopado pelo AuthProvider
│   └── main.jsx        # Ponto de entrada do React
├── public/             # Arquivos estáticos
├── .env                # Variáveis de ambiente (VITE_API_URL)
└── package.json        # Dependências e scripts do projeto
```

---

## Funcionalidades Principais

* **Catálogo Público:** Qualquer visitante pode navegar e visualizar os filmes cadastrados e suas sinopses.
* **Autenticação Reativa:** Autenticação via e-mail e senha integrada ao `AuthContext`, garantindo que ações privadas apareçam ou desapareçam instantaneamente ao fazer login ou logout.
* **Cadastro de Filmes (Protegido):** Formulário dinâmico exibido apenas para usuários autenticados via `useAuth()`, com validação de dados e notas de 0 a 10.
* **Edição e Exclusão (Protegido):** Alteração e remoção de filmes restritas a usuários autenticados com confirmação visual.
* **Feedback Visual Integrado (Inline UI):** Mensagens de sucesso e erro apresentadas diretamente na interface com banners estilizados, evitando popups bloqueantes do navegador.
* **Design Responsivo:** Layout adaptado para dispositivos móveis, tablets e monitores desktop com visual moderno baseado em CSS Grid dinâmico.

---

## Como Executar e Testar o Projeto Localmente

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
   *(O servidor rodará no endereço `http://localhost:3000` com endpoints em `/api`).*

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
3. Configure o arquivo `.env` na raiz do front-end:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Inicie a aplicação React:
   ```bash
   npm run dev
   ```
5. Acesse a URL informada no terminal (ex: `http://localhost:5173`) no seu navegador.

---

## Rotas da API (Endpoints)

| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Autentica o utilizador e retorna o token JWT | Não |
| `GET` | `/movies` | Lista todos os filmes do catálogo | Não |
| `GET` | `/movies/:id` | Retorna os detalhes de um filme específico | Não |
| `POST` | `/movies` | Cadastra um novo filme no catálogo | **Sim (Bearer Token)** |
| `PUT` | `/movies/:id` | Atualiza os dados de um filme existente | **Sim (Bearer Token)** |
| `DELETE`| `/movies/:id` | Remove um filme do catálogo | **Sim (Bearer Token)** |

---

## Dificuldades Encontradas e Soluções

1. **Gestão Reativa do Estado de Autenticação:**
   * *Desafio:* Garantir que formulários de cadastro e botões de ação respondessem instantaneamente ao login/logout sem depender de leitura direta do `localStorage` ou recarregamento da página.
   * *Solução:* Implementação do `AuthContext` com o hook `useAuth()`, centralizando o estado global e distribuindo a propriedade `signed` para todos os componentes (`Header`, `Home`, `MovieDetails`).
2. **Sincronização de Endpoints e Fallback de API:**
   * *Desafio:* Evitar falhas de rota caso a variável de ambiente `.env` não estivesse presente no ambiente do avaliador.
   * *Solução:* Configuração do Axios com fallback explícito apontando para `http://localhost:3000/api` e tratamento centralizado com interceptores.
3. **Experiência do Usuário (UX) e Feedback Visual:**
   * *Desafio:* Substituir os alertas nativos do navegador (`window.alert`) por um sistema visualmente integrado e fluido.
   * *Solução:* Criação de componentes de feedback inline (banners de sucesso/erro) e adoção da biblioteca `lucide-react` para ícones vetoriais.
4. **Prevenção de Cadastros Duplicados:**
   * *Desafio:* Evitar o cadastro de filmes com títulos idênticos porém com diferenças de maiúsculas, minúsculas ou acentos.
   * *Solução:* Implementação de lógica de normalização de strings para comparação de títulos antes do envio para a API.

---

## Melhorias Futuras

* **Fluxo de Recuperação de Senha:** Implementação de envio de e-mail com token temporário para redefinição de senhas esquecidas.
* **Busca e Filtros Avançados:** Filtro por gênero, ano de lançamento e ordenação por avaliação.
* **Upload de Capas/Posters:** Suporte ao upload de arquivos de imagem no cadastro do filme.
* **Notificações Toast:** Integração com bibliotecas como `sonner` para notificações flutuantes temporizadas.
* **Tema Escuro (Dark Mode):** Alternância dinâmica entre modo claro e escuro utilizando variáveis CSS e persistência da preferência do usuário.