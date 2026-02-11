"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ScanQrCode, UploadCloud, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";

export function HowItWorks() {
    const t = useTranslations("HowItWorks");

    const steps = [
        {
            icon: <LogIn className="w-10 h-10 text-primary" />,
            title: t("step1.title"),
            description: t("step1.description"),
        },
        {
            icon: <ScanQrCode className="w-10 h-10 text-primary" />,
            title: t("step2.title"),
            description: t("step2.description"),
        },
        {
            icon: <UploadCloud className="w-10 h-10 text-primary" />,
            title: t("step3.title"),
            description: t("step3.description"),
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-muted/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("title")}</h2>
                    <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <Card className="h-full border-none shadow-lg bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
                                <CardHeader className="flex flex-col items-center gap-4 pb-2">
                                    <div className="p-4 rounded-full bg-primary/10 mb-2">
                                        {step.icon}
                                    </div>
                                    <CardTitle className="text-xl">{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-muted-foreground">
                                    {step.description}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
