'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DashboardNav() {
    const pathname = usePathname()

    const links = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/concursos', label: 'Concursos' },
        { href: '/dashboard/bancas', label: 'Bancas' },
        { href: '/dashboard/questoes', label: 'Questões' },
        { href: '/dashboard/historico', label: 'Histórico' },
        { href: '/dashboard/perfil', label: 'Perfil' },
        { href: '/dashboard/assinatura', label: 'Assinatura' },
    ]

    return (
        <nav className="flex items-center gap-6 text-sm font-medium">
            {links.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`transition-colors ${isActive
                            ? 'text-primary-600 dark:text-primary-400 font-bold'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {link.label}
                    </Link>
                )
            })}
        </nav>
    )
}
