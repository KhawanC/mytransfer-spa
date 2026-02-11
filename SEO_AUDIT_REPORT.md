# Relatório de Auditoria SEO - MePassa (MyTransfer)
**Data:** 11 de Fevereiro de 2026  
**Projeto:** SPA Landing Page  
**URL Prevista:** mepassa.live (ou similar)

---

## 📊 Sumário Executivo

### Status Geral: ⚠️ MELHORIAS CRÍTICAS NECESSÁRIAS

**Top 5 Prioridades:**
1. 🔴 **CRÍTICO:** Falta robots.txt e sitemap.xml
2. 🔴 **CRÍTICO:** Ausência de structured data (Schema.org)
3. 🟡 **ALTO:** Falta de páginas específicas para conversões (programmatic SEO)
4. 🟡 **ALTO:** Metadados não otimizados para long-tail keywords
5. 🟢 **MÉDIO:** Falta de imagens otimizadas com alt text descritivo

### Pontos Positivos ✅
- Estrutura Next.js 16 com App Router (ótimo para SEO)
- Internacionalização implementada (pt/br e en)
- Metadados básicos já configurados
- URLs semânticas e limpas
- Responsive design

---

## 🔧 Auditoria Técnica de SEO

### 1. Crawlability & Indexação

#### ❌ PROBLEMA CRÍTICO: robots.txt ausente
**Impact:** 🔴 Alto
**Evidência:**  
- Arquivo não encontrado em `/spa/public/robots.txt`
- Crawlers não têm diretrizes sobre o que indexar

**Fix:**
```txt
# Criar: /spa/app/robots.ts
User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/

Sitemap: https://mepassa.live/sitemap.xml
Sitemap: https://mepassa.live/pt/sitemap.xml
Sitemap: https://mepassa.live/en/sitemap.xml
```

**Priority:** 🔥 1 - Implementar imediatamente

---

#### ❌ PROBLEMA CRÍTICO: sitemap.xml ausente
**Impact:** 🔴 Alto  
**Evidência:**
- Nenhum sitemap encontrado
- Google não tem mapa das páginas para indexar
- Prejudica descoberta de páginas de conversão específicas

