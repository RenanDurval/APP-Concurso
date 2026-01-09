# 03 - Arquitetura do Sistema

## 🏗️ Visão Geral da Arquitetura

Este documento descreve a arquitetura técnica completa do App de Concursos Públicos, incluindo fluxo de dados, componentes principais e integrações.

---

## 📐 Diagrama de Arquitetura de Alto Nível

```mermaid
graph TB
    subgraph "Frontend - Next.js"
        UI[Interface do Usuário]
        Pages[Pages/Routes]
        Components[Componentes React]
        State[Estado Global]
    end
    
    subgraph "Backend - Next.js API"
        API[API Routes]
        Auth[NextAuth.js]
        Services[Services Layer]
        AI[AI Service]
        Scraper[Web Scraper]
    end
    
    subgraph "Banco de Dados"
        DB[(Supabase PostgreSQL)]
    end
    
    subgraph "Serviços Externos"
        Gemini[Google Gemini AI]
        Sites[Sites de Concursos]
    end
    
    UI --> Pages
    Pages --> Components
    Components --> State
    Pages --> API
    
    API --> Auth
    API --> Services
    Services --> AI
    Services --> Scraper
    Services --> DB
    
    AI --> Gemini
    Scraper --> Sites
    Auth --> DB
```

---

## 🎯 Arquitetura em Camadas

### Layer 1: Presentation (Frontend)
**Responsabilidade:** Interface do usuário e experiência

**Componentes:**
- **Pages:** Rotas e páginas (/, /login, /dashboard, etc.)
- **Components:** Componentes reutilizáveis
- **Hooks:** Lógica compartilhada
- **Styles:** TailwindCSS global

**Tecnologias:**
- Next.js 14 App Router
- React 18
- TailwindCSS

---

### Layer 2: Application (Business Logic)
**Responsabilidade:** Lógica de negócio e regras

**Componentes:**
- **API Routes:** Endpoints HTTP
- **Services:** Lógica de negócio
- **Validators:** Validação de dados
- **Middlewares:** Autenticação, logging

**Tecnologias:**
- Next.js API Routes
- NextAuth.js
- Zod (validação)

---

### Layer 3: Data Access
**Responsabilidade:** Acesso e persistência de dados

**Componentes:**
- **Prisma Client:** ORM para database
- **Repositories:** Padrão repository
- **Migrations:** Versionamento de schema
- **Seeders:** Dados iniciais

**Tecnologias:**
- Prisma ORM
- PostgreSQL (Supabase)

---

### Layer 4: External Services
**Responsabilidade:** Integrações externas

**Componentes:**
- **AI Service:** Google Gemini
- **Scraper Service:** Coleta de editais
- **Storage Service:** Upload de PDFs (Supabase Storage)

---

## 🔄 Fluxo de Dados Principal

### Fluxo 1: Busca de Concurso

```mermaid
sequenceDiagram
    participant U as Usuário
    participant UI as Interface
    participant API as API Route
    participant DB as Database
    participant Cache as Cache
    
    U->>UI: Digite nome do concurso
    UI->>API: GET /api/concursos/search?q=query
    API->>Cache: Verifica cache
    
    alt Cache exists
        Cache-->>API: Retorna dados em cache
    else Cache miss
        API->>DB: Query concursos
        DB-->>API: Retorna resultados
        API->>Cache: Armazena em cache
    end
    
    API-->>UI: JSON com resultados
    UI-->>U: Exibe lista de concursos
```

---

### Fluxo 2: Análise de Edital com IA

```mermaid
sequenceDiagram
    participant U as Usuário
    participant UI as Interface
    participant API as API Analysis
    participant Perm as Check Premium
    participant DB as Database
    participant AI as Gemini AI
    
    U->>UI: Solicita análise de edital
    UI->>API: POST /api/concursos/[id]/analysis
    API->>Perm: Verifica se é premium
    
    alt Not Premium
        Perm-->>UI: 403 Forbidden
        UI-->>U: Popup upgrade
    else Is Premium
        API->>DB: Busca últimos 5 editais
        DB-->>API: Retorna editais
        API->>AI: Envia para análise
        AI-->>API: Retorna análise
        API->>DB: Salva análise
        API-->>UI: Retorna resultado
        UI-->>U: Exibe análise
    end
```

---

