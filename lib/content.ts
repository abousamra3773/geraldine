import type { Dictionary, Locale, Localized } from '@/lib/i18n'

export type Category = 'stays' | 'taste' | 'places'

export type PortfolioItem = {
  src: string
  alt: string
  caption: string
  category: Category
}

type LocalizedPortfolioItem = {
  src: string
  alt: Localized
  caption: Localized
  category: Category
}

export type NavGroup = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const artistName = 'Geraldine Thomas'

export const categories: Category[] = ['stays', 'taste', 'places']

export function getNavigation(t: Dictionary): NavGroup[] {
  return [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.portfolio, href: '#portfolio' },
  ]
}

export function localizeItems(items: LocalizedPortfolioItem[], locale: Locale): PortfolioItem[] {
  return items.map((item) => ({
    src: item.src,
    category: item.category,
    alt: item.alt[locale],
    caption: item.caption[locale],
  }))
}

export const portfolio: LocalizedPortfolioItem[] = [
  {
    src: '/images/stays/dali-lounge.jpg',
    category: 'stays',
    alt: {
      en: 'Hotel lounge with white sofas, pink and grey cushions, and a large Dalí "Les Dîners de Gala" tapestry on the wall',
      es: 'Salón de hotel con sofás blancos, cojines rosas y grises, y un gran tapiz de Dalí "Les Dîners de Gala" en la pared',
    },
    caption: { en: 'The Dalí Lounge', es: 'El Salón Dalí' },
  },
  {
    src: '/images/portfolio/cherry-sip.png',
    category: 'taste',
    alt: {
      en: 'Close-up of glossy lips sipping through a curly red straw, glitter-red nails holding a soda bottle',
      es: 'Primer plano de labios brillantes bebiendo con una pajita roja rizada, uñas rojas con brillo sosteniendo una botella',
    },
    caption: { en: 'Cherry Sip', es: 'Sorbo de Cereza' },
  },
  {
    src: '/images/portfolio/neon-rain.png',
    category: 'places',
    alt: {
      en: 'Woman in a camel blazer dress holding a yellow umbrella on a rainy, neon-lit city street at night',
      es: 'Mujer con un vestido blazer color camel sosteniendo un paraguas amarillo en una calle lluviosa iluminada con neones de noche',
    },
    caption: { en: 'Neon Rain', es: 'Lluvia de Neón' },
  },
  {
    src: '/images/portfolio/gilded-service.png',
    category: 'stays',
    alt: {
      en: 'Cream and gold ornate display cart beside a classical statue in a sunlit hotel dining room',
      es: 'Carrito ornamentado en crema y dorado junto a una estatua clásica en un comedor de hotel soleado',
    },
    caption: { en: 'Gilded Service', es: 'Servicio Dorado' },
  },
  {
    src: '/images/portfolio/forest-glow.png',
    category: 'taste',
    alt: {
      en: 'Woman in a sparkling pink leotard and silver headwrap tilting her head back among green forest leaves',
      es: 'Mujer con un maillot rosa brillante y turbante plateado inclinando la cabeza entre hojas verdes del bosque',
    },
    caption: { en: 'Forest Glow', es: 'Brillo del Bosque' },
  },
  {
    src: '/images/portfolio/above-the-coast.png',
    category: 'places',
    alt: {
      en: 'Red cable car gliding over a coastal city at golden hour',
      es: 'Teleférico rojo sobre una ciudad costera en la hora dorada',
    },
    caption: { en: 'Above the Coast', es: 'Sobre la Costa' },
  },
  {
    src: '/images/portfolio/lobby-in-bloom.png',
    category: 'stays',
    alt: {
      en: 'Tall lacquered vase overflowing with pink lilies and branches in an elegant hotel lobby',
      es: 'Jarrón lacado alto lleno de lirios rosas y ramas en un elegante vestíbulo de hotel',
    },
    caption: { en: 'Lobby in Bloom', es: 'Vestíbulo en Flor' },
  },
  {
    src: '/images/portfolio/poolside.png',
    category: 'taste',
    alt: {
      en: 'Woman in a black swimsuit dipping a toe into a blue pool beneath a tall palm tree and bright clouds',
      es: 'Mujer con bañador negro metiendo un pie en una piscina azul bajo una palmera alta y nubes brillantes',
    },
    caption: { en: 'Poolside', es: 'Junto a la Piscina' },
  },
  {
    src: '/images/portfolio/into-the-blue.png',
    category: 'places',
    alt: {
      en: 'Woman wading in clear Mediterranean water facing a white seaside village and mountains',
      es: 'Mujer en las aguas cristalinas del Mediterráneo frente a un pueblo costero blanco y montañas',
    },
    caption: { en: 'Into the Blue', es: 'Hacia el Azul' },
  },
]
