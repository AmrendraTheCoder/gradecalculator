'use client'
import React from "react"
import Link from "next/link"
import { Button } from "./ui/button"

// Importing Components
import Nav from "./Nav"
import MobileNav from "./MobileNav"
import { useUser, UserButton } from "@clerk/clerk-react"  // Import UserButton from @clerk/clerk-react

function Header() {

    return (
        <header className="py-8 xl:py-12 text-black">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <h1 className="text-4xl font-semibold cursor-pointer">
                        GraderX<span className="text-accent">.</span>
                    </h1>
                </Link>

                {/* Navigation & Hire Me Button */}
                <div className="hidden xl:flex items-center gap-8">
                    <Nav />
                </div>

                
                {/* Mobile Navigation */}
                <div className="xl:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}

export default Header;