# 02 - Stack Tecnológico

## 🎯 Visão Geral

Este documento detalha todas as tecnologias utilizadas no projeto, justificando cada escolha e documentando limitações e benefícios.

> [!IMPORTANT]  
> **Todas as tecnologias listadas são 100% GRATUITAS** conforme requisito do projeto.

---

## 🌐 Frontend

### Next.js 14 (App Router)
**Versão:** 14.x  
**Licença:** MIT (Gratuita)  
**Site:** https://nextjs.org

**Por que escolhemos:**
- ✅ Framework React moderno com SSR (Server-Side Rendering)
- ✅ SEO otimizado por padrão
- ✅ File-based routing simplifica estrutura
- ✅ API Routes integradas (backend + frontend em um só)
- ✅ Excelente performance e otimizações automáticas
- ✅ Preparação para PWA (Progressive Web App)
- ✅ Facilita futura migração para React Native

**Recursos utilizados:**
- App Router (novo padrão do Next.js 14)
- Server Components para melhor performance
- Dynamic Routes para páginas de concursos
- Middleware para proteção de rotas
- Image Optimization

---

### TypeScript
**Versão:** 5.x  
**Licença:** Apache 2.0 (Gratuita)  
**Site:** https://www.typescriptlang.org

**Por que escolhemos:**
- ✅ Tipagem estática previne bugs
- ✅ Melhor IntelliSense e autocomplete
- ✅ Facilita manutenção de código
- ✅ Documentação viva através de tipos
- ✅ Refatoração mais segura

**Configuração:**
- Strict mode ativado
- Path aliases (@/ para imports limpos)
- Integração com ESLint

---

### React 18
**Versão:** 18.x  
**Licença:** MIT (Gratuita)  
**Site:** https://react.dev

**Por que escolhemos:**
- ✅ Biblioteca UI mais popular do mercado
- ✅ Ecossistema rico de componentes
- ✅ Concurrent rendering para melhor UX
- ✅ Hooks modernos para gestão de estado
- ✅ Reutilização de código com React Native

**Recursos utilizados:**
- Hooks (useState, useEffect, useCallback, useMemo)
- Context API para estado global
- Suspense para loading states
- Error Boundaries para tratamento de erros

---

### TailwindCSS
**Versão:** 3.x  
**Licença:** MIT (Gratuita)  
**Site:** https://tailwindcss.com

**Por que escolhemos:**
- ✅ Utility-first CSS produtivo
- ✅ Dark mode nativo
- ✅ Design system consistente
- ✅ Tamanho final otimizado (purge CSS)
- ✅ Responsividade fácil
- ✅ Customização completa

**Configuração:**
- Paleta de cores personalizada
- Breakpoints mobile-first
- Plugins: Typography, Forms
- Dark mode: class-based

---

## 🔧 Backend

### Next.js API Routes
**Tipo:** Backend integrado no Next.js

**Por que escolhemos:**
- ✅ Sem necessidade de servidor separado
- ✅ Deploy simplificado
- ✅ Mesma linguagem (TypeScript)
- ✅ Edge Functions na Vercel
- ✅ Serverless por padrão

**Estrutura:**
```
/app/api/
  ├── auth/          # Autenticação
  ├── concursos/     # Endpoints de concursos
  ├── questions/     # Geração de questões
  └── analysis/      # Análise de bancas
```

---

### Prisma ORM
**Versão:** 5.x  
**Licença:** Apache 2.0 (Gratuita)  
**Site:** https://www.prisma.io

**Por que escolhemos:**
- ✅ Type-safe database queries
- ✅ Migrations automáticas
- ✅ Auto-completion para queries
- ✅ Prisma Studio para visualização de dados
- ✅ Relacionamentos intuitivos
- ✅ Suporte excelente para PostgreSQL

**Recursos utilizados:**
- Schema declarativo
- Migrations versionadas
- Client auto-gerado
- Seed scripts para dados iniciais

---

### NextAuth.js
**Versão:** 4.x  
**Licença:** ISC (Gratuita)  
**Site:** https://next-auth.js.org

**Por que escolhemos:**
- ✅ Autenticação completa para Next.js
- ✅ Múltiplos providers (credentials, OAuth)
- ✅ Sessions seguras com JWT
- ✅ Callbacks customizáveis
- ✅ Middleware para proteção de rotas
- ✅ CSRF protection integrado

**Configuração:**
- Credentials provider (email/senha)
- Google OAuth (opcional)
- JWT strategy para sessions
- Database adapter com Prisma

---

## 🗄️ Banco de Dados

### Supabase (PostgreSQL)
**Tipo:** PostgreSQL as a Service  
**Tier:** Gratuito (500MB storage, 50MB file storage)  
**Site:** https://supabase.com

**Por que escolhemos:**
- ✅ PostgreSQL gratuito hospedado
- ✅ 500MB suficiente para MVP
- ✅ Backup automático
- ✅ Dashboard visual
- ✅ APIs REST/GraphQL geradas automaticamente
- ✅ Realtime subscriptions (se necessário)
- ✅ Storage para PDFs de editais

**Limitações do tier gratuito:**
- 500MB database storage
- 1GB bandwidth/mês
- 50MB file storage
- 2 projetos simultâneos

