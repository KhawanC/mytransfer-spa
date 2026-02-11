// Conversion configurations for programmatic SEO pages

export interface ConversionConfig {
  from: string
  to: string
  category: 'video' | 'audio' | 'image' | 'document'
  priority: number
  slug: {
    pt: string
    en: string
  }
  searchVolume: number // monthly searches (approximate)
  difficulty: 'low' | 'medium' | 'high'
}

export const conversions: ConversionConfig[] = [
  // Video conversions - HIGH PRIORITY
  {
    from: 'MOV',
    to: 'MP4',
    category: 'video',
    priority: 10,
    slug: { pt: 'mov-para-mp4', en: 'mov-to-mp4' },
    searchVolume: 8100,
    difficulty: 'medium'
  },
  {
    from: 'MP4',
    to: 'GIF',
    category: 'video',
    priority: 10,
    slug: { pt: 'mp4-para-gif', en: 'mp4-to-gif' },
    searchVolume: 12000,
    difficulty: 'medium'
  },
  {
    from: 'AVI',
    to: 'MP4',
    category: 'video',
    priority: 9,
    slug: { pt: 'avi-para-mp4', en: 'avi-to-mp4' },
    searchVolume: 5400,
    difficulty: 'medium'
  },
  {
    from: 'MKV',
    to: 'MP4',
    category: 'video',
    priority: 9,
    slug: { pt: 'mkv-para-mp4', en: 'mkv-to-mp4' },
    searchVolume: 4200,
    difficulty: 'medium'
  },
  {
    from: 'WEBM',
    to: 'MP4',
    category: 'video',
    priority: 8,
    slug: { pt: 'webm-para-mp4', en: 'webm-to-mp4' },
    searchVolume: 3100,
    difficulty: 'low'
  },

  // Image conversions - HIGH PRIORITY
  {
    from: 'HEIC',
    to: 'JPG',
    category: 'image',
    priority: 10,
    slug: { pt: 'heic-para-jpg', en: 'heic-to-jpg' },
    searchVolume: 22000,
    difficulty: 'high'
  },
  {
    from: 'PNG',
    to: 'JPG',
    category: 'image',
    priority: 9,
    slug: { pt: 'png-para-jpg', en: 'png-to-jpg' },
    searchVolume: 11000,
    difficulty: 'medium'
  },
  {
    from: 'JPG',
    to: 'PNG',
    category: 'image',
    priority: 9,
    slug: { pt: 'jpg-para-png', en: 'jpg-to-png' },
    searchVolume: 9500,
    difficulty: 'medium'
  },
  {
    from: 'WEBP',
    to: 'PNG',
    category: 'image',
    priority: 9,
    slug: { pt: 'webp-para-png', en: 'webp-to-png' },
    searchVolume: 8300,
    difficulty: 'medium'
  },
  {
    from: 'WEBP',
    to: 'JPG',
    category: 'image',
    priority: 8,
    slug: { pt: 'webp-para-jpg', en: 'webp-to-jpg' },
    searchVolume: 6700,
    difficulty: 'medium'
  },

  // Audio conversions - MEDIUM PRIORITY
  {
    from: 'WAV',
    to: 'MP3',
    category: 'audio',
    priority: 9,
    slug: { pt: 'wav-para-mp3', en: 'wav-to-mp3' },
    searchVolume: 9200,
    difficulty: 'medium'
  },
  {
    from: 'M4A',
    to: 'MP3',
    category: 'audio',
    priority: 9,
    slug: { pt: 'm4a-para-mp3', en: 'm4a-to-mp3' },
    searchVolume: 2100,
    difficulty: 'low'
  },
  {
    from: 'MP3',
    to: 'OGG',
    category: 'audio',
    priority: 8,
    slug: { pt: 'mp3-para-ogg', en: 'mp3-to-ogg' },
    searchVolume: 1800,
    difficulty: 'low'
  },
  {
    from: 'OGG',
    to: 'MP3',
    category: 'audio',
    priority: 8,
    slug: { pt: 'ogg-para-mp3', en: 'ogg-to-mp3' },
    searchVolume: 1500,
    difficulty: 'low'
  },
  {
    from: 'FLAC',
    to: 'MP3',
    category: 'audio',
    priority: 8,
    slug: { pt: 'flac-para-mp3', en: 'flac-to-mp3' },
    searchVolume: 4100,
    difficulty: 'medium'
  },

  // Document conversions - MEDIUM PRIORITY
  {
    from: 'PDF',
    to: 'DOCX',
    category: 'document',
    priority: 8,
    slug: { pt: 'pdf-para-docx', en: 'pdf-to-docx' },
    searchVolume: 5600,
    difficulty: 'high'
  },
  {
    from: 'DOCX',
    to: 'PDF',
    category: 'document',
    priority: 9,
    slug: { pt: 'docx-para-pdf', en: 'docx-to-pdf' },
    searchVolume: 7800,
    difficulty: 'high'
  },
]

