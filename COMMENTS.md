# 📐 Modelo de Decisão de Arquitetura

Este documento descreve as decisões arquiteturais adotadas nos projetos **backend** e **frontend**, com base nas dependências utilizadas e na organização modular do código.

---

## 🧱 Backend

### 🧩 Estilo Arquitetural

Adota-se uma **arquitetura modular em camadas**, inspirada na **Clean Architecture**, com foco em:

- **Separação de responsabilidades** entre controladores, regras de negócio e persistência
- **Modularização por contexto de domínio** (ex: `students`, `users`)
- **Testabilidade** com pastas dedicadas a testes unitários por módulo
- **Organização escalável**, ideal para projetos em crescimento
- **Facilidade de manutenção e leitura**

---

### 🗂️ Organização Modular

Cada domínio funcional (como `students` ou `users`) segue esta estrutura:

- `controllers/`: recebem a requisição e acionam o caso de uso apropriado.
- `useCases/`: encapsulam a lógica de negócio.
- `repositories/`: implementam acesso ao banco de dados via Prisma.
- `dtos/`: definem os contratos de dados de entrada/saída.
- `routes/`: expõem os endpoints HTTP e aplicam middlewares.
- `__tests__/`: testes focados por domínio, reforçando a separação de responsabilidades.

Além disso, uma pasta `shared/` centraliza configurações (`config/`), tratamento de erros, tipagens globais e utilitários, promovendo **reuso e padronização**.

---

### 🛠️ Tecnologias e Boas Práticas

- **Express + Prisma** para desenvolvimento de APIs.
- **Zod** para validações robustas e tipadas.
- **Winston** para logging centralizado com arquivos em `logs/`.
- **JWT + Bcryptjs + Helmet** para segurança e autenticação.
- **Docker** e `.env` para configuração e deploy consistentes.
- **Testes com Jest**, organizados por domínio.
- **Padrões SOLID**, DRY e SRP bem aplicados.

---

## 🎨 Frontend

### 🧩 Estilo Arquitetural

A aplicação frontend adota a **arquitetura baseada em componentes** do Vue 3, com:

- **Vue Router** para gerenciamento de rotas
- **Vuetify** como framework de UI (Material Design)
- **Validações reativas** com `Vee-Validate` e `Zod`
- **Máscaras de input** com `maska`

Essa abordagem garante:

- Alta coesão e reutilização de componentes
- Integração clara com o backend via contratos validados (Zod)
- Validações do frontend espelhando as regras de negócio do backend

---

## ✅ Considerações Finais

A arquitetura adotada demonstra:

- Clareza e organização por domínio
- Uso eficaz de validações, autenticação e segurança
- Excelente base para escalabilidade, manutenção e testes

### 🔄 Possíveis Evoluções Futuras

- Documentação automática da API com Swagger
- Integração de filas e jobs com BullMQ
- Monitoramento com Prometheus/Grafana
- Cache com Redis
