import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/auth/session-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ToastProvider } from "@/components/ui/use-toast";

export const metadata: Metadata = {
    title: "App de Concursos - Sua Aprovação Começa Aqui",
    description: "Análise inteligente de editais, geração de questões com IA e estatísticas completas para sua preparação em concursos públicos.",
    keywords: ["concursos públicos", "editais", "questões", "preparação", "banca examinadora", "estatísticas"],
    authors: [{ name: "App de Concursos" }],
    openGraph: {
        title: "App de Concursos - Sua Aprovação Começa Aqui",
        description: "Análise inteligente de editais com IA para concursos públicos",
        type: "website",
        locale: "pt_BR",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className="antialiased">
                <ThemeProvider>
                    <SessionProvider>
                        <ToastProvider>
                            {children}
                        </ToastProvider>
                    </SessionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
