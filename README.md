# Emprego Fácil - Plataforma de Vagas

Este é um projeto de site de vagas de emprego desenvolvido com React, Tailwind CSS e Shadcn/ui. O site permite que candidatos cadastrem seus currículos e incentiva o download do aplicativo oficial.

## 🚀 Tecnologias Utilizadas

*   **Frontend:** React 19, Wouter (Roteamento)
*   **Estilização:** Tailwind CSS 4, Shadcn/ui
*   **Build Tool:** Vite
*   **Linguagem:** TypeScript

## 📦 Como Rodar Localmente

1.  Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/emprego-facil.git
    ```
2.  Instale as dependências:
    ```bash
    npm install
    # ou
    pnpm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## 🌐 Como Fazer Deploy no Netlify

Este projeto já está configurado para deploy fácil no Netlify.

### Opção 1: Deploy via GitHub (Recomendado)

1.  Crie um repositório no GitHub e suba este código.
2.  Acesse [Netlify](https://www.netlify.com/) e faça login.
3.  Clique em **"Add new site"** > **"Import an existing project"**.
4.  Conecte com o GitHub e selecione o repositório `emprego-facil`.
5.  As configurações de build devem ser detectadas automaticamente:
    *   **Build command:** `npm run build`
    *   **Publish directory:** `dist/public`
6.  Clique em **"Deploy site"**.

### Opção 2: Deploy Manual (Drag & Drop)

1.  Rode o comando de build localmente:
    ```bash
    npm run build
    ```
2.  Uma pasta `dist` será criada na raiz do projeto.
3.  Acesse a aba **"Deploys"** no seu painel do Netlify.
4.  Arraste a pasta `dist/public` para a área de upload.

## ⚙️ Configurações Importantes

*   **Roteamento:** O arquivo `netlify.toml` na raiz garante que o roteamento SPA funcione corretamente, redirecionando todas as requisições para o `index.html`.
*   **Link do App:** O link para download do aplicativo pode ser alterado no arquivo `client/src/config.ts`.

## 📄 Estrutura do Projeto

```
/
├── client/             # Código fonte do Frontend
│   ├── src/
│   │   ├── components/ # Componentes Reutilizáveis
│   │   ├── pages/      # Páginas da Aplicação
│   │   └── ...
│   └── public/         # Assets estáticos (imagens, ícones)
├── netlify.toml        # Configuração de deploy do Netlify
└── package.json        # Dependências e scripts
```

---
Desenvolvido com ❤️ por Manus AI.
