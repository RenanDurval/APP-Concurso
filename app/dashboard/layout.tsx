import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth/auth-options"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <span className="font-bold sm:inline-block">APP Concursos</span>
                        </Link>
                        <DashboardNav />
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {session.user?.name}
                            </span>
                            <Link href="/api/auth/signout">
                                <Button variant="ghost" size="sm">Sair</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 container py-6">
                {children}
            </main>
        </div>
    )
}
