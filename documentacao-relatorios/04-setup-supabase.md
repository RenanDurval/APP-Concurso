# 🗄️ Guia de Configuração do Supabase

Este guia vai te ajudar a configurar um banco de dados PostgreSQL gratuito no Supabase para o App de Concursos.

---

## 📋 Passo 1: Criar Conta no Supabase

1. **Acesse** https://supabase.com
2. **Clique em** "Start your project"
3. **Faça login com**:
   - GitHub (recomendado) OU
   - Email/senha

> ✅ **É 100% gratuito!** Não precisa cartão de crédito.

---

## 📋 Passo 2: Criar Novo Projeto

1. **Clique em** "New Project"
2. **Preencha os dados**:
   - **Name**: `app-concursos` (ou o nome que preferir)
   - **Database Password**: Crie uma senha forte e **SALVE ESSA SENHA!**  
     ⚠️ Você vai precisar dela depois!
   - **Region**: Escolha `South America (São Paulo)` para melhor performance
   - **Pricing Plan**: Deixe em `Free` (já vem selecionado)

3. **Clique em** "Create new project"

⏱️ Aguarde 2-3 minutos enquanto seu banco é criado...

---

## 📋 Passo 3: Obter String de Conexão

Quando o projeto estiver pronto:

1. **No menu lateral**, clique em **"Project Settings"** (ícone de engrenagem)
2. **Clique em** "Database"
3. **Role até** "Connection String"
4. **Selecione a aba** "URI"
5. **Selecione** "Use connection pooling" e "Session mode"
6. **Copie** a URI que aparece (algo como):

```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@xxxxx.pooler.supabase.com:6543/postgres?pgbouncer=true
```

7. **IMPORTANTE**: Substitua `[YOUR-PASSWORD]` pela senha que você criou no Passo 2!

---

## 📋 Passo 4: Configurar no Projeto

1. **Abra** o arquivo `.env.local` na raiz do projeto (se não existir, crie)

2. **Adicione** a linha:

```env
DATABASE_URL="sua-connection-string-aqui"
```

**Exemplo completo do `.env.local`:**

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres.xxxxx:SuaSenhaAqui@xxxxx.pooler.supabase.com:6543/postgres?pgbouncer=true"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gere-um-secret-aleatorio-aqui"

# Google Gemini AI
GOOGLE_GEMINI_API_KEY="sua-chave-do-gemini"
```

3. **Salve o arquivo**

---

## 📋 Passo 5: Gerar Secret do NextAuth

No terminal, execute:

```bash
openssl rand -base64 32
```

Copie o resultado e cole como valor de `NEXTAUTH_SECRET` no `.env.local`

> 💡 Se não tiver `openssl`, use https://generate-secret.vercel.app/32

---

## 📋 Passo 6: Configurar Google Gemini AI (Opcional por enquanto)

1. **Acesse** https://ai.google.dev/
2. **Clique em** "Get API key in Google AI Studio"
3. **Crie** uma nova API key
4. **Copie** e cole em `GOOGLE_GEMINI_API_KEY` no `.env.local`

> 📝 Isso é opcional por enquanto. A IA será usada nas próximas fases.

---

## 📋 Passo 7: Executar Migrations

Agora vamos criar as tabelas no banco de dados!

```bash
# Gerar o Prisma Client
npm run db:generate

# Enviar o schema para o banco
npm run db:push
```

Você deve ver:

```
✔ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema.
```

---

## 📋 Passo 8: Popular com Dados de Teste (Seed)

```bash
# Instalar ts-node (se ainda não instalou)
npm install

# Executar seed
npx prisma db seed
```

Você deve ver:

```
🌱 Iniciando seed do banco de dados...
📝 Criando bancas examinadoras...
✅ 5 bancas criadas/atualizadas
🏛️ Criando concursos de exemplo...
✅ 3 concursos de exemplo criados
...
✨ Seed concluído com sucesso!
```

---

## 📋 Passo 9: Visualizar os Dados (Opcional)

**Opção 1: Prisma Studio (Recomendado)**

```bash
npm run db:studio
```

Abre uma interface visual em http://localhost:5555

**Opção 2: Supabase Dashboard**

1. Vá para https://supabase.com/dashboard
2. Selecione seu projeto
3. Clique em "Table Editor" no menu lateral

---

## ✅ Verificação Final

Confira se tudo está funcionando:

```bash
# Deve mostrar suas tabelas
npx prisma db pull
```

Se tudo estiver correto, você vai ver uma confirmação de que o schema está sincronizado!

---

## 🎯 Estrutura do Banco de Dados

Tabelas criadas:

- **users** - Usuários do sistema
- **subscriptions** - Assinaturas premium
- **concursos** - Concursos públicos
- **editais** - Editais dos concursos
- **cronogramas** - Datas importantes
- **bancas** - Bancas examinadoras
- **banca_analises** - Análises das bancas
- **provas** - Provas aplicadas
- **questoes** - Questões (reais e geradas por IA)
- **estatisticas** - Estatísticas de concursos
- **user_progress** - Progresso dos usuários
- **saved_searches** - Buscas salvaspelos usuários

---

## 🆘 Problemas Comuns

### ❌ Erro: "Can't reach database server"

**Causa**: String de conexão incorreta ou senha errada

**Solução**:
1. Verifique se substituiu `[YOUR-PASSWORD]` pela senha real
2. Confira se não tem espaços extras na string
3. Certifique-se de que o projeto Supabase está ativo

### ❌ Erro: "Environment variable not found: DATABASE_URL"

**Causa**: Arquivo `.env.local` não foi criado ou está no local errado

**Solução**:
1. Crie o arquivo `.env.local` na **raiz do projeto**
2. Adicione a linha `DATABASE_URL="..."`
3. Reinicie o terminal

### ❌ Erro durante seed: "Unique constraint failed"

**Causa**: Tentando rodar seed novamente

**Solução**: O seed usa `upsert`, então pode rodar múltiplas vezes sem problema. Se persistir:

```bash
# Resetar banco (CUIDADO: apaga tudo!)
npx prisma migrate reset
```

---

## 📊 Limites do Tier Gratuito

| Recurso | Limite |
|---------|--------|
| Database Storage | 500 MB |
| Bandwidth | 5 GB/mês |
| File Storage | 1 GB |
| Rows | 500,000 |

> 💡 Isso é mais que suficiente para desenvolvimento e testes iniciais!

---

## 🎉 Próximos Passos

Agora que seu banco está configurado:

1. ✅ Volte para o desenvolvimento
2. ✅ Comece a implementar autenticação
3. ✅ Crie as páginas de dashboard

---

**Dúvidas?** Consulte:
- Documentação Supabase: https://supabase.com/docs
- Documentação Prisma: https://www.prisma.io/docs

**Última atualização:** 09/01/2026