**Plano de migração (se necessário):**
- Se atingir limite: migrar para tier pago ($25/mês)
- Ou: auto-hospedar PostgreSQL (Railway, Render)

---

## 🤖 Inteligência Artificial

### Google Gemini AI
**API:** Gemini Pro  
**Tier:** Gratuito  
**Limite:** 60 requisições/minuto  
**Site:** https://ai.google.dev

**Por que escolhemos:**
- ✅ Tier gratuito generoso
- ✅ Excelente para análise de texto
- ✅ Boa performance em português
- ✅ Suporte a long-context (editais extensos)
- ✅ Sem necessidade de cartão de crédito

**Casos de uso:**
1. **Análise de Editais:** Extrair informações estruturadas
2. **Resumos Inteligentes:** Sumarizar pontos-chave
3. **Análise de Bancas:** Identificar padrões em provas
4. **Geração de Questões:** Criar questões no estilo da banca

**Limitações:**
- 60 requests/min (suficiente para MVP)
- Rate limiting pode requerer queue system
- Necessário cache agressivo

---

### Bibliotecas de NLP e Parsing

#### pdf-parse
**Versão:** 1.x  
**Licença:** MIT (Gratuita)

**Uso:** Extrair texto de PDFs de editais

#### pdfjs-dist
**Versão:** 3.x  
**Licença:** Apache 2.0 (Gratuita)

**Uso:** Renderização de PDFs no frontend

---

## 🚀 Deploy e Hospedagem

### Vercel
**Tipo:** Platform as a Service  
**Tier:** Hobby (Gratuito)  
**Site:** https://vercel.com

**Por que escolhemos:**
- ✅ Deploy automático via Git
- ✅ Otimizado para Next.js
- ✅ 100GB bandwidth/mês
- ✅ Edge Functions
- ✅ Preview deployments automáticos
- ✅ Analytics integrado
- ✅ SSL/HTTPS automático

**Limitações do tier gratuito:**
- 100GB bandwidth/mês
- 100GB-hours serverless function execution
- 6.000 build minutes/mês

**Alternativas (se necessário):**
- Netlify (similar, gratuito)
- Railway (com PostgreSQL incluído)
- Render

---

### GitHub
**Tipo:** Controle de versão  
**Tier:** Gratuito  
**Site:** https://github.com

**Funcionalidades usadas:**
- Repositório git privado/público
- Actions para CI/CD (futuro)
- Issues para tracking de bugs
- Projects para gestão de tarefas

---

## 📊 Analytics e Monitoramento

### Vercel Analytics
**Tier:** Gratuito (limitado)  
**Recursos:**
- Page views
- User sessions
- Performance metrics
- Web Vitals

### Google Analytics 4 (Opcional)
**Tier:** Gratuito  
**Recursos:**
- Eventos customizados
- User journeys
- Conversion tracking

---

## 🔐 Segurança

### bcrypt
**Tipo:** Biblioteca de hashing  
**Uso:** Hash de senhas

### jose / jsonwebtoken
**Tipo:** JWT handling  
**Uso:** Tokens de autenticação

---

## 📦 Dependências Principais

### package.json (Resumo)
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@prisma/client": "^5.0.0",
    "next-auth": "^4.24.0",
    "bcrypt": "^5.1.0",
    "@google/generative-ai": "^0.1.0",
    "pdf-parse": "^1.1.1",
    "cheerio": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "prisma": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "eslint": "^8.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0"
  }
}
```

---

## 🛠️ Ferramentas de Desenvolvimento

### VS Code
**Extensões recomendadas:**
- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### Postman / Thunder Client
**Uso:** Teste de APIs

### Prisma Studio
**Uso:** Visualização e edição de dados do banco

---

## 📱 Futuro: React Native Expo

### React Native Expo
**Versão:** SDK 50+  
**Licença:** MIT (Gratuita)  
**Site:** https://expo.dev

**Planejado para Versão 2.0:**
- ✅ Desenvolvimento híbrido iOS/Android
- ✅ Compartilhar código com web
- ✅ Over-the-air updates
- ✅ Build service gratuito (limitado)

---

## 💰 Resumo de Custos

| Serviço | Tier | Custo Mensal | Limite |
|---------|------|--------------|--------|
| Supabase | Free | R$ 0 | 500MB DB |
| Vercel | Hobby | R$ 0 | 100GB bandwidth |
| Google Gemini | Free | R$ 0 | 60 req/min |
| GitHub | Free | R$ 0 | Ilimitado |
| NextAuth | - | R$ 0 | - |
| **TOTAL** | - | **R$ 0** | - |

> [!NOTE]  
> **Todos os serviços listados são 100% gratuitos no tier usado.**

---

## 🔄 Plano de Escalabilidade

Quando os limites gratuitos forem atingidos:

1. **Supabase:** Upgrade para $25/mês (2GB storage)
2. **Vercel:** Upgrade para Pro $20/mês (1TB bandwidth)
3. **Gemini:** Implementar cache agressivo, rate limiting
4. **Alternativas:** Migrar partes para Railway, Render, AWS Free Tier

---

**Documento criado em:** 09/01/2026  
**Versão:** 1.0  
**Última revisão:** 09/01/2026
