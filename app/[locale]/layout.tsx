import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from "next/navigation";
import { generateWebApplicationSchema, generateOrganizationSchema, injectJSONLD } from "@/lib/seo-schemas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages: any = await getMessages({ locale });
  const t = messages.Metadata;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mepassa.live';
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    title: {
      default: t?.title || "MePassa",
      template: "%s | MePassa"
    },
    description: t?.description || "File Transfer",
    keywords: t?.keywords?.split(', ') || [],
    authors: [{ name: "MePassa Team" }],
    creator: "MePassa",
    publisher: "MePassa",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'pt-BR': `${baseUrl}/pt`,
        'en': `${baseUrl}/en`,
      }
    },
    openGraph: {
      title: t?.title || "MePassa",
      description: t?.description,
      type: "website",
      locale: locale === 'pt' ? "pt_BR" : "en_US",
      siteName: "MePassa",
      url: canonicalUrl,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t?.title || "MePassa",
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: t?.title,
      description: t?.description,
      images: [`${baseUrl}/og-image.png`],
      creator: "@mepassa",
      site: "@mepassa",
    },
    verification: {
      google: 'google-site-verification-code', // Add real code after Google Search Console setup
    },
    category: 'technology',
  };
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!['en', 'pt'].includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = messages as any;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mepassa.live';
  
  // Generate structured data schemas
  const webAppSchema = generateWebApplicationSchema({
    locale,
    name: t.Metadata?.title || "MePassa",
    description: t.Metadata?.description || "",
    url: baseUrl
  });
  
  const orgSchema = generateOrganizationSchema({
    locale,
    url: baseUrl,
    logoUrl: `${baseUrl}/logo.png`,
    contactEmail: "equipe@khawantech.online"
  });

  return (
    <html lang={locale === 'pt' ? 'pt-BR' : 'en'} suppressHydrationWarning>
      <head>
        {injectJSONLD(webAppSchema)}
        {injectJSONLD(orgSchema)}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
