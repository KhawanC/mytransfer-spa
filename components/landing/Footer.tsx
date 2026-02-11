"use client";

import Link from "next/link";
import { FileUp, Twitter, Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-background border-t border-border">
            <div className="container px-4 md:px-6 py-12 md:py-16 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                            <div className="bg-primary text-primary-foreground p-1 rounded-lg">
                                <FileUp className="w-5 h-5" />
                            </div>
                            <span>MePassa</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            {t("description")}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">{t("product")}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#how-it-works" className="hover:text-foreground transition-colors">{t("howItWorks") || "Como Funciona"}</Link></li>
                            <li><Link href="#features" className="hover:text-foreground transition-colors">{t("benefits") || "Benefícios"}</Link></li>
                            <li><Link href="#premium" className="hover:text-foreground transition-colors">{t("premium") || "Premium"}</Link></li>
                            <li><Link href="/changelog" className="hover:text-foreground transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">{t("legal")}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-foreground transition-colors">{t("privacy")}</Link></li>
                            <li><Link href="/terms" className="hover:text-foreground transition-colors">{t("terms")}</Link></li>
                            <li><Link href="/cookie" className="hover:text-foreground transition-colors">{t("cookies")}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">{t("social")}</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="w-5 h-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="w-5 h-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} {t("rights")}</p>
                </div>
            </div>
        </footer>
    );
}
