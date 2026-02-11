"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSelector } from "@/components/landing/LanguageSelector";
import { motion } from "framer-motion";
import { FileUp, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: t("howItWorks"), href: "#how-it-works" },
    { name: t("benefits"), href: "#benefits" },
    { name: t("conversion"), href: "#conversion" },
    { name: t("premium"), href: "#premium" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="bg-primary text-primary-foreground p-1 rounded-lg">
            <FileUp className="w-5 h-5" />
          </div>
          <span>MePassa</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
          <Button asChild variant="ghost">
            <a href={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"} target="_blank" rel="noopener noreferrer">{t("login")}</a>
          </Button>
          <Button asChild>
            <a href={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"} target="_blank" rel="noopener noreferrer">{t("startNow")}</a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium p-2 hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-2">
            <Button asChild variant="outline" className="w-full">
              <a href={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"} target="_blank" rel="noopener noreferrer">{t("login")}</a>
            </Button>
            <Button asChild className="w-full">
              <a href={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"} target="_blank" rel="noopener noreferrer">{t("startNow")}</a>
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
