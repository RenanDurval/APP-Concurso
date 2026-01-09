# 04 - Modelo de Banco de Dados

## 🗄️ Visão Geral

Este documento detalha o modelo completo do banco de dados PostgreSQL do App de Concursos, incluindo todas as tabelas, relacionamentos, índices e constraints.

---

## 📊 Diagrama Entidade-Relacionamento

```mermaid
erDiagram
    User ||--o| Subscription : "has"
    User ||--o{ UserProgress : "tracks"
    User ||--o{ SavedSearch : "saves"
    
    Concurso ||--o{ Edital : "has"
    Concurso ||--o{ Estatistica : "has"
    Concurso ||--o{ SavedSearch : "referenced_by"
    
    Edital }o--|| Banca : "organized_by"
    Edital ||--o{ Prova : "has"
    Edital ||--o{ Cronograma : "contains"
    
    Banca ||--o{ BancaAnalise : "analyzed_in"
    Banca ||--o{ Edital : "organizes"
    Banca ||--o{ Prova : "applies"
    
    Prova ||--o{ Questao : "contains"
    
    Questao ||--o{ UserProgress : "answered_in"
    
    User {
        string id PK
        string email UK
        string name
        string password
        boolean isPremium
        datetime emailVerified
        string image
        datetime createdAt
        datetime updatedAt
    }
    
    Subscription {
        string id PK
        string userId FK_UK
        string status
        datetime startDate
        datetime endDate
        boolean isLifetime
        datetime createdAt
        datetime updatedAt
    }
    
    Concurso {
        string id PK
        string nome
        string orgao
        string cargo
        text descricao
        string status
        string nivelEscolaridade
        string regiaoAbrangencia
        int numeroVagas
        decimal salario
        datetime createdAt
        datetime updatedAt
    }
    
    Edital {
        string id PK
        string concursoId FK
        string bancaId FK
        string numeroEdital
        datetime dataPublicacao
        datetime dataInscricaoInicio
        datetime dataInscricaoFim
        datetime dataProva
        datetime dataResultado
        text linkEdital
        text linkInscricao
        text conteudoTexto
        text resumoIA
        boolean isAtivo
        datetime createdAt
        datetime updatedAt
    }
    
    Cronograma {
        string id PK
        string editalId FK
        string descricao
        datetime dataEvento
        string tipo
        datetime createdAt
    }
    
    Banca {
        string id PK
        string nome UK
        text descricao
        string site
        text caracteristicas
        text materiasFrequentes
        text estiloQuestoes
        datetime createdAt
        datetime updatedAt
    }
    
    BancaAnalise {
        string id PK
        string bancaId FK
        int concursosTotais
        text materiasComuns
        decimal dificuldadeMedia
        decimal porcentagemObjetivas
        decimal porcentagemDiscursivas
        text observacoes
        datetime createdAt
        datetime updatedAt
    }
    
    Prova {
        string id PK
        string editalId FK
        string bancaId FK
        string cargo
        datetime dataProva
        string tipo
        text linkProva
        text linkGabarito
        datetime createdAt
        datetime updatedAt
    }
    
    Questao {
        string id PK
        string provaId FK_NULL
        string materia
        string assunto
        text enunciado
        text alternativaA
        text alternativaB
        text alternativaC
        text alternativaD
        text alternativaE
        string respostaCorreta
        text explicacao
        string dificuldade
        boolean isGeradaPorIA
        datetime createdAt
        datetime updatedAt
    }
    
    Estatistica {
        string id PK
        string concursoId FK
        int anoReferencia
        int totalInscritos
        int totalVagas
        decimal inscritosPorVaga
        decimal notaCorteObjetiva
        decimal notaCorteDiscursiva
        decimal maiorNota
        decimal menorNota
        datetime createdAt
        datetime updatedAt
    }
    
    UserProgress {
        string id PK
        string userId FK
        string questaoId FK
        string respostaUsuario
        boolean acertou
        int tempoResposta
        datetime createdAt
    }
    
    SavedSearch {
        string id PK
        string userId FK
        string concursoId FK
        datetime createdAt
    }
```

---

## 📋 Descrição das Tabelas

### 1. **users** - Usuários do Sistema

Armazena informações dos usuários cadastrados.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| email | String (UNIQUE) | Email do usuário |
| name | String? | Nome completo |
| password | String | Senha hasheada (bcrypt) |
| isPremium | Boolean | Se tem assinatura premium |
| emailVerified | DateTime? | Data de verificação do email |
| image | String? | URL da foto de perfil |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de última atualização |

