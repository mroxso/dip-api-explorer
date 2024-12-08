'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <header className="pl-4 md:pl-8 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex flex-1 items-center justify-between md:justify-start">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <span className="font-bold">Bundestag Explorer</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-4">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Home
            </Link>
            <Link
              href="/statistics"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/statistics" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Statistics
            </Link>
            <Link
              href="/persons"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/persons" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Persons
            </Link>
          </nav>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/" ? "text-foreground" : "text-foreground/60"
                  )}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                <Link
                  href="/statistics"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/statistics" ? "text-foreground" : "text-foreground/60"
                  )}
                  onClick={handleLinkClick}
                >
                  Statistics
                </Link>
                <Link
                  href="/persons"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/persons" ? "text-foreground" : "text-foreground/60"
                  )}
                  onClick={handleLinkClick}
                >
                  Persons
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

