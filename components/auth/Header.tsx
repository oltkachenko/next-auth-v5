import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import type React from "react"

const font = Poppins({
    subsets: ['latin'],
    weight: ["600"]
})

interface HeaderProps {
    label: string,
}

export function Header({label}: HeaderProps) {
    return (
        <div className="flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
                "text-3xl font-semibold",
                font.className
            )}>🔐Auth</h1>
            <p className="text-muted-foreground text-small">
                { label }
            </p>
        </div>
    )
}