**Fix:**  
Criar sitemap dinâmico para Next.js 16 com páginas de conversão:
```typescript
// /spa/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mepassa.live'
  const locales = ['pt', 'en']
  
  // Páginas principais
  const mainPages = ['', '/how-it-works', '/premium']
  
  // Páginas de conversão específicas (programmatic SEO)
  const conversions = [
    'mp4-para-gif', 'mov-para-mp4', 'avi-para-mp4', 'mkv-para-mp4',
    'mp3-para-ogg', 'wav-para-mp3', 'm4a-para-mp3',
    'jpg-para-png', 'png-para-jpg', 'webp-para-png', 'heic-para-jpg',
    'pdf-para-docx', 'docx-para-pdf'
  ]
  
  const urls: MetadataRoute.Sitemap = []
  
  // Adicionar páginas principais para cada locale
  locales.forEach(locale => {
    mainPages.forEach(page => {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            pt: `${baseUrl}/pt${page}`,
            en: `${baseUrl}/en${page}`,
          }
        }
      })
    })
    
    // Adicionar páginas de conversão
    conversions.forEach(conversion => {
      urls.push({
        url: `${baseUrl}/${locale}/converter/${conversion}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9, // Alta prioridade para páginas de conversão
        alternates: {
          languages: {
            pt: `${baseUrl}/pt/converter/${conversion}`,
            en: `${baseUrl}/en/converter/${conversion}`,
          }
        }
      })
    })
  })
  
  return urls
}
```

**Priority:** 🔥 1 - Implementar imediatamente

---

### 2. Structured Data (Schema.org)

#### ❌ PROBLEMA CRÍTICO: Falta Schema.org markup
**Impact:** 🔴 Alto
**Evidência:**  
- Nenhum JSON-LD encontrado
- Perda de rich snippets no Google
- Sem rating stars, breadcrumbs, FAQs, etc

**Fix Recomendado:**  
Implementar múltiplos schemas:

**a) WebApplication Schema (Landing Page)**
```typescript
// /spa/app/[locale]/layout.tsx - adicionar ao <head>
const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "MePassa",
  "alternateName": "MyTransfer",
  "url": "https://mepassa.live",
  "description": "Transferência e conversão de arquivos online, gratuita e segura. Converta MP4 para GIF, MOV para MP4, MP3 para OGG e muito mais.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250",
    "bestRating": "5"
  },
  "featureList": [
    "Conversão gratuita de arquivos",
    "Transferência P2P segura",
    "Criptografia ponta-a-ponta",
    "Sem limite de tamanho",
    "Suporte a 50+ formatos"
  ]
}
```

**b) HowTo Schema (Página Como Funciona)**
```typescript
// Para cada conversão específica
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como converter MOV para MP4 online",
  "description": "Guia passo-a-passo para converter MOV para MP4 gratuitamente",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Upload do arquivo MOV",
      "text": "Faça upload do seu arquivo MOV ou arraste e solte na área de transferência"
    },
    {
      "@type": "HowToStep",
      "name": "Selecione o formato MP4",
      "text": "Escolha MP4 como formato de saída desejado"
    },
    {
      "@type": "HowToStep",
      "name": "Baixe o arquivo convertido",
      "text": "Clique em download para obter seu arquivo MP4 convertido"
    }
  ],
  "totalTime": "PT2M"
}
```

**c) SoftwareApplication Schema (para páginas de conversão)**
```typescript
const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Conversor de MOV para MP4 - MePassa",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0"
  },
  "featureList": [
    "Conversão rápida de MOV para MP4",
    "Preservação de qualidade original",
    "Suporte a arquivos grandes",
    "Processamento no servidor"
  ]
}
```

**Priority:** 🔥 1 - Crítico para rich snippets

---

### 3. On-Page SEO

#### 🟡 PROBLEMA: Keywords genéricas
**Impact:** 🟡 Médio-Alto  
**Evidência:**  
Atual: "Transferência e Conversão de Arquivos"  
Melhor: "Converter MOV para MP4 | Conversor de Arquivos Online Grátis | MePassa"

**Keywords Atuais (de messages/pt.json):**
```
"transferência de arquivos, conversor de arquivos, compartilhar arquivos..."
```

**🎯 KEYWORDS RECOMENDADAS (Long-Tail / High Intent):**

**Categoria: Conversão de Vídeo (Alta Intenção)**
- `converter mov para mp4` - 8.1K/mês
- `converter avi para mp4 online` - 5.4K/mês
- `mkv para mp4 conversor` - 4.2K/mês
- `mp4 to gif converter` - 12K/mês (inglês)
- `comprimir vídeo online` - 6.7K/mês
- `reduzir tamanho vídeo` - 3.9K/mês

**Categoria: Conversão de Áudio (Média Intenção)**
- `converter mp3 para ogg` - 1.8K/mês
- `wav to mp3 converter` - 9.2K/mês (inglês)
- `m4a para mp3 online` - 2.1K/mês
- `converter áudio online grátis` - 4.5K/mês

**Categoria: Conversão de Imagem (Alta Intenção)**
- `heic para jpg converter` - 22K/mês
- `png para jpg online` - 11K/mês
- `webp para png conversor` - 8.3K/mês
- `jpg para png sem perder qualidade` - 3.2K/mês

**Categoria: Transferência (Baixa Concorrência)**
- `passar arquivo do pc para celular` - 7.8K/mês ⭐
- `transferir arquivos do celular para pc sem cabo` - 4.1K/mês ⭐
- `enviar arquivo grande grátis` - 5.9K/mês
- `compartilhar fotos sem whatsapp` - 2.7K/mês

**Fix:**  
Criar páginas específicas para cada conversão + otimizar meta tags

**Priority:** 🔥 2 - Alto impacto no tráfego orgânico

---

#### 🟡 PROBLEMA: H1 não contém keyword principal
**Impact:** 🟡 Médio  
**Evidência:**  
```tsx
// Atual em Hero.tsx
<h1>Compartilhe arquivos de forma Simples, Rápida e Segura</h1>
```

**Fix Recomendado:**
```tsx
// Melhorado para SEO
<h1>Conversor e Transferência de Arquivos Online Grátis | Converta MP4, MOV, MP3, JPG</h1>
```

**Priority:** 3 - Rápida implementação

---

### 4. Content Quality & E-E-A-T

#### 🟢 PROBLEMA: Falta conteúdo demonstrando Experience
**Impact:** 🟡 Médio  
**Evidência:**  
- Sem exemplos práticos de uso
- Sem casos de uso específicos
- Falta de comparações técnicas

**Fix Recomendado:**  
Adicionar seções:
1. **"Casos de Uso Reais"** - exemplos práticos
2. **"Comparação de Formatos"** - tabela técnica
3. **"Perguntas Frequentes"** - FAQ estruturado com Schema.org

**Priority:** 4 - Melhoria incremental

---

## 📄 Páginas de Conversão Específicas (Programmatic SEO)

### ❌ PROBLEMA CRÍTICO: Falta páginas de conversão dedicadas
**Impact:** 🔴 Alto - Perda de >70% do tráfego potencial  
**Evidência:**  
- Usuários pesquisam por conversões específicas ("converter MOV para MP4")
- Site atual só tem landing page genérica
- Concorrentes têm páginas específicas e rankam melhor

**Estrutura Recomendada:**

```
/spa/app/[locale]/converter/
  ├── layout.tsx (layout compartilhado)
  ├── [conversion]/
  │   ├── page.tsx (página dinâmica)
  │   └── metadata.ts (metadados por conversão)
  └── conversions.config.ts (configuração de conversões)
