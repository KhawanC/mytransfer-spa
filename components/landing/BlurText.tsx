"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
    wordDelay?: number;
}

export const BlurText = ({ text, className, delay = 0, wordDelay = 0.05 }: BlurTextProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className={cn("inline-block", className)}
        >
            {text}
        </motion.div>
    );
};
