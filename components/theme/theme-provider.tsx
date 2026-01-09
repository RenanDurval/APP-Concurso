'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Carregar tema salvo do localStorage
        const savedTheme = localStorage.getItem('theme') as Theme | null

        if (savedTheme) {
            setThemeState(savedTheme)
            applyTheme(savedTheme)
        } else {
            // Detectar preferência do sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            const initialTheme = prefersDark ? 'dark' : 'light'
            setThemeState(initialTheme)
            applyTheme(initialTheme)
        }
    }, [])

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement

        if (newTheme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
        applyTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    // Evitar flash de conteúdo não estilizado, mas renderizar o provider
    // O hook useTheme irá retornar o valor inicial
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
