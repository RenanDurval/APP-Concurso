'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

// Icon (using SVG to avoid dependency if lucide not installed, but checking package.json it likely needs lucide-react or heroicons)
// The project has lucide-react? I should check. If not, I'll use SVGs.
// I will use SVGs for safety.

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
    id: string
    title?: string
    description?: string
    type?: ToastType
    duration?: number
}

interface ToastContextType {
    toast: (props: Omit<Toast, 'id'>) => void
    dismiss: (id: string) => void
    toasts: Toast[]
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const toast = useCallback(({ title, description, type = 'info', duration = 3000 }: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9)
        const newToast = { id, title, description, type, duration }

        setToasts((prev) => [...prev, newToast])

        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id))
            }, duration)
        }
    }, [])

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toast, dismiss, toasts }}>
            {children}
            <Toaster />
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

function Toaster() {
    const { toasts, dismiss } = useToast()

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`
                        pointer-events-auto
                        flex items-start gap-3 p-4 rounded-lg shadow-lg border transition-all animate-in slide-in-from-right-full
                        ${t.type === 'success' ? 'bg-white border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200' : ''}
                        ${t.type === 'error' ? 'bg-white border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200' : ''}
                        ${t.type === 'info' ? 'bg-white border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200' : ''}
                        ${t.type === 'warning' ? 'bg-white border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200' : ''}
                    `}
                >
                    <div className="flex-1">
                        {t.title && <h4 className="font-semibold text-sm">{t.title}</h4>}
                        {t.description && <p className="text-sm opacity-90 mt-1">{t.description}</p>}
                    </div>
                    <button
                        onClick={() => dismiss(t.id)}
                        className="text-current opacity-50 hover:opacity-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            ))}
        </div>
    )
}
