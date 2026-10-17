export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]
export type Localized = Record<Locale, string>

export const dictionary = {
  en: {
    nav: {
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Contact',
      all: (label: string) => `All ${label}`,
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      primary: 'Primary',
      mobile: 'Mobile',
      language: 'Language',
    },
    hero: {
      tagline: 'Photographer & creative director with an eye for spaces, flavor and story',
      photoAlt: (name: string) => `${name} in a yellow dress standing in a field of sunflowers`,
    },
    portfolio: {
      title: 'Portfolio',
      description: 'Selected work across hotels, food and travel. Tap any photo to view it full size.',
      filterLabel: 'Filter by category',
      all: 'All',
      categories: { stays: 'Stays', taste: 'Taste', places: 'Places' },
    },
    gallery: {
      open: (caption: string) => `Open ${caption} full size`,
      close: 'Close',
      previous: 'Previous image',
      next: 'Next image',
      position: (current: number, total: number) => `${current} / ${total}`,
      thumbnails: 'Thumbnails',
      goTo: (caption: string) => `View ${caption}`,
    },
    footer: {
      workWithMe: 'Work with me',
      phone: 'Phone',
      email: 'Email',
      rights: 'All rights reserved.',
    },
  },
  es: {
    nav: {
      about: 'Sobre mí',
      portfolio: 'Portafolio',
      contact: 'Contacto',
      all: (label: string) => `Todo ${label}`,
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      primary: 'Principal',
      mobile: 'Móvil',
      language: 'Idioma',
    },
    hero: {
      tagline: 'Fotógrafa y directora creativa con ojo para los espacios, el sabor y las historias',
      photoAlt: (name: string) => `${name} con un vestido amarillo en un campo de girasoles`,
    },
    portfolio: {
      title: 'Portafolio',
      description: 'Trabajo seleccionado de hoteles, gastronomía y viajes. Toca cualquier foto para verla en tamaño completo.',
      filterLabel: 'Filtrar por categoría',
      all: 'Todo',
      categories: { stays: 'Estancias', taste: 'Sabor', places: 'Lugares' },
    },
    gallery: {
      open: (caption: string) => `Abrir ${caption} en tamaño completo`,
      close: 'Cerrar',
      previous: 'Imagen anterior',
      next: 'Imagen siguiente',
      position: (current: number, total: number) => `${current} / ${total}`,
      thumbnails: 'Miniaturas',
      goTo: (caption: string) => `Ver ${caption}`,
    },
    footer: {
      workWithMe: 'Trabaja conmigo',
      phone: 'Teléfono',
      email: 'Correo',
      rights: 'Todos los derechos reservados.',
    },
  },
} satisfies Record<Locale, unknown>

export type Dictionary = (typeof dictionary)['en']
