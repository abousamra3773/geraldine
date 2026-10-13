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
    {
      label: t.nav.world,
      href: '#world',
      children: [
        { label: t.nav.stays, href: '#stays' },
        { label: t.nav.taste, href: '#taste' },
        { label: t.nav.places, href: '#places' },
      ],
    },
    {
      label: t.nav.creativeDirection,
      href: '#creative-direction',
      children: [
        { label: t.nav.moodBoard, href: '#mood-board' },
        { label: t.nav.brands, href: '#brands' },
      ],
    },
  ]
}

export function localizeItems(items: LocalizedGalleryItem[], locale: Locale): GalleryItem[] {
  return items.map((item) => ({ src: item.src, alt: item.alt[locale], caption: item.caption[locale] }))
}

export const stays: LocalizedGalleryItem[] = [
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
]

export const taste: LocalizedGalleryItem[] = [
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
]

export const places: LocalizedGalleryItem[] = [
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
]

export const moodBoard: LocalizedGalleryItem[] = [1, 2, 3].map((n) => ({
  alt: { en: `Mood board placeholder ${n}`, es: `Espacio para mood board ${n}` },
  caption: { en: `Mood 0${n}`, es: `Mood 0${n}` },
}))

export const brands: LocalizedGalleryItem[] = [1, 2, 3].map((n) => ({
  alt: { en: `Brand campaign placeholder ${n}`, es: `Espacio para campaña de marca ${n}` },
  caption: { en: `Brand 0${n}`, es: `Marca 0${n}` },
}))