export function getConversionBySlug(slug: string, locale: 'pt' | 'en'): ConversionConfig | undefined {
  return conversions.find(c => c.slug[locale] === slug)
}

export function getConversionsByCategoryAndLocale(category: string, locale: 'pt' | 'en'): ConversionConfig[] {
  return conversions
    .filter(c => c.category === category)
    .sort((a, b) => b.priority - a.priority)
}

export function getAllConversionSlugs(locale: 'pt' | 'en'): string[] {
  return conversions.map(c => c.slug[locale])
}

// Content templates for conversion pages
export interface ConversionContent {
  title: string
  description: string
  metaDescription: string
  h1: string
  whyConvert: string
  benefits: string[]
  howToSteps: Array<{ title: string; description: string }>
  technicalComparison: {
    headers: string[]
    rows: Array<{ format: string; values: string[] }>
  }
  faqs: Array<{ question: string; answer: string }>
}

export function generateConversionContent(
  config: ConversionConfig,
  locale: 'pt' | 'en'
): ConversionContent {
  const templates = locale === 'pt' ? ptTemplates : enTemplates
  return templates[config.category](config.from, config.to)
}

// Portuguese templates
const ptTemplates = {
  video: (from: string, to: string): ConversionContent => ({
    title: `Converter ${from} para ${to} Online Grátis - MePassa`,
    description: `Converta ${from} para ${to} online gratuitamente. Conversor rápido e seguro com preservação de qualidade. Sem instalação, 100% online.`,
    metaDescription: `Conversor online grátis de ${from} para ${to}. Converta vídeos ${from} para o formato ${to} mantendo a qualidade original. Rápido, seguro e sem limites.`,
    h1: `Converter ${from} para ${to} Online Grátis`,
    whyConvert: `O formato ${from} pode ter problemas de compatibilidade em alguns dispositivos. Converter para ${to} garante reprodução universal em todos navegadores, smartphones e smart TVs.`,
    benefits: [
      'Compatibilidade universal com todos dispositivos',
      'Menor tamanho de arquivo',
      'Melhor para compartilhar online',
      'Preservação da qualidade original',
      'Conversão rápida no servidor'
    ],
    howToSteps: [
      {
        title: 'Faça Upload do Vídeo',
        description: `Arraste e solte seu arquivo ${from} ou clique para selecionar`
      },
      {
        title: 'Conversão Automática',
        description: `O sistema converte automaticamente para ${to} mantendo a qualidade`
      },
      {
        title: 'Baixe o Resultado',
        description: `Download instantâneo do seu vídeo ${to} convertido`
      }
    ],
    technicalComparison: {
      headers: ['Característica', from, to],
      rows: [
        { format: 'Compatibilidade', values: ['Limitada', 'Universal'] },
        { format: 'Tamanho', values: ['Maior', 'Otimizado'] },
        { format: 'Qualidade', values: ['Alta', 'Alta'] },
        { format: 'Streaming', values: ['Moderado', 'Excelente'] }
      ]
    },
    faqs: [
      {
        question: `Qual a diferença entre ${from} e ${to}?`,
        answer: `${from} e ${to} usam codecs diferentes. ${to} tem melhor compatibilidade e é mais adequado para web e streaming.`
      },
      {
        question: `Perco qualidade ao converter ${from} para ${to}?`,
        answer: `Não! Nossa ferramenta preserva a qualidade original do vídeo durante a conversão.`
      },
      {
        question: `Quanto tempo leva para converter?`,
        answer: `Depende do tamanho do arquivo. Vídeos pequenos (até 100MB) são convertidos em segundos.`
      }
    ]
  }),
  audio: (from: string, to: string): ConversionContent => ({
    title: `Converter ${from} para ${to} Online Grátis - MePassa`,
    description: `Converta ${from} para ${to} online gratuitamente. Conversor de áudio rápido com preservação de qualidade. Sem instalação.`,
    metaDescription: `Conversor online grátis de ${from} para ${to}. Converta arquivos de áudio ${from} para o formato ${to} mantendo a qualidade original.`,
    h1: `Converter ${from} para ${to} Online Grátis`,
    whyConvert: `O formato ${to} oferece melhor compatibilidade e tamanho otimizado para diferentes plataformas e dispositivos de áudio.`,
    benefits: [
      'Compatibilidade com todos players de áudio',
      'Tamanho de arquivo otimizado',
      'Qualidade de áudio preservada',
      'Conversão rápida',
      'Suporte a metadados (tags)'
    ],
    howToSteps: [
      {
        title: 'Upload do Áudio',
        description: `Selecione seu arquivo ${from}`
      },
      {
        title: 'Conversão Automática',
        description: `Convertemos para ${to} mantendo a qualidade`
      },
      {
        title: 'Download',
        description: `Baixe seu arquivo ${to} convertido`
      }
    ],
    technicalComparison: {
      headers: ['Característica', from, to],
      rows: [
        { format: 'Compatibilidade', values: ['Moderada', 'Universal'] },
        { format: 'Tamanho', values: ['Variável', 'Otimizado'] },
        { format: 'Qualidade', values: ['Alta', 'Alta'] }
      ]
    },
    faqs: [
      {
        question: `Por que converter ${from} para ${to}?`,
        answer: `${to} tem melhor compatibilidade com dispositivos e aplicativos de música.`
      },
      {
        question: `A qualidade do áudio é mantida?`,
        answer: `Sim, mantemos a taxa de bits e qualidade do áudio original.`
      }
    ]
  }),
  image: (from: string, to: string): ConversionContent => ({
    title: `Converter ${from} para ${to} Online Grátis - MePassa`,
    description: `Converta ${from} para ${to} online gratuitamente. Conversor de imagem rápido sem perda de qualidade. Sem instalação.`,
    metaDescription: `Conversor online grátis de ${from} para ${to}. Converta imagens ${from} para o formato ${to} mantendo a qualidade original.`,
    h1: `Converter ${from} para ${to} Online Grátis`,
    whyConvert: `O formato ${to} oferece melhor compatibilidade com navegadores e aplicativos, facilitando o compartilhamento e visualização.`,
    benefits: [
      'Compatibilidade universal',
      'Preservação de qualidade',
      'Tamanho otimizado',
      'Conversão instantânea',
      'Mantém metadados EXIF'
    ],
    howToSteps: [
      {
        title: 'Upload da Imagem',
        description: `Selecione sua imagem ${from}`
      },
      {
        title: 'Conversão Automática',
        description: `Convertemos para ${to} preservando qualidade`
      },
      {
        title: 'Download',
        description: `Baixe sua imagem ${to} convertida`
      }
    ],
    technicalComparison: {
      headers: ['Característica', from, to],
      rows: [
        { format: 'Compatibilidade', values: ['Moderada', 'Universal'] },
        { format: 'Transparência', values: ['Suportada', 'Variável'] },
        { format: 'Compressão', values: ['Sem perda', 'Com perda'] }
      ]
    },
    faqs: [
      {
        question: `Quando usar ${to} ao invés de ${from}?`,
        answer: `Use ${to} quando precisar de melhor compatibilidade e menor tamanho de arquivo.`
      },
      {
        question: `A qualidade da imagem é afetada?`,
        answer: `Mantemos a melhor qualidade possível durante a conversão.`
      }
    ]
  }),
  document: (from: string, to: string): ConversionContent => ({
    title: `Converter ${from} para ${to} Online Grátis - MePassa`,
    description: `Converta ${from} para ${to} online gratuitamente. Conversor de documentos rápido e preciso. Sem instalação.`,
    metaDescription: `Conversor online grátis de ${from} para ${to}. Converta documentos ${from} para o formato ${to} mantendo formatação.`,
    h1: `Converter ${from} para ${to} Online Grátis`,
    whyConvert: `Converter ${from} para ${to} facilita edição, compartilhamento e compatibilidade com diferentes aplicativos.`,
    benefits: [
      'Preservação de formatação',
      'Conversão precisa',
      'Mantém imagens e tabelas',
      'Compatibilidade universal',
      'Rápido e seguro'
    ],
    howToSteps: [
      {
        title: 'Upload do Documento',
        description: `Selecione seu arquivo ${from}`
      },
      {
        title: 'Conversão',
        description: `Convertemos para ${to} mantendo formatação`
      },
      {
        title: 'Download',
        description: `Baixe seu documento ${to} convertido`
      }
    ],
    technicalComparison: {
      headers: ['Característica', from, to],
      rows: [
        { format: 'Editável', values: ['Limitado', 'Total'] },
        { format: 'Tamanho', values: ['Menor', 'Maior'] },
        { format: 'Compatibilidade', values: ['Universal', 'Moderada'] }
      ]
    },
    faqs: [
      {
        question: `A formatação é preservada?`,
        answer: `Sim, mantemos fontes, imagens, tabelas e formatação geral do documento.`
      },
      {
        question: `Posso editar após a conversão?`,
        answer: `Sim, o arquivo ${to} convertido é totalmente editável.`
      }
    ]
  })
}

