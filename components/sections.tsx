'use client'

import Image from 'next/image'
import { AtSign, Mail } from 'lucide-react'
import { artistName, type GalleryItem } from '@/lib/content'
import { ImagePlaceholder } from '@/components/image-placeholder'
import { Gallery } from '@/components/gallery'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="about" className="grid scroll-mt-20 md:grid-cols-2">
      <div className="flex flex-col justify-between gap-12 bg-sunshine px-6 py-12 md:px-10 md:py-16">
        <div>
          <h1 className="text-balance text-6xl font-extrabold leading-[0.9] tracking-tight text-primary sm:text-7xl lg:text-8xl">
            {artistName}
          </h1>
          <p className="mt-6 max-w-xs text-xs font-semibold uppercase leading-relaxed tracking-widest text-ink">
            {t.hero.tagline}
          </p>
        </div>
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

export function Banner({
  id,
  title,
  imageSrc,
  imageAlt,
  links,
}: {
  id: string
  title: string
  imageSrc?: string
  imageAlt?: string
  links: { label: string; href: string }[]
}) {
  const { t } = useLanguage()

  return (
    <section id={id} className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-sunshine sm:aspect-[16/7]">
      {imageSrc ? (
        <Image src={imageSrc} alt={imageAlt ?? ''} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
      ) : (
        <div className="absolute inset-0">
          <ImagePlaceholder label={t.sections.bannerImage(title)} tone="sunshine" className="items-start justify-end border-none pb-6" />
        </div>
      )}
      <div className="relative flex flex-col items-center gap-4 px-4">
        <h2 className="text-balance bg-primary px-8 py-3 text-center text-4xl font-extrabold tracking-tight text-sunshine sm:text-6xl md:px-12 md:text-7xl">
          {title}
        </h2>
        <ul className="flex flex-wrap justify-center gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block bg-cream px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-sunshine"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function GallerySection({
  id,
  eyebrow,
  title,
  description,
  items,
  tone,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
  items: GalleryItem[]
  tone: 'cream' | 'sunshine'
}) {
  return (
    <section
      id={id}
      className={cn('px-6 py-16 md:px-10 md:py-24', tone === 'cream' ? 'bg-cream' : 'bg-sunshine')}
    >
      <div className="grid gap-10 md:grid-cols-[1fr_2.2fr] md:gap-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ink/70">{eyebrow}</p>
          <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-primary md:text-5xl">{title}</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink">{description}</p>
        </div>
        <Gallery items={items} tone={tone} carousel={id} />
      </div>
    </section>
  )
}

export function ContactFooter() {
  const { t } = useLanguage()

  return (
    <footer id="contact" className="border-t-8 border-background">
      <div className="aspect-[16/7] bg-sunshine sm:aspect-[16/5]">
        <ImagePlaceholder label={t.footer.closingImage} tone="sunshine" className="border-none" />
      </div>
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