### Fluxo 3: Geração de Questões

```mermaid
sequenceDiagram
    participant U as Usuário
    participant UI as Interface
    participant API as Questions API
    participant DB as Database
    participant AI as Gemini AI
    
    U->>UI: Solicita questões
    UI->>API: POST /api/questions/generate
    API->>DB: Busca dados da banca
    DB-->>API: Padrões da banca
    API->>AI: Gera questões baseadas em padrões
    AI-->>API: Questões + explicações
    API->>DB: Salva questões
    DB-->>API: Confirmação
    API-->>UI: Retorna questões
    UI-->>U: Exibe questionário
```

---

## 📁 Estrutura de Diretórios

```
app-concursos/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Grupo de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Grupo autenticado
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Dashboard home
│   │   ├── concurso/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Detalhes do concurso
│   │   └── practice/
│   │       └── [concursoId]/
│   │           └── page.tsx      # Prática de questões
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   ├── concursos/
│   │   │   ├── search/
│   │   │   └── [id]/
│   │   │       ├── editais/
│   │   │       └── analysis/
│   │   └── questions/
│   │       └── generate/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Estilos globais
│
├── components/                   # Componentes React
│   ├── ui/                       # Componentes base
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── auth/
│   │   └── login-form.tsx
│   ├── concurso/
│   │   ├── search-bar.tsx
│   │   ├── edital-card.tsx
│   │   └── banca-analysis.tsx
│   └── dashboard/
│       ├── stats-card.tsx
│       └── premium-gate.tsx
│
├── lib/                          # Bibliotecas e utilitários
│   ├── db/                       # Database
│   │   ├── prisma.ts
│   │   └── repositories/
│   ├── auth/                     # Autenticação
│   │   ├── config.ts
│   │   └── helpers.ts
│   ├── ai/                       # IA Services
│   │   ├── gemini-client.ts
│   │   ├── question-generator.ts
│   │   └── edital-analyzer.ts
│   ├── scrapers/                 # Web Scrapers
│   │   ├── edital-scraper.ts
│   │   └── prova-scraper.ts
│   ├── validators/               # Validações Zod
│   │   └── schemas.ts
│   └── utils/                    # Utilitários
│       ├── format.ts
│       └── constants.ts
│
├── prisma/                       # Prisma ORM
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── public/                       # Arquivos estáticos
│   ├── images/
│   └── fonts/
│
├── documentacao-relatorios/      # Documentação
│   ├── README.md
│   ├── 01-visao-geral-projeto.md
│   └── ...
│
├── .env.local                    # Variáveis de ambiente (gitignored)
├── .env.example                  # Template de env vars
├── next.config.js                # Configuração Next.js
├── tailwind.config.ts            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
└── package.json                  # Dependências
```

---

## 🔐 Arquitetura de Autenticação

### NextAuth.js Session Flow

```mermaid
graph LR
    A[Login] --> B{Credenciais válidas?}
    B -->|Sim| C[Gera JWT Token]
    B -->|Não| D[Retorna erro]
    C --> E[Armazena session cookie]
    E --> F[Usuário autenticado]
    F --> G{Request para rota protegida}
    G --> H[Middleware verifica token]
    H -->|Válido| I[Permite acesso]
    H -->|Inválido| J[Redirect para login]
```

### Protected Routes
- **Middleware:** Verifica session antes de permitir acesso
- **Server Components:** getServerSession() para validação
- **Client Components:** useSession() hook

---

## 🗄️ Modelo de Dados (Simplificado)

```mermaid
erDiagram
    User ||--o{ UserProgress : has
    User ||--o{ Subscription : has
    Concurso ||--o{ Edital : has
    Edital }o--|| Banca : organized_by
    Edital ||--o{ Prova : has
    Prova ||--o{ Questao : contains
    Concurso ||--o{ Estatistica : has
    
    User {
        string id PK
        string email
        string password
        boolean isPremium
    }
    
    Concurso {
        string id PK
        string nome
        string orgao
        string status
    }
    
    Edital {
        string id PK
        string concursoId FK
        string bancaId FK
        date dataPublicacao
        string pdfUrl
    }
    
    Banca {
        string id PK
        string nome
    }
```

---

## 🤖 Arquitetura de IA

### Pipeline de Processamento

