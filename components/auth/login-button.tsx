'use client'

import { useRouter } from "next/navigation";
import { pathName } from "@/router/router"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/LoginForm";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean
}

export const LoginButton = ({children, mode = "redirect", asChild}: LoginButtonProps) => {
    const router = useRouter()

    const onClick = () => {
        router.push(pathName.login.path)
    }

    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className="p-0 w-auto bg-transparent border-none">
                    <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }
    
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}