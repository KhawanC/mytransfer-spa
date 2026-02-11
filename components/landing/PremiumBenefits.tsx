"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function PremiumBenefits() {
    const t = useTranslations("PremiumBenefits");

    const benefits = [
        t("list.unlimited"),
        t("list.group"),
        t("list.upload"),
        t("list.maxFiles"),
    ];

    return (
        <section id="premium" className="py-24 bg-gradient-to-b from-background to-muted/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("title")}</h2>
                    <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="relative overflow-hidden border-primary/50 shadow-2xl">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                    {t("card.recommended")}
                                </span>
                            </div>
                            <CardHeader className="text-center pb-8 border-b">
                                <CardTitle className="text-2xl font-bold">{t("card.title")}</CardTitle>
                                <CardDescription className="text-base mt-2">
                                    {t("card.description")}
                                </CardDescription>
                                <div className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <span className="text-4xl font-bold tracking-tight text-foreground">{t("card.price")}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-8">
                                <ul role="list" className="space-y-4 text-sm leading-6 text-muted-foreground">
                                    {benefits.map((benefit, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-x-3 text-foreground"
                                        >
                                            <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                                            {benefit}
                                        </motion.li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="pb-8 pt-4">
                                <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20" size="lg" asChild>
                                    <Link href={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/subscribe`} target="_blank">
                                        {t("card.cta")}
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
