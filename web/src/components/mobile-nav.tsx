"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navItems = [
    { href: "/api", label: "API" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/about", label: "About Me" },
]

export function MobileNav() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    return (
        <div className="md:hidden">
        <button className="p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle mobile menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
    {isOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-border/40 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 p-4">
        <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
                    <Link
                        key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                }`}
        onClick={() => setIsOpen(false)}
    >
        {item.label}
        </Link>
    ))}
        </nav>
        </div>
    )}
    </div>
)
}
