"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/contractor", label: "Contractor Dashboard" },
  { href: "/admin", label: "Admin Dashboard" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              {/* Replace CC box with image */}
              <img
                src="/logo.jpeg"
                alt="Samadhan Logo"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="font-bold text-lg">Samadhan</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#FAC638] relative py-2",
                    pathname === item.href
                      ? "text-[#FAC638] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FAC638] after:rounded-full"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
