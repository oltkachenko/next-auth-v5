"use client"

import { UserButton } from '@/components/auth/UserButton';
import { Button } from '@/components/ui/button';
import { pathName } from '@/router/router';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm'>
            <div className='flex gap-x-2'>
                <Button 
                    asChild
                    variant={pathname === "/server" ? "default" : "outline"}
                >
                    <Link href="/server">
                        Server
                    </Link>
                </Button>

                <Button 
                    asChild
                    variant={pathname === "/client" ? "default" : "outline"}
                >
                    <Link href="/client">
                        Client
                    </Link>
                </Button>

                <Button 
                    asChild
                    variant={pathname === "/admin" ? "default" : "outline"}
                >
                    <Link href="/admin">
                        Admin
                    </Link>
                </Button>

                <Button 
                    asChild
                    variant={pathname === pathName.settings.path ? "default" : "outline"}
                >
                    <Link href={pathName.settings.path}>
                        {pathName.settings.title}
                    </Link>
                </Button>
            </div>
            
            <UserButton />
        </nav>
    )
}
