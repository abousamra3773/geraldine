'use client'

import useSWR from 'swr'
import type { GalleryItem } from '@/lib/content'

const PRETZEL_BASE_URL = 'https://pretzel-it.com'
const PRETZEL_DOMAIN = 'geraldinethomas.vercel.app'

type PretzelCarouselImage = {
  id: string
  url: string
  filename?: string
  alt?: string
}

type PretzelCarousels = Record<string, PretzelCarouselImage[]>

// Mirrors embed.js: resolve the site from its domain, then read the published
// live_content.carousels map ({ "<name>": [{ id, url, filename, alt }] }, order = array position).
async function fetchPretzelCarousels(): Promise<PretzelCarousels> {
  const resolveRes = await fetch(`${PRETZEL_BASE_URL}/api/domains/resolve/${PRETZEL_DOMAIN}`)
  if (!resolveRes.ok) return {}
  const { siteId } = (await resolveRes.json()) as { siteId?: string }
  if (!siteId) return {}

  const contentRes = await fetch(`${PRETZEL_BASE_URL}/api/embed/${siteId}`)
  if (!contentRes.ok) return {}
  const { content } = (await contentRes.json()) as { content?: { carousels?: unknown } }
  const carousels = content?.carousels
  return carousels && typeof carousels === 'object' && !Array.isArray(carousels)
    ? (carousels as PretzelCarousels)
    : {}
}

export function usePretzelCarousel(name: string | undefined, fallback: GalleryItem[]): GalleryItem[] {
  const { data } = useSWR(name ? 'pretzel:carousels' : null, fetchPretzelCarousels, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  const images = name ? data?.[name]?.filter((image) => image?.url) : undefined
  if (!images?.length) return fallback

  return images.map((image) => ({
    src: image.url,
    alt: image.alt ?? '',
    caption: image.alt ?? '',
  }))
}
