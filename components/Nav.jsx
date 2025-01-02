"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Grade Predictor',
        path: '/protected',
    },
]

function Nav() {

    const pathname = usePathname();
    console.log(pathname);

    return (
        <nav className="flex gap-8">
            {
                links.map((link, index) => {
                    return (
                        <Link key={index} href={link.path} className={`${pathname === link.path && 'text-accent border-b-2 border-accent' } capitalize font-medium hover:text-accent translation-all `}>
                            <h1 className="">
                                {link.name}
                            </h1>
                        </Link>
                    )
                }
                )
            }
        </nav>
    )
}

export default Nav