**Relacionamentos:**
- 1:1 com `subscriptions`
- 1:N com `user_progress`
- 1:N com `saved_searches`

---

### 2. **subscriptions** - Assinaturas Premium

Gerencia assinaturas de usuários premium.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| userId | String (FK, UNIQUE) | Referência ao usuário |
| status | String | 'active', 'canceled', 'expired' |
| startDate | DateTime | Data de início |
| endDate | DateTime? | Data de término |
| isLifetime | Boolean | Se é vitalícia |

**Status possíveis:**
- `active` - Assinatura ativa
- `canceled` - Cancelada mas ainda válida
- `expired` - Expirada

---

### 3. **concursos** - Concursos Públicos

Informações sobre concursos públicos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| nome | String | Nome completo do concurso |
| orgao | String | Órgão organizador |
| cargo | String? | Cargo principal |
| descricao | Text? | Descrição detalhada |
| status | String | 'aberto', 'previsto', 'encerrado' |
| nivelEscolaridade | String? | 'fundamental', 'medio', 'superior' |
| regiaoAbrangencia | String? | 'municipal', 'estadual', 'federal' |
| numeroVagas | Int? | Número de vagas |
| salario | Decimal? | Remuneração inicial |

**Índices:**
- `status` - Para filtros rápidos
- `orgao` - Para buscas por órgão

---

### 4. **editais** - Editais dos Concursos

Editais publicados para cada concurso.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| concursoId | String (FK) | Referência ao concurso |
| bancaId | String (FK) | Banca organizadora |
| numeroEdital | String | Número do edital |
| dataPublicacao | DateTime | Data de publicação |
| dataInscricaoInicio | DateTime? | Início das inscrições |
| dataInscricaoFim | DateTime? | Fim das inscrições |
| dataProva | DateTime? | Data da prova |
| linkEdital | Text | URL do PDF do edital |
| linkInscricao | Text? | URL para inscrição |
| conteudoTexto | Text? | Texto extraído do PDF |
| resumoIA | Text? | Resumo gerado pela IA |
| isAtivo | Boolean | Se está ativo |

**Índices:**
- `concursoId` - Join com concursos
- `bancaId` - Join com bancas
- `dataPublicacao` - Ordenação temporal

---

### 5. **cronogramas** - Cronograma de Eventos

Datas importantes de cada edital.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| editalId | String (FK) | Referência ao edital |
| descricao | String | Descrição do evento |
| dataEvento | DateTime | Data do evento |
| tipo | String | Tipo de evento |

**Tipos de evento:**
- `inscricao` - Datas de inscrição
- `prova` - Datas de provas
- `resultado` - Divulgação de resultados
- `recurso` - Prazo de recursos
- `convocacao` - Convocação de aprovados

---

### 6. **bancas** - Bancas Examinadoras

Organizadoras de concursos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| nome | String (UNIQUE) | Nome da banca |
| descricao | Text? | Descrição |
| site | String? | Website oficial |
| caracteristicas | Text? | JSON com padrões |
| materiasFrequentes | Text? | JSON com matérias |
| estiloQuestoes | Text? | Análise do estilo |

**Bancas principais:**
- CESPE/CEBRASPE
- FCC
- FGV
- VUNESP
- IBFC
- Entre outras

---

### 7. **banca_analises** - Análises de Bancas

Análises estatísticas das bancas.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| bancaId | String (FK) | Referência à banca |
| concursosTotais | Int | Total de concursos |
| materiasComuns | Text? | JSON com matérias |
| dificuldadeMedia | Decimal? | 0.00 a 10.00 |
| porcentagemObjetivas | Decimal? | % de objetivas |
| porcentagemDiscursivas | Decimal? | % de discursivas |
| observacoes | Text? | Observações gerais |

---

### 8. **provas** - Provas Aplicadas

Provas de concursos anteriores.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| editalId | String (FK) | Referência ao edital |
| bancaId | String (FK) | Banca que aplicou |
| cargo | String? | Cargo específico |
| dataProva | DateTime | Data de aplicação |
| tipo | String | Tipo da prova |
| linkProva | Text? | URL da prova |
| linkGabarito | Text? | URL do gabarito |

