# App de Concursos Públicos

Plataforma web inteligente para preparação em concursos públicos brasileiros, com análise de editais, geração de questões por IA e estatísticas completas.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização moderna
- **Prisma** - ORM para banco de dados
- **Supabase** - PostgreSQL hospedado
- **NextAuth.js** - Autenticação
- **Google Gemini AI** - Análise e geração de conteúdo

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- API Key do Google Gemini (gratuita)

## 🛠️ Instalação

1. **Clone o repositório** (ou baixe os arquivos)

```bash
git clone <seu-repo>
cd app-concursos
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite `.env.local` e adicione suas credenciais:

```env
DATABASE_URL="sua-url-do-supabase"
NEXTAUTH_SECRET="gere-um-secret-aleatorio"
GOOGLE_GEMINI_API_KEY="sua-chave-do-gemini"
```

4. **Configure o banco de dados**

Siga o guia completo: [📖 Setup do Supabase](./documentacao-relatorios/04-setup-supabase.md)

**Resumo rápido:**
- Crie conta gratuita no https://supabase.com
- Crie um novo projeto
- Copie a connection string
- Cole no `.env.local` como `DATABASE_URL`

Então execute:

```bash
# Gerar Prisma Client
npm run db:generate

# Criar tabelas no banco
npm run db:push

# Popular com dados de exemplo
npx prisma db seed
```

5. **Rode o projeto**

```bash
npm run dev
```

Acesse http://localhost:3000

## 📁 Estrutura do Projeto

```
app-concursos/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Landing page
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
├── lib/                   # Bibliotecas e utilitários
├── prisma/               # Schema e migrations
├── documentacao-relatorios/  # Documentação do projeto
└── public/               # Arquivos estáticos
```

## 📚 Documentação Completa

Veja a pasta `documentacao-relatorios/` para:

- Visão geral do projeto
- Arquitetura do sistema
- Stack tecnológico detalhado
- Fluxos de dados
- Relatórios de desenvolvimento

## 🎯 Funcionalidades

### Gratuitas
- ✅ Busca de concursos
- ✅ Visualização de editais
- ✅ Estatísticas básicas
- ✅ Identificação de bancas

### Premium
- ⭐ Análise completa de bancas
- ⭐ Geração ilimitada de questões com IA
- ⭐ Resumos inteligentes de editais
- ⭐ Estatísticas avançadas

## 🚀 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Roda ESLint
npm run db:generate  # Gera Prisma Client
npm run db:migrate   # Roda migrations
npm run db:push      # Faz push do schema
npm run db:studio    # Abre Prisma Studio
```

## 📱 Roadmap

- [x] Setup do projeto Next.js
- [x] Configurar Prisma e banco de dados
- [ ] Implementar autenticação
- [ ] Criar sistema de busca de concursos
- [ ] Integrar Google Gemini AI
- [ ] Implementar análise de bancas
- [ ] Criar gerador de questões
- [ ] Deploy em produção
- [ ] Versão Android (React Native)

## 🤝 Contribuindo

Este é um projeto em desenvolvimento ativo. Sugestões e contribuições são bem-vindas!

## 📄 Licença

Este projeto é privado e proprietário.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato.

---

**Status:** 🟡 Em Desenvolvimento  
**Versão:** 0.1.0  
**Última atualização:** 09/01/2026
