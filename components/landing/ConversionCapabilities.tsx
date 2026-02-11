"use client";

import { motion } from "framer-motion";
import { FileAudio, FileImage, FileVideo, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function ConversionCapabilities() {
    const t = useTranslations("ConversionCapabilities");

    const formats = [
        {
            category: t("categories.audio"),
            icon: <FileAudio className="w-6 h-6" />,
            types: ["MP3", "WAV", "OGG", "AAC", "FLAC"],
            color: "bg-orange-500/10 text-orange-500",
        },
        {
            category: t("categories.image"),
            icon: <FileImage className="w-6 h-6" />,
            types: ["JPG", "PNG", "WEBP", "GIF", "SVG"],
            color: "bg-purple-500/10 text-purple-500",
        },
        {
            category: t("categories.video"),
            icon: <FileVideo className="w-6 h-6" />,
            types: ["MP4", "WEBM", "MOV", "AVI", "MKV"],
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            category: t("categories.documents"),
            icon: <FileText className="w-6 h-6" />,
            types: ["PDF", "DOCX", "XLSX", "TXT", "PPTX"],
            color: "bg-green-500/10 text-green-500",
        },
    ];

    const features = [
        t("features.processing"),
        t("features.quality"),
        t("features.largeFiles"),
        t("features.preview"),
    ];

    return (
        <section id="conversion" className="py-24 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl -z-10" />

            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <Badge variant="outline" className="px-3 py-1 text-sm border-primary/20 text-primary">
                            {t("badge")}
                        </Badge>
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                            {t("title")}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t("description")}
                        </p>

                        <ul className="space-y-3 mt-4">
                            {features.map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {formats.map((format, index) => (
                            <motion.div
                                key={format.category}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="p-6 rounded-2xl border bg-card/50 backdrop-blur hover:shadow-lg transition-all hover:bg-card"
                            >
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${format.color}`}>
                                    {format.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{format.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {format.types.map((type) => (
                                        <span key={type} className="text-xs font-medium px-2 py-1 rounded-md bg-muted text-muted-foreground">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
