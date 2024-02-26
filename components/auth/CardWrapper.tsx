'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/auth/Header";
import { Social } from "@/components/auth/Social";
import { BackButton } from "@/components/auth/BackButton";

interface CardWrapperProps {
    children?: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean
}

export function CardWrapper({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial = false
}: CardWrapperProps) {
  return (
    <Card className="w-[400px]">
        <CardHeader>
            <Header label={headerLabel} />
        </CardHeader>

        {children && (
            <CardContent>
                {children}
            </CardContent>
        )}
        

        {showSocial && (
            <CardFooter>
                <Social />
            </CardFooter>
        )}

        <CardFooter>
            <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
    </Card>
  )
}
