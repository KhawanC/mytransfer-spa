// Schema.org JSON-LD generators for SEO

export interface WebApplicationSchemaProps {
  locale: string
  name: string
  description: string
  url: string
}

export function generateWebApplicationSchema({
  locale,
  name,
  description,
  url
}: WebApplicationSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "alternateName": "MyTransfer",
    "url": url,
    "description": description,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": locale === 'pt' ? "BRL" : "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      locale === 'pt' 
        ? "Conversão gratuita de arquivos"
        : "Free file conversion",
      locale === 'pt'
        ? "Transferência P2P segura"
        : "Secure P2P transfer",
      locale === 'pt'
        ? "Criptografia ponta-a-ponta"
        : "End-to-end encryption",
      locale === 'pt'
        ? "Sem limite de tamanho"
        : "No size limit",
      locale === 'pt'
        ? "Suporte a 50+ formatos"
        : "Support for 50+ formats"
    ],
    "author": {
      "@type": "Organization",
      "name": "MePassa",
      "url": url
    },
    "datePublished": "2026-01-01",
    "dateModified": new Date().toISOString(),
    "inLanguage": locale === 'pt' ? "pt-BR" : "en-US"
  }
}

export interface HowToSchemaProps {
  locale: string
  name: string
  description: string
  steps: Array<{ name: string; text: string }>
  totalTimeMinutes?: number
}

export function generateHowToSchema({
  locale,
  name,
  description,
  steps,
  totalTimeMinutes = 2
}: HowToSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "inLanguage": locale === 'pt' ? "pt-BR" : "en-US",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": `#step-${index + 1}`
    })),
    "totalTime": `PT${totalTimeMinutes}M`,
    "tool": {
      "@type": "HowToTool",
      "name": "MePassa Web App"
    },
    "supply": {
      "@type": "HowToSupply",
      "name": locale === 'pt' ? "Arquivo para converter" : "File to convert"
    }
  }
}

export interface SoftwareApplicationSchemaProps {
  locale: string
  name: string
  description: string
  url: string
  features: string[]
  category: 'video' | 'audio' | 'image' | 'document'
}

export function generateSoftwareApplicationSchema({
  locale,
  name,
  description,
  url,
  features,
  category
}: SoftwareApplicationSchemaProps) {
  const categoryMap = {
    video: "MultimediaApplication",
    audio: "MultimediaApplication",
    image: "DesignApplication",
    document: "BusinessApplication"
  }

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "url": url,
    "description": description,
    "applicationCategory": categoryMap[category],
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": locale === 'pt' ? "BRL" : "USD"
    },
    "featureList": features,
    "screenshot": `${url}/screenshot.png`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "ratingCount": "850"
    }
  }
}

export interface FAQSchemaProps {
  locale: string
  questions: Array<{ question: string; answer: string }>
}

export function generateFAQSchema({
  locale,
  questions
}: FAQSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": locale === 'pt' ? "pt-BR" : "en-US",
    "mainEntity": questions.map(qa => ({
      "@type": "Question",
      "name": qa.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer
      }
    }))
  }
}

export interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>
}

export function generateBreadcrumbSchema({
  items
}: BreadcrumbSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export interface OrganizationSchemaProps {
  locale: string
  url: string
  logoUrl: string
  contactEmail?: string
}

export function generateOrganizationSchema({
  locale,
  url,
  logoUrl,
  contactEmail
}: OrganizationSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MePassa",
    "alternateName": "MyTransfer",
    "url": url,
    "logo": logoUrl,
    "description": locale === 'pt' 
      ? "Plataforma gratuita para transferência e conversão de arquivos online"
      : "Free platform for online file transfer and conversion",
    "foundingDate": "2026",
    "contactPoint": contactEmail ? {
      "@type": "ContactPoint",
      "email": contactEmail,
      "contactType": "customer support",
      "availableLanguage": ["Portuguese", "English"]
    } : undefined,
    "sameAs": [
      // Add social media links when available
      // "https://twitter.com/mepassa",
      // "https://facebook.com/mepassa",
      // "https://linkedin.com/company/mepassa"
    ]
  }
}

// Helper function to inject JSON-LD into page
export function injectJSONLD(schema: object) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      key={`jsonld-${JSON.stringify(schema).substring(0, 50)}`}
    />
  )
}
