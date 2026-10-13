export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]
export type Localized = Record<Locale, string>

export const dictionary = {
  en: {
    nav: {
      about: 'About',
      world: 'World',
      stays: 'Stays',
      taste: 'Taste',
      places: 'Places',
      creativeDirection: 'Creative Direction',
      moodBoard: 'Mood Board',
      brands: 'Brands',
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
    sections: {
      worldBannerAlt: 'Hotel lounge with a large Dalí tapestry above white sofas',
      bannerImage: (title: string) => `${title} banner image`,
      stays: 'Hotels, lobbies and the details that make a stay unforgettable. Tap any image to view it full size.',
      taste: 'Tables, kitchens and the flavors found along the way.',
      places: 'Streets, landscapes and the light of every destination.',
      moodBoard: 'References, palettes and textures that set the tone for each project.',
      brands: 'Campaigns and collaborations, from concept to final frame.',
    },
    gallery: {
      open: (caption: string) => `Open ${caption} full size`,
      close: 'Close',
    previous: 'Previous image',
    next: 'Next image',
    label: 'Image gallery, scroll horizontally',
    count: (n: number) => `${n} images · Scroll`,
    },
    footer: {
      closingImage: 'Closing image',
      workWithMe: 'Work with me',
      phone: 'Phone',
      email: 'Email',
      rights: 'All rights reserved.',
    },
  },
  es: {
    nav: {
      about: 'Sobre mí',
      world: 'Mundo',
      stays: 'Estancias',
      taste: 'Sabor',
      places: 'Lugares',
      creativeDirection: 'Dirección Creativa',
      moodBoard: 'Mood Board',
      brands: 'Marcas',
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
    sections: {
      worldBannerAlt: 'Salón de hotel con un gran tapiz de Dalí sobre sofás blancos',
      bannerImage: (title: string) => `Imagen de portada de ${title}`,
      stays: 'Hoteles, vestíbulos y los detalles que hacen inolvidable una estancia. Toca cualquier imagen para verla en tamaño completo.',
      taste: 'Mesas, cocinas y los sabores descubiertos en el camino.',
      places: 'Calles, paisajes y la luz de cada destino.',
      moodBoard: 'Referencias, paletas y texturas que marcan el tono de cada proyecto.',
      brands: 'Campañas y colaboraciones, del concepto a la imagen final.',
    },
    gallery: {
      open: (caption: string) => `Abrir ${caption} en tamaño completo`,
      close: 'Cerrar',
    previous: 'Imagen anterior',
    next: 'Imagen siguiente',
    label: 'Galería de imágenes, desplázate horizontalmente',
    count: (n: number) => `${n} imágenes · Desliza`,
    },
    footer: {
      closingImage: 'Imagen de cierre',
      workWithMe: 'Trabaja conmigo',
      phone: 'Teléfono',
      email: 'Correo',
      rights: 'Todos los derechos reservados.',
    },
  },
} satisfies Record<Locale, unknown>

export type Dictionary = (typeof dictionary)['en']
