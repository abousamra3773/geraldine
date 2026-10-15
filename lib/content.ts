import type { Dictionary, Locale, Localized } from '@/lib/i18n'

export type GalleryItem = {
  src?: string
  alt: string
  caption: string
}

type LocalizedGalleryItem = {
  src?: string
  alt: Localized
  caption: Localized
}

export type NavGroup = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const artistName = 'Geraldine Thomas'

export function getNavigation(t: Dictionary): NavGroup[] {
  return [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.contact, href: '#contact' },
  ]
}

export function localizeItems(items: LocalizedGalleryItem[], locale: Locale): GalleryItem[] {
  return items.map((item) => ({ src: item.src, alt: item.alt[locale], caption: item.caption[locale] }))
}

const GALLERY_SIZE = 10

function fillGallery(items: LocalizedGalleryItem[], label: Localized): LocalizedGalleryItem[] {
  const extras = Array.from({ length: Math.max(0, GALLERY_SIZE - items.length) }, (_, i) => {
    const n = String(items.length + i + 1).padStart(2, '0')
    return {
      alt: { en: `${label.en} image placeholder ${n}`, es: `Espacio para imagen de ${label.es} ${n}` },
      caption: { en: `${label.en} ${n}`, es: `${label.es} ${n}` },
    }
  })
  return [...items, ...extras]
}

export const stays: LocalizedGalleryItem[] = fillGallery([
  {
    alt: {
      en: 'Hotel lounge with white sofas, pink and grey cushions, and a large Dalí "Les Dîners de Gala" tapestry on the wall',
      es: 'Salón de hotel con sofás blancos, cojines rosas y grises, y un gran tapiz de Dalí "Les Dîners de Gala" en la pared',
    },
    caption: { en: 'The Dalí Lounge', es: 'El Salón Dalí' },
  },
  {
    alt: {
      en: 'Cream and gold ornate display cart beside a classical statue in a sunlit hotel dining room',
      es: 'Carrito ornamentado en crema y dorado junto a una estatua clásica en un comedor de hotel soleado',
    },
    caption: { en: 'Gilded Service', es: 'Servicio Dorado' },
  },
  {
    alt: {
      en: 'Tall lacquered vase overflowing with pink lilies and branches in an elegant hotel lobby',
      es: 'Jarrón lacado alto lleno de lirios rosas y ramas en un elegante vestíbulo de hotel',
    },
    caption: { en: 'Lobby in Bloom', es: 'Vestíbulo en Flor' },
  },
], { en: 'Stay', es: 'Estancia' })

export const taste: LocalizedGalleryItem[] = fillGallery([
  {
    alt: {
      en: 'Close-up of glossy lips sipping through a curly red straw, glitter-red nails holding a Coca-Cola bottle',
      es: 'Primer plano de labios brillantes bebiendo con una pajita roja rizada, uñas rojas con brillo sosteniendo una botella de Coca-Cola',
    },
    caption: { en: 'Cherry Sip', es: 'Sorbo de Cereza' },
  },
  {
    alt: {
      en: 'Woman in a sparkling pink leotard and silver headwrap tilting her head back among green forest leaves',
      es: 'Mujer con un maillot rosa brillante y turbante plateado inclinando la cabeza entre hojas verdes del bosque',
    },
    caption: { en: 'Forest Glow', es: 'Brillo del Bosque' },
  },
  {
    alt: {
      en: 'Woman in a black swimsuit dipping a toe into a blue pool beneath a tall palm tree and bright clouds',
      es: 'Mujer con bañador negro metiendo un pie en una piscina azul bajo una palmera alta y nubes brillantes',
    },
    caption: { en: 'Poolside', es: 'Junto a la Piscina' },
  },
], { en: 'Taste', es: 'Gusto' })

export const places: LocalizedGalleryItem[] = fillGallery([
  {
    alt: {
      en: 'Woman in a camel blazer dress holding a yellow umbrella on a rainy, neon-lit city street at night',
      es: 'Mujer con un vestido blazer color camel sosteniendo un paraguas amarillo en una calle lluviosa iluminada con neones de noche',
    },
    caption: { en: 'Neon Rain', es: 'Lluvia de Neón' },
  },
  {
    alt: {
      en: 'Red cable car with a Lebanese flag gliding over a coastal city at golden hour',
      es: 'Teleférico rojo con la bandera libanesa sobre una ciudad costera en la hora dorada',
    },
    caption: { en: 'Above the Coast', es: 'Sobre la Costa' },
  },
  {
    alt: {
      en: 'Woman wading in clear Mediterranean water facing a white seaside village and mountains',
      es: 'Mujer en las aguas cristalinas del Mediterráneo frente a un pueblo costero blanco y montañas',
    },
    caption: { en: 'Into the Blue', es: 'Hacia el Azul' },
  },
], { en: 'Place', es: 'Lugar' })
