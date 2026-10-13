'use client'

import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { artistName, type NavGroup } from '@/lib/content'
import { useLanguage } from '@/components/language-provider'
import { LanguageToggle } from '@/components/language-toggle'
import { cn } from '@/lib/utils'

export function SiteHeader({ navigation }: { navigation: NavGroup[] }) {
  const { t } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const closeAll = () => {
    setMobileOpen(false)
    setOpenGroup(null)
  }

  return (
    <header className="sticky top-0 z-40 bg-sunshine/95 backdrop-blur supports-[backdrop-filter]:bg-sunshine/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <a href="#about" onClick={closeAll} className="text-lg font-extrabold tracking-tight text-primary">
          {artistName}
        </a>

        <nav aria-label={t.nav.primary} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) =>
              item.children ? (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(item.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    type="button"
                    aria-expanded={openGroup === item.label}
                    aria-controls={`menu-${item.href.slice(1)}`}
                    onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                    className="flex items-center gap-1 text-sm font-bold text-ink transition-colors hover:text-primary"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn('size-4 transition-transform', openGroup === item.label && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={`menu-${item.href.slice(1)}`}
                    className={cn(
                      'absolute left-1/2 top-full -translate-x-1/2 pt-3',
                      openGroup === item.label ? 'block' : 'hidden',
                    )}
                  >
                    <ul className="min-w-44 bg-cream py-2 shadow-lg ring-1 ring-border">
                      <li>
                        <a
                          href={item.href}
                          onClick={closeAll}
                          className="block px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary"
                        >
                          {t.nav.all(item.label)}
                        </a>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            onClick={closeAll}
                            className="block px-4 py-2 text-sm font-bold text-ink hover:bg-sunshine hover:text-primary"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <a href={item.href} className="text-sm font-bold text-ink transition-colors hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ),
            )}
            <li>
              <LanguageToggle />
            </li>
            <li>
              <a
                href="#contact"
                className="bg-primary px-5 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
              >
                {t.nav.contact}
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
        <LanguageToggle />
        <button
          type="button"
          className="text-primary"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          <span className="sr-only">{mobileOpen ? t.nav.closeMenu : t.nav.openMenu}</span>
        </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label={t.nav.mobile} className="border-t border-primary/15 bg-sunshine md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-primary/10 py-3 last:border-none">
                <a href={item.href} onClick={closeAll} className="text-xl font-extrabold text-primary">
                  {item.label}
                </a>
                {item.children && (
                  <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 pl-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a href={child.href} onClick={closeAll} className="text-sm font-semibold text-ink">
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contact"
                onClick={closeAll}
                className="inline-block bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
              >
                {t.nav.contact}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
