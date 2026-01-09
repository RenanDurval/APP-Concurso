import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full px-4 py-2.5 rounded-lg border transition-all duration-200',
                        'bg-white dark:bg-slate-800',
                        'text-slate-900 dark:text-white',
                        'placeholder:text-slate-400 dark:placeholder:text-slate-500',
                        'focus:outline-none focus:ring-2 focus:ring-offset-0',
                        error
                            ? 'border-danger-500 focus:ring-danger-500'
                            : 'border-slate-300 dark:border-slate-600 focus:ring-primary-500 focus:border-primary-500',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-danger-600 dark:text-danger-400">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export { Input }