**Tipos de prova:**
- `objetiva` - Múltipla escolha
- `discursiva` - Questões dissertativas
- `redacao` - Redação
- `pratica` - Prova prática

---

### 9. **questoes** - Questões

Questões de provas (reais ou geradas por IA).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| provaId | String? (FK) | Prova de origem (null se IA) |
| materia | String | Matéria/disciplina |
| assunto | String? | Assunto específico |
| enunciado | Text | Texto da questão |
| alternativaA-E | Text? | Alternativas |
| respostaCorreta | String? | 'A', 'B', 'C', 'D', 'E' |
| explicacao | Text? | Explicação da resposta |
| dificuldade | String? | 'facil', 'media', 'dificil' |
| isGeradaPorIA | Boolean | Se foi gerada pela IA |

---

### 10. **estatisticas** - Estatísticas de Concursos

Dados estatísticos históricos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| concursoId | String (FK) | Referência ao concurso |
| anoReferencia | Int | Ano dos dados |
| totalInscritos | Int? | Total de inscritos |
| totalVagas | Int? | Total de vagas |
| inscritosPorVaga | Decimal? | Relação inscritos/vaga |
| notaCorteObjetiva | Decimal? | Nota de corte objetiva |
| notaCorteDiscursiva | Decimal? | Nota de corte discursiva |
| maiorNota | Decimal? | Maior nota alcançada |
| menorNota | Decimal? | Menor nota de aprovação |

**Constraint único:** `concursoId + anoReferencia`

---

### 11. **user_progress** - Progresso do Usuário

Rastreia respostas dos usuários às questões.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| userId | String (FK) | Referência ao usuário |
| questaoId | String (FK) | Referência à questão |
| respostaUsuario | String? | Resposta dada ('A'-'E') |
| acertou | Boolean | Se acertou |
| tempoResposta | Int? | Tempo em segundos |

**Constraint único:** `userId + questaoId` (não pode responder 2x)

---

### 12. **saved_searches** - Buscas Salvas

Concursos salvos pelos usuários.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| userId | String (FK) | Referência ao usuário |
| concursoId | String (FK) | Concurso salvo |

**Constraint único:** `userId + concursoId`

---

## 🔑 Políticas de Relacionamento

### Cascade Deletes

Quando um registro pai é deletado:

| Pai | Filho | Ação |
|-----|-------|------|
| User | Subscription | CASCADE (deleta assinatura) |
| User | UserProgress | CASCADE (deleta progresso) |
| User | SavedSearch | CASCADE (deleta buscas) |
| Concurso | Edital | CASCADE (deleta editais) |
| Concurso | Estatistica | CASCADE (deleta stats) |
| Edital | Prova | CASCADE (deleta provas) |
| Edital | Cronograma | CASCADE (deleta cronogramas) |
| Prova | Questao | SET NULL (questão fica órfã) |

---

## 📊 Índices para Performance

Criados automaticamente pelo Prisma:

- **Primary Keys**: Todos os `id`
- **Unique Keys**: `email` em users, `nome` em bancas
- **Foreign Keys**: Todas as relações
- **Custom Indexes**:
  - `concursos.status`
  - `concursos.orgao`
  - `editais.dataPublicacao`
  - `questoes.materia`

---

## 💾 Estimativa de Armazenamento

Para 1.000 concursos com médiade 5 editais cada:

| Tabela | Estimativa | Tamanho/Registro |
|--------|------------|------------------|
| users | 10.000 usuários | ~500 bytes |
| concursos | 1.000 concursos | ~1 KB |
| editais | 5.000 editais | ~10 KB |
| bancas | 50 bancas | ~2 KB |
| provas | 10.000 provas | ~500 bytes |
| questoes | 200.000 questões | ~1.5 KB |
| estatisticas | 5.000 registros | ~300 bytes |

**Total estimado**: ~350 MB (dentro do limite de 500MB do Supabase Free)

---

## 🔒 Segurança

### Row Level Security (RLS)

Implementar futuramente no Supabase:

```sql
-- Usuários só veem seu próprio progresso
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" 
ON user_progress FOR SELECT 
USING (auth.uid() = user_id);
```

### Proteções no Prisma

- Senhas nunca retornadas em queries
- Soft deletes onde apropriado
- Validação de tipos
- Constraints de unicidade

---

**Documento criado em:** 09/01/2026  
**Versão:** 1.0  
**Schema version:** Initial
