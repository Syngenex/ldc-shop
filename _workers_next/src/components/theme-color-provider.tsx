'use client'

import { useEffect } from 'react'

// OKLCH hue values for each theme color
const THEME_HUES: Record<string, number> = {
    purple: 270,  // Default
    blue: 240,
    cyan: 200,
    green: 150,
    orange: 45,
    red: 25,
    pink: 330, // legacy
    black: 0,
}
const THEME_CHROMA: Record<string, number> = {
    black: 0,
}

interface ThemeColorProviderProps {
    color: string | null
    children: React.ReactNode
}

export function ThemeColorProvider({ color, children }: ThemeColorProviderProps) {
    useEffect(() => {
        const hue = THEME_HUES[color || 'purple'] || 270
        const chroma = THEME_CHROMA[color || 'purple'] ?? 1
        const root = document.documentElement

        root.style.setProperty('--theme-hue', String(hue))
        root.style.setProperty('--theme-chroma', String(chroma))
    }, [color])

    return <>{children}</>
}
