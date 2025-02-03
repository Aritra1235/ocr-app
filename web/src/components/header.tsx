"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { MobileNav } from "@/components/mobile-nav"

const navItems = [
    { href: "/api", label: "API" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/about", label: "About Me" },
]

export function Header() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link className="flex items-center space-x-2" href="/">
                        <span className="text-xl font-bold">OCR</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition-colors hover:text-foreground/80 ${
                                pathname === item.href ? "text-foreground" : "text-foreground/60"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <MobileNav />
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle theme"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}

