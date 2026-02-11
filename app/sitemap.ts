import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mepassa.live'
  const locales = ['pt', 'en']
  
  // Main pages
  const mainPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '', priority: 0.8, changeFrequency: 'weekly' as const }, // Home - duplicate for each anchor
  ]
  
  // Conversion pages - high priority for SEO
  const conversions = [
    // Video conversions
    { from: 'mov', to: 'mp4', priority: 0.95 },
    { from: 'avi', to: 'mp4', priority: 0.9 },
    { from: 'mkv', to: 'mp4', priority: 0.9 },
    { from: 'mp4', to: 'gif', priority: 0.95 },
    { from: 'webm', to: 'mp4', priority: 0.85 },
    
    // Audio conversions
    { from: 'mp3', to: 'ogg', priority: 0.85 },
    { from: 'wav', to: 'mp3', priority: 0.9 },
    { from: 'm4a', to: 'mp3', priority: 0.9 },
    { from: 'ogg', to: 'mp3', priority: 0.8 },
    { from: 'flac', to: 'mp3', priority: 0.85 },
    
    // Image conversions
    { from: 'heic', to: 'jpg', priority: 0.95 },
    { from: 'png', to: 'jpg', priority: 0.9 },
    { from: 'jpg', to: 'png', priority: 0.9 },
    { from: 'webp', to: 'png', priority: 0.9 },
    { from: 'webp', to: 'jpg', priority: 0.85 },
    { from: 'svg', to: 'png', priority: 0.8 },
    
    // Document conversions
    { from: 'pdf', to: 'docx', priority: 0.85 },
    { from: 'docx', to: 'pdf', priority: 0.9 },
  ]
  
  const urls: MetadataRoute.Sitemap = []
  
  // Add main pages for each locale
  locales.forEach(locale => {
    mainPages.forEach(page => {
      urls.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            pt: `${baseUrl}/pt${page.path}`,
            en: `${baseUrl}/en${page.path}`,
          }
        }
      })
    })
    
    // Add conversion pages (programmatic SEO pages)
    conversions.forEach(conversion => {
      const conversionSlug = `${conversion.from}-para-${conversion.to}`
      const conversionSlugEn = `${conversion.from}-to-${conversion.to}`
      
      urls.push({
        url: `${baseUrl}/${locale}/converter/${locale === 'pt' ? conversionSlug : conversionSlugEn}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: conversion.priority,
        alternates: {
          languages: {
            pt: `${baseUrl}/pt/converter/${conversionSlug}`,
            en: `${baseUrl}/en/converter/${conversionSlugEn}`,
          }
        }
      })
    })
    
    // Add utility pages
    const utilityPages = [
      { path: '/comprimir-video', priority: 0.85 },
      { path: '/comprimir-imagem', priority: 0.85 },
      { path: '/formatos', priority: 0.7 },
    ]
    
    utilityPages.forEach(util => {
      urls.push({
        url: `${baseUrl}/${locale}${util.path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: util.priority,
        alternates: {
          languages: {
            pt: `${baseUrl}/pt${util.path}`,
            en: `${baseUrl}/en${util.path}`,
          }
        }
      })
    })
  })
  
  return urls
}
