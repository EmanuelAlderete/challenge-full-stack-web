# 🚀 Instruções para Rodar o Projeto

Este projeto é composto por duas aplicações: **Backend (API Node.js + Prisma)** e **Frontend (Vue 3 + Vuetify)**, integradas via Docker.

---

## 🧰 Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes softwares instalados:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🧭 Passo a Passo para Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/EmanuelAlderete/challenge-full-stack-web.git
cd challenge-full-stack-web
```

---

### 2. Verifique se as portas estão livres

O projeto utiliza as seguintes portas:

- `3000` → Backend (API)
- `5173` → Frontend (Vue + Vite)

Certifique-se de que **nenhum outro processo** está utilizando essas portas:

```bash
lsof -i :3000
lsof -i :5173
```

Se necessário, finalize os processos em conflito.

---

### 3. Suba os containers

Execute o comando abaixo para construir e iniciar todos os serviços:

```bash
docker compose up --build
```

Aguarde a finalização do build. O backend e o frontend serão iniciados automaticamente.

---

### 4. Acesse a aplicação no navegador

Abra seu navegador e acesse:

```
http://localhost:5173
```

A interface Vue estará funcionando e conectada à API.

---

## 🗂 Estrutura Esperada de Pastas

```
📦 nome-do-repositorio
 ┣ 📂 backend
 ┣ 📂 frontend
 ┣ 📄 docker-compose.yml
 ┣ 📄 README.md
```

---

## 🛠️ Dicas para Desenvolvimento

- Para visualizar os logs de forma interativa:

  ```bash
  docker compose logs -f
  ```

- Para reiniciar apenas um dos serviços:

  ```bash
  docker compose restart backend
  docker compose restart frontend
  ```

- Para acessar o shell dentro de um container:

  ```bash
  docker exec -it nome_do_container sh
  ```

> Use `docker ps` para descobrir o nome exato do container em execução.

---

## ❌ Possíveis Problemas

- **Erro de porta em uso**:

  - Libere a porta ou altere a configuração no `docker-compose.yml`.

- **Problemas com cache no Vite**:

  - Tente limpar o cache do navegador ou reiniciar o serviço do frontend.

- **Alterações no Prisma não refletidas**:

  - Lembre-se de rodar `npx prisma generate` ou reiniciar o backend.

---

## ✅ Pronto!

Se tudo estiver funcionando, você verá a aplicação web carregando em `http://localhost:5173`, com conexão ativa com a API em `http://localhost:3000`.
