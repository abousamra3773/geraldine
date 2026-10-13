'use client'

import { SiteHeader } from '@/components/site-header'
import { Banner, ContactFooter, GallerySection, Hero } from '@/components/sections'
import { useLanguage } from '@/components/language-provider'
import { getNavigation, localizeItems, places, stays, taste } from '@/lib/content'

export function Portfolio() {
  const { locale, t } = useLanguage()
  const navigation = getNavigation(t)
  const worldLinks = navigation.find((n) => n.href === '#world')?.children ?? []

  return (
    <div className="mx-auto max-w-6xl bg-cream shadow-sm">
      <SiteHeader navigation={navigation} />
      <main className="flex flex-col gap-2 bg-background">
        <Hero />

        <Banner
          id="world"
          title={t.nav.world}
          imageSrc="/images/stays/dali-lounge.jpg"
          imageAlt={t.sections.worldBannerAlt}
          links={worldLinks}
        />
        <GallerySection
          id="stays"
          eyebrow={t.nav.world}
          title={t.nav.stays}
          description={t.sections.stays}
          items={localizeItems(stays, locale)}
          tone="sunshine"
        />
        <GallerySection
          id="taste"
          eyebrow={t.nav.world}
          title={t.nav.taste}
          description={t.sections.taste}
          items={localizeItems(taste, locale)}
          tone="cream"
        />
        <GallerySection
          id="places"
          eyebrow={t.nav.world}
          title={t.nav.places}
          description={t.sections.places}
          items={localizeItems(places, locale)}
          tone="sunshine"
        />
      </main>
      <ContactFooter />
    </div>
  )
}
