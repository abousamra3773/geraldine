'use client'

import Image from 'next/image'
import { AtSign, Mail } from 'lucide-react'
import { artistName } from '@/lib/content'
import { useLanguage } from '@/components/language-provider'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="about" className="grid scroll-mt-20 md:grid-cols-2">
      <div className="flex flex-col justify-between gap-12 bg-sunshine px-6 py-12 md:px-10 md:py-16">
        <h1 className="text-balance text-6xl font-extrabold leading-[0.9] tracking-tight text-primary sm:text-7xl lg:text-8xl">
          {artistName}
        </h1>
        <a
          href="#contact"
          className="w-fit bg-primary px-10 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
        >
          {t.nav.contact}
        </a>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden bg-accent md:aspect-auto md:min-h-[32rem]">
        <Image
          src="/images/about/sunflowers.jpg"
          alt={t.hero.photoAlt(artistName)}
          fill
          priority
          sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    </section>
  )
}

export function ContactFooter() {
  const { t } = useLanguage()

  return (
    <footer id="contact" className="border-t-8 border-background">
      <div className="bg-primary px-6 py-12 text-primary-foreground md:px-10 md:py-14">
        <div className="flex items-start justify-between gap-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-sunshine md:text-5xl">{t.footer.workWithMe}</h2>
          <div className="flex items-center gap-3 pt-2 text-sunshine">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-cream">
              <AtSign className="size-5" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="mailto:hello@yourwebsite.com" className="hover:text-cream">
              <Mail className="size-5" aria-hidden="true" />
              <span className="sr-only">{t.footer.email}</span>
            </a>
          </div>
        </div>
        <dl className="mt-10 flex flex-wrap gap-x-16 gap-y-6 text-sm">
          <div>
            <dt className="font-bold">{t.footer.phone}</dt>
            <dd className="mt-1 text-primary-foreground/85">
              <a href="tel:1234567890" className="hover:underline">
                123-456-7890
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-bold">{t.footer.email}</dt>
            <dd className="mt-1 text-primary-foreground/85">
              <a href="mailto:hello@yourwebsite.com" className="hover:underline">
                hello@yourwebsite.com
              </a>
            </dd>
          </div>
        </dl>
        <p className="mt-12 text-xs text-primary-foreground/70">
          {'© '}
          {new Date().getFullYear()} {artistName}. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