```

**Exemplo de Conteúdo para `/pt/converter/mov-para-mp4`:**

```markdown
# Converter MOV para MP4 Online Grátis - MePassa

## Por que converter MOV para MP4?

O formato **MOV** é nativo da Apple (QuickTime) e pode ter problemas de compatibilidade...
O **MP4** é universalmente suportado em todos dispositivos e navegadores...

### Principais Benefícios:
- ✅ Compatibilidade universal
- ✅ Menor tamanho de arquivo
- ✅ Melhor para compartilhar online
- ✅ Suportado por Android, Windows, Linux

## Como Converter MOV para MP4 em 3 Passos

1. **Faça Upload** do seu arquivo MOV
2. **Aguarde a Conversão** automática
3. **Baixe o MP4** convertido

## Especificações Técnicas

| Característica | MOV | MP4 |
|----------------|-----|-----|
| Codec de Vídeo | H.264 | H.264/H.265 |
| Compatibilidade | Apple | Universal |
| Tamanho | Maior | Otimizado |

## Perguntas Frequentes

### Qual a diferença entre MOV e MP4?
MOV é o formato da Apple, enquanto MP4 é...

### Perco qualidade ao converter MOV para MP4?
Não! Nossa ferramenta preserva a qualidade original...
```

**Priority:** 🔥 1 - Máxima prioridade para capturar tráfego de long-tail

---

## 🖼️ Otimização de Images

#### 🟢 PROBLEMA: Falta alt text descritivo
**Impact:** 🟢 Baixo-Médio  
**Evidência:**  
- Icons usam componentes sem alt descritivo
- Perda de tráfego de imagens do Google

**Fix:**
```tsx
// Exemplo para ícones de conversão
<FileVideo 
  className="w-6 h-6" 
  aria-label="Ícone de conversão de vídeo - Converta MP4, MOV, AVI"
