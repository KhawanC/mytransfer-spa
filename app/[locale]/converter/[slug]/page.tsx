import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { 
  getConversionBySlug, 
  generateConversionContent,
  type ConversionConfig 
} from '@/lib/conversions.config'
import { 
  generateSoftwareApplicationSchema, 
  generateHowToSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  injectJSONLD 
} from '@/lib/seo-schemas'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight, Upload, Download, Zap } from 'lucide-react'
import Link from 'next/link'

interface ConversionPageProps {
  params: Promise<{
    locale: 'pt' | 'en'
    slug: string
  }>
}

export async function generateMetadata({ params }: ConversionPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const conversion = getConversionBySlug(slug, locale)
  
  if (!conversion) {
    return {}
  }
  
  const content = generateConversionContent(conversion, locale)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mepassa.live'
  const canonicalUrl = `${baseUrl}/${locale}/converter/${slug}`
  
  return {
    title: content.title,
    description: content.metaDescription,
    keywords: [
      `converter ${conversion.from} para ${conversion.to}`,
      `${conversion.from} to ${conversion.to}`,
      `conversor ${conversion.from}`,
      `${conversion.category} converter`,
      'online converter',
      'free converter'
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'pt-BR': `${baseUrl}/pt/converter/${conversion.slug.pt}`,
        'en': `${baseUrl}/en/converter/${conversion.slug.en}`,
      }
    },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: canonicalUrl,
      siteName: 'MePassa',
      images: [
        {
          url: `${baseUrl}/og-${conversion.category}.png`,
          width: 1200,
          height: 630,
          alt: content.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.metaDescription,
      images: [`${baseUrl}/og-${conversion.category}.png`],
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}

export default async function ConversionPage({ params }: ConversionPageProps) {
  const { locale, slug } = await params
  const t = await getTranslations()
  
  const conversion = getConversionBySlug(slug, locale)
  
  if (!conversion) {
    notFound()
  }
  
  const content = generateConversionContent(conversion, locale)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mepassa.live'
  const currentUrl = `${baseUrl}/${locale}/converter/${slug}`
  
  // Generate schemas
  const softwareSchema = generateSoftwareApplicationSchema({
    locale,
    name: content.title,
    description: content.description,
    url: currentUrl,
    features: content.benefits,
    category: conversion.category
  })
  
  const howToSchema = generateHowToSchema({
    locale,
    name: `${locale === 'pt' ? 'Como converter' : 'How to convert'} ${conversion.from} ${locale === 'pt' ? 'para' : 'to'} ${conversion.to}`,
    description: content.description,
    steps: content.howToSteps.map(s => ({ name: s.title, text: s.description })),
    totalTimeMinutes: 2
  })
  
  const faqSchema = generateFAQSchema({
    locale,
    questions: content.faqs
  })
  
  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: `${baseUrl}/${locale}` },
      { name: locale === 'pt' ? 'Conversores' : 'Converters', url: `${baseUrl}/${locale}/converter` },
      { name: `${conversion.from} → ${conversion.to}`, url: currentUrl }
    ]
  })

  return (
    <>
      {injectJSONLD(softwareSchema)}
      {injectJSONLD(howToSchema)}
      {injectJSONLD(faqSchema)}
      {injectJSONLD(breadcrumbSchema)}
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-linear-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="outline" className="text-sm">
                {conversion.category.toUpperCase()} {locale === 'pt' ? 'Conversão' : 'Conversion'}
              </Badge>
              
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {content.h1}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {content.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="gap-2" asChild>
                  <a href={process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'} target="_blank" rel="noopener noreferrer">
                    <Upload className="w-5 h-5" />
                    {locale === 'pt' ? 'Converter Agora' : 'Convert Now'}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href={process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'} target="_blank" rel="noopener noreferrer">
                    {locale === 'pt' ? 'Ver Exemplo' : 'See Example'}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>{locale === 'pt' ? 'Conversão em segundos' : 'Conversion in seconds'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{locale === 'pt' ? 'Qualidade preservada' : 'Quality preserved'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-primary" />
                  <span>{locale === 'pt' ? 'Download instantâneo' : 'Instant download'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Convert Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">
              {locale === 'pt' 
                ? `Por que converter ${conversion.from} para ${conversion.to}?`
                : `Why convert ${conversion.from} to ${conversion.to}?`}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {content.whyConvert}
            </p>
            
            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-4">
              {content.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How To Section */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {locale === 'pt' 
                ? `Como converter ${conversion.from} para ${conversion.to}`
                : `How to convert ${conversion.from} to ${conversion.to}`}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {content.howToSteps.map((step, i) => (
                <Card key={i} id={`step-${i + 1}`}>
                  <CardHeader>
                    <div className="text-4xl font-bold text-primary mb-2">{i + 1}</div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Comparison */}
        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'pt' ? 'Comparação Técnica' : 'Technical Comparison'}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    {content.technicalComparison.headers.map((header, i) => (
                      <th key={i} className="text-left p-4 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.technicalComparison.rows.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4 font-medium">{row.format}</td>
                      {row.values.map((value, j) => (
                        <td key={j} className="p-4 text-muted-foreground">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'pt' ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
            </h2>
            
            <div className="space-y-6">
              {content.faqs.map((faq, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'pt' 
                ? 'Pronto para converter seus arquivos?'
                : 'Ready to convert your files?'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {locale === 'pt'
                ? 'Comece agora gratuitamente. Sem cadastro necessário.'
                : 'Start now for free. No registration required.'}
            </p>
            <Button size="lg" className="gap-2" asChild>
              <a href={process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'} target="_blank" rel="noopener noreferrer">
                {locale === 'pt' ? 'Converter Agora' : 'Convert Now'}
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}

// Generate static params for all conversions
export async function generateStaticParams() {
  const { conversions } = await import('@/lib/conversions.config')
  const locales = ['pt', 'en'] as const
  
  const params: Array<{ locale: string; slug: string }> = []
  
  locales.forEach(locale => {
    conversions.forEach(conversion => {
      params.push({
        locale,
        slug: conversion.slug[locale]
      })
    })
  })
  
  return params
}
