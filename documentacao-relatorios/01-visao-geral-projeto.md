# 01 - Visão Geral do Projeto

## 📖 Introdução

O **App de Concursos Públicos** é uma plataforma web (com futura versão mobile Android) desenvolvida para auxiliar candidatos brasileiros na preparação para concursos públicos. O aplicativo utiliza inteligência artificial para analisar editais, identificar padrões de bancas examinadoras e gerar questões personalizadas de estudo.

---

## 🎯 Objetivos do Projeto

### Objetivo Principal
Criar uma ferramenta completa que facilite o acesso à informação sobre concursos públicos e potencialize os estudos dos candidatos através de análises inteligentes e questões personalizadas.

### Objetivos Específicos

1. **Centralizar Informações de Editais**
   - Agregar dados dos últimos 5 editais de cada concurso
   - Identificar concursos abertos e previstos
   - Exibir cronogramas completos e requisitos

2. **Análise Inteligente de Bancas**
   - Triangular dados entre múltiplos editais
   - Identificar padrões de cobrança de cada banca
   - Apresentar estatísticas de matérias e tipos de questões

3. **Geração de Questões com IA**
   - Criar questões no estilo das bancas identificadas
   - Basear-se nas últimas 5 provas de cada concurso
   - Oferecer prática personalizada para cada edital

4. **Estatísticas e Insights**
   - Mostrar relação inscrito/vaga
   - Apresentar tendências históricas
   - Fornecer insights sobre competitividade

5. **Resumos Inteligentes**
   - Usar IA para resumir pontos-chave dos editais
   - Destacar informações críticas (datas, requisitos especiais)
   - Facilitar compreensão rápida de editais extensos

---

## 👥 Público-Alvo

### Primário
- **Concurseiros ativos:** Pessoas estudando para concursos específicos
- **Aspirantes a concursos:** Indivíduos planejando carreira pública

### Secundário
- **Professores preparatórios:** Para análise de bancas e tendências
- **Instituições de ensino:** Cursos preparatórios

---

## 💡 Proposta de Valor

### Para Usuários Gratuitos
✅ Busca e visualização de concursos  
✅ Acesso aos últimos editais  
✅ Estatísticas básicas de inscrições  
✅ Identificação de bancas examinadoras  

### Para Usuários Premium
⭐ Análise completa de padrões das bancas  
⭐ Geração ilimitada de questões com IA  
⭐ Resumos inteligentes de editais  
⭐ Estatísticas avançadas e comparativos  
⭐ Histórico completo de desempenho  

---

## 🚀 Diferenciais Competitivos

### 1. Triangulação de Dados
Nosso sistema analisa múltiplos editais simultaneamente, identificando padrões que não são óbvios ao estudante comum.

### 2. IA Personalizada
Uso de Google Gemini AI para:
- Entender o estilo de cada banca
- Gerar questões autênticas
- Resumir editais complexos

### 3. Foco no Candidato
Interface intuitiva e informações organizadas de forma a otimizar o tempo de estudo.

### 4. Sempre Atualizado
Sistema de scraping mantém dados atualizados sobre editais e concursos.

---

## 📊 Escopo do Projeto

### Versão 1.0 (Web App) - MVP
**Funcionalidades Incluídas:**
- ✅ Sistema de autenticação (login/registro)
- ✅ Busca de concursos por nome/órgão
- ✅ Visualização dos últimos 5 editais
- ✅ Identificação de bancas examinadoras
- ✅ Estatísticas básicas (gratuito) e avançadas (premium)
- ✅ Resumo de editais com IA (premium)
- ✅ Geração de questões com IA (premium)
- ✅ Dashboard de estudos
- ✅ Sistema de tiers (gratuito/premium)

**Funcionalidades Excluídas do MVP:**
- ❌ Sistema de pagamento automatizado (será manual inicialmente)
- ❌ Aplicativo Android (versão futura)
- ❌ Análise de provas discursivas
- ❌ Comunidade/fórum de usuários
- ❌ Sistema de gamificação

### Versão 2.0 (Android App) - Futuro
**Planejado para:**
- 📱 App nativo Android com React Native Expo
- 📱 Modo offline para questões salvas
- 📱 Notificações push para novos editais
- 📱 Sincronização entre web e mobile

---

## 🎨 Princípios de Design

### UX/UI
1. **Simplicidade:** Interface limpa e intuitiva
2. **Velocidade:** Performance otimizada para decisões rápidas
3. **Informação Clara:** Dados apresentados de forma visual e compreensível
4. **Mobile-First:** Design responsivo pensando no uso mobile

### Técnicos
1. **Código Limpo:** Seguir boas práticas de programação
2. **SEO-First:** Otimização para mecanismos de busca
3. **Escalabilidade:** Arquitetura preparada para crescimento
4. **Segurança:** Proteção de dados dos usuários

---

## 📈 Métricas de Sucesso

### Técnicas
- Tempo de resposta < 2s para buscas
- 99% de uptime
- Zero erros críticos em produção
- Lighthouse score > 90

### Negócio (Futuro)
- Taxa de conversão gratuito → premium
- Retenção de usuários
- Engagement com questões geradas
- NPS (Net Promoter Score)

---

## 🛣️ Roadmap de Alto Nível

### Q1 2026 - MVP Web
- Desenvolvimento e lançamento da versão web
- Testes beta com usuários selecionados
- Ajustes baseados em feedback

### Q2 2026 - Monetização
- Implementação de sistema de pagamentos
- Campanhas de aquisição de usuários
- Parcerias com cursos preparatórios

### Q3-Q4 2026 - Expansão
- Desenvolvimento do app Android
- Novas funcionalidades (comunidade, gamificação)
- Expansão de cobertura de concursos

---

## 🔒 Considerações de Privacidade e Segurança

- **Dados Pessoais:** Armazenados de forma segura, conformidade com LGPD
- **Autenticação:** Senhas hasheadas com bcrypt
- **Sessões:** Tokens seguros com NextAuth.js
- **APIs:** Rate limiting para prevenir abuso

---

## 💰 Modelo de Negócio

### Fase Atual (Gratuito)
- Sem cobrança inicial
- Foco em construir base de usuários
- Gestão manual de usuários premium (para testes)

### Fase Futura (Monetização)
- **Freemium Model:**
  - Tier Gratuito: Funcionalidades básicas
  - Tier Premium: R$ 29,90/mês (estimativa)
- **Pagamentos via Mercado Pago** (integração futura)

---

**Documento criado em:** 09/01/2026  
**Versão:** 1.0  
**Status:** ✅ Aprovado