// English templates (simplified, follow same pattern)
const enTemplates = {
  video: (from: string, to: string): ConversionContent => ({
    title: `Convert ${from} to ${to} Online Free - MePassa`,
    description: `Convert ${from} to ${to} online for free. Fast and secure converter with quality preservation. No installation, 100% online.`,
    metaDescription: `Free online ${from} to ${to} converter. Convert ${from} videos to ${to} format maintaining original quality. Fast, secure, and unlimited.`,
    h1: `Convert ${from} to ${to} Online Free`,
    whyConvert: `${from} format may have compatibility issues on some devices. Converting to ${to} ensures universal playback on all browsers, smartphones, and smart TVs.`,
    benefits: [
      'Universal compatibility with all devices',
      'Smaller file size',
      'Better for online sharing',
      'Original quality preservation',
      'Fast server-side conversion'
    ],
    howToSteps: [
      {
        title: 'Upload Video',
        description: `Drag and drop your ${from} file or click to select`
      },
      {
        title: 'Automatic Conversion',
        description: `System automatically converts to ${to} maintaining quality`
      },
      {
        title: 'Download Result',
        description: `Instant download of your converted ${to} video`
      }
    ],
    technicalComparison: {
      headers: ['Feature', from, to],
      rows: [
        { format: 'Compatibility', values: ['Limited', 'Universal'] },
        { format: 'Size', values: ['Larger', 'Optimized'] },
        { format: 'Quality', values: ['High', 'High'] },
        { format: 'Streaming', values: ['Moderate', 'Excellent'] }
      ]
    },
    faqs: [
      {
        question: `What's the difference between ${from} and ${to}?`,
        answer: `${from} and ${to} use different codecs. ${to} has better compatibility and is more suitable for web and streaming.`
      },
      {
        question: `Do I lose quality converting ${from} to ${to}?`,
        answer: `No! Our tool preserves the original video quality during conversion.`
      }
    ]
  }),
  audio: ptTemplates.audio, // Use same logic
  image: ptTemplates.image,
  document: ptTemplates.document
}
