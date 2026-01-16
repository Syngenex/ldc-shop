'use client'

import { useEffect } from 'react'

// OKLCH hue values for each theme color
const THEME_HUES: Record<string, number> = {
    purple: 270,  // Default
    blue: 240,
    cyan: 200,
    green: 150,
    orange: 45,
    pink: 330,
    red: 25,
}

interface ThemeColorProviderProps {
    color: string | null
    children: React.ReactNode
}

export function ThemeColorProvider({ color, children }: ThemeColorProviderProps) {
    useEffect(() => {
        const hue = THEME_HUES[color || 'purple'] || 270
        const root = document.documentElement

        // Light mode primary colors
        root.style.setProperty('--primary', `oklch(0.45 0.2 ${hue})`)
        root.style.setProperty('--ring', `oklch(0.45 0.2 ${hue})`)
        root.style.setProperty('--sidebar-primary', `oklch(0.45 0.2 ${hue})`)
        root.style.setProperty('--sidebar-ring', `oklch(0.45 0.2 ${hue})`)
        root.style.setProperty('--glow-primary', `oklch(0.55 0.25 ${hue} / 0.3)`)

        // Chart colors
        root.style.setProperty('--chart-1', `oklch(0.55 0.22 ${hue})`)

        // For dark mode, we need to use slightly different values
        // This is handled by CSS cascade - dark mode will override these
        const darkStyles = document.createElement('style')
        darkStyles.id = 'theme-color-dark'
        darkStyles.textContent = `
            .dark {
                --primary: oklch(0.7 0.2 ${hue});
                --ring: oklch(0.7 0.2 ${hue});
                --sidebar-primary: oklch(0.7 0.2 ${hue});
                --sidebar-ring: oklch(0.7 0.2 ${hue});
                --glow-primary: oklch(0.6 0.25 ${hue} / 0.4);
                --chart-1: oklch(0.7 0.22 ${hue});
            }
        `
        
        // Remove old style if exists
        const oldStyle = document.getElementById('theme-color-dark')
        if (oldStyle) {
            oldStyle.remove()
        }
        document.head.appendChild(darkStyles)

        return () => {
            const style = document.getElementById('theme-color-dark')
            if (style) {
                style.remove()
            }
        }
    }, [color])

    return <>{children}</>
}