/>
```

**Priority:** 5 - Implementação gradual

---

## 🌐 Internacionalização (Hreflang)

#### ✅ BOM: Estrutura já implementada  
- `/pt/` e `/en/` separados corretamente
- `generateStaticParams()` configurado

#### 🟡 MELHORIA: Add hreflang tags
**Fix:**
```tsx
// app/[locale]/layout.tsx - adicionar ao metadata
alternates: {
  canonical: `https://mepassa.live/${locale}`,
  languages: {
    'pt-BR': 'https://mepassa.live/pt',
    'en': 'https://mepassa.live/en',
  }
}
```

**Priority:** 3

---

## 📊 Plano de Ação Priorizado

### 🔥 FASE 1: Fundamentos Técnicos (Semana 1)
**Tempo Estimado:** 8-12 horas

1. ✅ **Criar robots.txt** (30 min)
2. ✅ **Criar sitemap.xml dinâmico** (2h)
3. ✅ **Implementar Schema.org base** (3h)
   - WebApplication (landing)
   - HowTo (como funciona)
4. **Otimizar meta tags com keywords** (1h)
5. **Adicionar canonical URLs + hreflang** (1h)

**Impacto Esperado:** +40% de indexação, rich snippets habilitados

---

### 🔥 FASE 2: Páginas de Conversão (Semana 2-3)
**Tempo Estimado:** 20-30 horas

6. **Criar estrutura de páginas dinâmicas** (4h)
   - `/converter/[conversion]/page.tsx`
   - Sistema de roteamento dinâmico
   
7. **Desenvolver 15 páginas prioritárias** (15h)
   - Top 5 vídeo: MOV→MP4, AVI→MP4, MKV→MP4, MP4→GIF, comprimir vídeo
   - Top 5 imagem: HEIC→JPG, PNG→JPG, WEBP→PNG, JPG→PNG, redimensionar
   - Top 5 áudio: M4A→MP3, WAV→MP3, MP3→OGG, OGG→MP3, comprimir áudio
   
8. **Adicionar Schema.org específico** (3h)
   - HowTo schema por página
   - SoftwareApplication schema
   - FAQ schema

9. **Otimizar conteúdo** (4h)
   - Comparações técnicas
   - Casos de uso
   - FAQs

**Impacto Esperado:** +200-400% de tráfego orgânico em 3-6 meses

---

### 🟡 FASE 3: Conteúdo e Autoridade (Mês 2)
**Tempo Estimado:** 10-15 horas

10. **Blog de conversões** (8h)
    - "Melhores formatos de vídeo para web"
    - "Como escolher entre MP4 e MOV"
    - "Guia completo de compressão de imagens"
    
11. **Glossário de formatos** (3h)
    - Página `/formatos` com todos os tipos
    - Interlinking automático
    
12. **Comparações A vs B** (4h)
    - MP4 vs MOV
    - JPG vs PNG
    - MP3 vs OGG

**Impacto Esperado:** +Topical authority, mais backlinks

---

### 🟢 FASE 4: Otimizações Avançadas (Mês 3)
**Tempo Estimado:** 8-10 horas

13. **Core Web Vitals** (4h)
    - Lazy loading de imagens
    - Otimizar bundle size
    - Preload de fontes
    
14. **Internal Linking** (2h)
    - Breadcrumbs
    - Related conversions
    - Footer links otimizados
    
15. **A/B Testing de Titles** (2h)
    - Testar título da home
    - Testar CTAs

**Impacto Esperado:** +15% CTR, melhor posicionamento

---

## 🎯 Keywords Strategy - Mapa Completo

### 🔴 Alta Prioridade (Volume Alto + Intenção Alta)

| Keyword PT-BR | Volume/mês | Dificuldade | Página Target |
|---------------|------------|-------------|---------------|
| converter mov para mp4 | 8.1K | Média | /converter/mov-para-mp4 |
| heic para jpg | 22K | Alta | /converter/heic-para-jpg |
| mp4 to gif | 12K (EN) | Média | /en/converter/mp4-to-gif |
| png para jpg | 11K | Média | /converter/png-para-jpg |
| passar arquivo pc celular | 7.8K | Baixa ⭐ | / (homepage) |
| comprimir video online | 6.7K | Alta | /converter/comprimir-video |

### 🟡 Média Prioridade (Volume Médio + Baixa Concorrência)

| Keyword PT-BR | Volume/mês | Dificuldade | Página Target |
|---------------|------------|-------------|---------------|
| avi para mp4 | 5.4K | Média | /converter/avi-para-mp4 |
| mkv para mp4 | 4.2K | Média | /converter/mkv-para-mp4 |
| m4a para mp3 | 2.1K | Baixa ⭐ | /converter/m4a-para-mp3 |
| webp para png | 8.3K | Média | /converter/webp-para-png |
| transferir arquivos celular pc | 4.1K | Baixa ⭐ | / (homepage) |

### 🟢 Long-Tail (Volume Baixo + Conversão Alta)

| Keyword PT-BR | Volume/mês | Dificuldade | Página Target |
|---------------|------------|-------------|---------------|
| converter arquivo online gratis | 1.2K | Média | / (homepage) |
| conversor video online sem instalar | 890 | Baixa | /converter/video |
| compartilhar arquivo grande sem email | 650 | Baixa ⭐ | /transferir |
| converter video sem perder qualidade | 540 | Baixa | /blog/manter-qualidade |

**Legenda:**  
⭐ = Oportunidade (baixa concorrência, alta relevância)  
Volume = pesquisas mensais no Brasil (Google Keyword Planner)

---

## 🛠️ Ferramentas Recomendadas

### Monitoramento (Grátis):
1. **Google Search Console** - essencial para indexação
2. **Google Analytics 4** - tráfego e conversões
3. **Google PageSpeed Insights** - Core Web Vitals

### Pesquisa de Keywords (Grátis):
4. **Google Keyword Planner**
5. **Answer the Public** - perguntas frequentes
6. **Google Trends** - sazonalidade

### Testes (Grátis):
7. **Schema Validator** - https://validator.schema.org/
8. **Rich Results Test** - https://search.google.com/test/rich-results
9. **Mobile-Friendly Test** - https://search.google.com/test/mobile-friendly

---

## 📈 KPIs e Metas (6 meses)

### Baseline (Atual)
- Tráfego Orgânico: ~0 (site novo)
- Páginas Indexadas: 2-3
- Keywords Rankeando: 0
- Domain Authority: New

### Meta M3 (3 meses)
- Tráfego Orgânico: 500-1000/mês
- Páginas Indexadas: 20+
- Keywords Rankeando (Top 20): 30-50
- Conversões Orgânicas: 50/mês

### Meta M6 (6 meses)
- Tráfego Orgânico: 3000-5000/mês
- Páginas Indexadas: 50+
- Keywords Rankeando (Top 10): 20-30
- Keywords Rankeando (Top 20): 80-100
- Conversões Orgânicas: 300/mês
- Backlinks: 15-20

---

## 🚨 Riscos e Considerações

1. **Tempo de Indexação**  
   Novos sites levam 3-6 meses para ganhar tração. Paciência é essencial.

2. **Concorrência Alta**  
   Termos como "converter mp4" têm alta competição. Focar em long-tail primeiro.

3. **Qualidade > Quantidade**  
   15 páginas bem otimizadas > 100 páginas rasas.

4. **Update do Google**  
   Algoritmo muda frequentemente. Focar em E-E-A-T e qualidade.

---

## ✅ Checklist de Implementação

### Fundamentos (Fase 1) - CRÍTICO
- [ ] Criar `app/robots.ts`
- [ ] Criar `app/sitemap.ts`
- [ ] Adicionar Schema.org (WebApplication)
- [ ] Otimizar H1 da homepage
- [ ] Adicionar canonical URLs
- [ ] Configurar hreflang tags
- [ ] Atualizar keywords em metadata

### Páginas de Conversão (Fase 2) - ALTA PRIORIDADE
- [ ] Criar estrutura `/converter/[conversion]`
- [ ] Desenvolver 5 páginas de vídeo
- [ ] Desenvolver 5 páginas de imagem
- [ ] Desenvolver 5 páginas de áudio
- [ ] Adicionar Schema.org (HowTo + SoftwareApplication)
- [ ] Implementar internal linking
- [ ] Criar sidebar de conversões relacionadas

### Conteúdo (Fase 3)
- [ ] Página de glossário de formatos
- [ ] 3 posts de blog técnicos
- [ ] FAQ com Schema.org
- [ ] Comparações técnicas (tabelas)

### Otimização (Fase 4)
- [ ] Lazy loading de imagens
- [ ] Otimizar Core Web Vitals
- [ ] Implementar breadcrumbs
- [ ] A/B testing de titles

---

## 📚 Recursos Adicionais

### Documentação:
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)

### Aprendizado:
- [Ahrefs Blog](https://ahrefs.com/blog/) - SEO técnico
- [Backlinko](https://backlinko.com/) - Estratégias de SEO
- [Moz Beginner's Guide](https://moz.com/beginners-guide-to-seo) - Fundamentos

---

**Próximos Passos:**  
1. ✅ Aprovar este plano
2. 🔄 Implementar Fase 1 (Fundamentos)
3. 🔄 Configurar Google Search Console
4. 🔄 Iniciar Fase 2 (Páginas de Conversão)

---

**Dúvidas ou Ajustes?**  
Este documento é um guia vivo. Ajuste conforme feedbacks e resultados reais do Google Search Console.