```mermaid
graph TD
    A[Edital PDF] --> B[PDF Parser]
    B --> C[Extração de Texto]
    C --> D[Pré-processamento]
    D --> E{Tipo de Análise}
    
    E -->|Resumo| F[Prompt de Sumarização]
    E -->|Análise Banca| G[Prompt de Padrões]
    E -->|Questões| H[Prompt de Geração]
    
    F --> I[Gemini AI]
    G --> I
    H --> I
    
    I --> J[Pós-processamento]
    J --> K[Validação]
    K --> L[(Salva no DB)]
```

### Estratégias de Otimização

1. **Cache Agressivo:**
   - Análises ficam em cache por 30 dias
   - Questões geradas são reutilizadas

2. **Rate Limiting:**
   - Máximo 10 análises/hora por usuário gratuito
   - Ilimitado para premium

3. **Queue System:**
   - Requisições pesadas vão para fila
   - Processamento assíncrono em background

---

## 🌐 Arquitetura de Scraping

### Fluxo de Coleta de Dados

```mermaid
graph LR
    A[Cron Job Diário] --> B[Scraper Service]
    B --> C{Fonte de Dados}
    
    C -->|PCI Concursos| D[Parser PCI]
    C -->|QConcursos| E[Parser Q]
    C -->|Sites Oficiais| F[Parser Oficial]
    
    D --> G[Normalização]
    E --> G
    F --> G
    
    G --> H[Validação]
    H --> I{Dados válidos?}
    
    I -->|Sim| J[(Salva DB)]
    I -->|Não| K[Log Erro]
```

### Estratégia de Scraping

- **Frequência:** Cron job diário (Vercel Cron)
- **Rate Limiting:** Respeitar robots.txt e delays
- **Fallback:** Múltiplas fontes para mesmos dados
- **Validação:** Schema validation com Zod

---

## 📊 Arquitetura de Cache

### Estratégia Multi-Layer

```mermaid
graph TD
    A[Request] --> B{Vercel Edge Cache}
    B -->|Hit| C[Retorna imediato]
    B -->|Miss| D{Redis Cache - Futuro}
    D -->|Hit| E[Retorna de Redis]
    D -->|Miss| F[Query Database]
    F --> G[Salva no Cache]
    G --> H[Retorna Resultado]
```

**Camadas:**
1. **Vercel Edge Cache:** Páginas estáticas (60s)
2. **Next.js Cache:** Dados de API (stale-while-revalidate)
3. **Banco de Dados:** Dados persistidos

**TTL (Time to Live):**
- Concursos: 1 hora
- Editais: 24 horas
- Análises de IA: 30 dias
- Questões: Permanente

---

## 🔄 Deploy e CI/CD

### Pipeline de Deploy

```mermaid
graph LR
    A[Git Push] --> B[GitHub]
    B --> C[Vercel Webhook]
    C --> D[Build Next.js]
    D --> E[Run Tests]
    E -->|Pass| F[Deploy Preview]
    F --> G{Branch?}
    G -->|main| H[Deploy Production]
    G -->|other| I[Preview URL]
```

**Ambientes:**
- **Development:** Local (npm run dev)
- **Preview:** Branch deployments automáticos
- **Production:** Branch main

---

## 🔒 Segurança

### Camadas de Segurança

1. **Autenticação:**
   - Passwords hasheados (bcrypt)
   - JWT tokens assinados
   - CSRF protection (NextAuth)

2. **Autorização:**
   - Role-based access (free/premium)
   - Middleware protection
   - API rate limiting

3. **Dados:**
   - HTTPS obrigatório (Vercel)
   - Environment variables secretas
   - SQL injection prevention (Prisma)

4. **Frontend:**
   - XSS protection (React auto-escape)
   - Content Security Policy
   - Sanitização de inputs

---

## 📈 Escalabilidade

### Estratégias Futuras

**Horizontal Scaling:**
- Serverless functions (auto-scale)
- CDN para assets estáticos
- Database read replicas (quando necessário)

**Vertical Scaling:**
- Upgrade de tiers quando limites atingidos
- Otimização de queries
- Implementação de indexes

**Monitoramento:**
- Vercel Analytics para performance
- Logs estruturados
- Error tracking (Sentry - futuro)

---

**Documento criado em:** 09/01/2026  
**Versão:** 1.0  
**Última revisão:** 09/01/2026
