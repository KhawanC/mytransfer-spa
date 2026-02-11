"use client";

import { Button } from "@/components/ui/button";
import { BackgroundPaths } from "./BackgroundPaths";
import { BlurText } from "./BlurText";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-16">
            <BackgroundPaths />

            <div className="container px-4 md:px-6 relative z-10 text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-6">
                        {t("newVersion")}
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl text-balance">
                        <BlurText text={t("titlePrefix")} className="block text-foreground" delay={0.2} />
                        <BlurText text={t("titleSuffix")} className="text-primary block mt-2" delay={0.4} />
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-lg md:text-xl mt-6 px-4"
                    >
                        {t("description")}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 w-full px-4"
                >
                    <Button size="lg" className="h-12 px-8 text-lg gap-2 cursor-pointer shadow-lg shadow-primary/20 transition-transform hover:scale-105 w-full sm:w-auto" asChild>
                        <Link href={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/register`} target="_blank">
                            {t("startNow")} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>

                {/* Feature badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="flex flex-wrap justify-center gap-8 mt-16 text-sm font-medium text-muted-foreground"
                >
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <span>{t("badges.instantTransfer")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span>{t("badges.e2eEncryption")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-blue-500" />
                        <span>{t("badges.limitlessConversion")}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
