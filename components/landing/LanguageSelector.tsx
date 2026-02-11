"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Globe } from "lucide-react";

export function LanguageSelector() {
    const t = useTranslations("Navbar"); // Just for consistency, though we might not use keys here
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const onSelectChange = (value: string) => {
        const nextLocale = value;
        startTransition(() => {
            // Replace the locale in the pathname
            // Assuming pathname starts with /pt or /en
            const segments = pathname.split('/');
            segments[1] = nextLocale;
            const newPath = segments.join('/');

            router.replace(newPath);
        });
    };

    return (
        <Select value={locale} onValueChange={onSelectChange} disabled={isPending}>
            <SelectTrigger className="w-[100px] bg-transparent border-none focus:ring-0 focus:ring-offset-0 gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent align="end">
                <SelectItem value="pt">PT-BR</SelectItem>
                <SelectItem value="en">EN-US</SelectItem>
            </SelectContent>
        </Select>
    );
}
