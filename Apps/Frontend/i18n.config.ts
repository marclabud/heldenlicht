export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'en',
  messages: {
    de: {
      meta: {
        title: 'HELDENLICHT — HeroFest Fotografie & Cosplay',
        description: 'Hochmoderne Dark-Mode Fotogalerie für Cosplay und Convention-Atmosphäre am HeroFest (Bernexpo).'
      },
      header: {
        location: 'HeroFest Bernexpo',
        locationDetail: 'Bern, Schweiz',
        cdnStatus: 'Cloudflare R2 Edge CDN',
        photosCount: '{count} Fotos',
        titlePart1: 'HELDEN',
        titlePart2: 'LICHT',
        subtitle: 'HeroFest Fotografie & Cosplay',
        heroDescription: 'High-Performance Galerie für episches Cosplay-Handwerk, Bühnenmomente und Convention-Atmosphäre an der Bernexpo.',
        searchPlaceholder: 'Suche nach Cosplayer, Charakter, Bühne, Tag...'
      },
      categories: {
        all: 'Alle Fotos',
        cosplay: 'Cosplay',
        stage: 'Bühne & Shows',
        gaming: 'Gaming & Esports',
        atmosphere: 'Atmosphäre',
        portraits: 'Porträts'
      },
      gallery: {
        showingCount: 'Zeige {filtered} von {total} Aufnahmen',
        matching: 'passend zu „{query}“',
        resetFilters: 'Filter zurücksetzen',
        noPhotosFound: 'Keine Fotos gefunden',
        noPhotosDescription: 'Keine Treffer für „{query}“ in dieser Kategorie. Passe deine Suche an oder setze die Filter zurück.',
        clearFilters: 'Filter löschen',
        featured: 'Empfohlen'
      },
      lightbox: {
        counter: '{current} / {total}',
        fullRes: 'Original',
        fullResTitle: 'Originalauflösung in neuem Tab öffnen',
        close: 'Schliessen (Esc)',
        prev: 'Vorheriges Foto (Pfeil links)',
        next: 'Nächstes Foto (Pfeil rechts)',
        photoBy: 'Foto:',
        bernexpo: 'Bernexpo'
      },
      footer: {
        title: 'HELDENLICHT',
        description: 'Cosplay- und Convention-Fotografie-Portfolio für das HeroFest an der Bernexpo.',
        cloudflarePages: 'Bereitgestellt auf Cloudflare Pages',
        cloudflareR2: 'Assets über Cloudflare R2 ausgeliefert',
        copyright: '© {year} Heldenlicht • heldenlicht.ch'
      },
      language: {
        toggleLabel: 'Sprache wechseln',
        de: 'DE',
        en: 'EN'
      }
    },
    en: {
      meta: {
        title: 'HELDENLICHT — HeroFest Photography & Cosplay',
        description: 'High-performance dark-mode photography portfolio and cosplay gallery tailored for HeroFest (Bernexpo).'
      },
      header: {
        location: 'HeroFest Bernexpo',
        locationDetail: 'Bern, Switzerland',
        cdnStatus: 'Cloudflare R2 Edge CDN',
        photosCount: '{count} Photos',
        titlePart1: 'HELDEN',
        titlePart2: 'LICHT',
        subtitle: 'HeroFest Photography & Cosplay',
        heroDescription: 'High-performance dark gallery capturing epic cosplay craftsmanship, stage moments, and convention atmosphere at Bernexpo.',
        searchPlaceholder: 'Search cosplayer, character, stage, tag...'
      },
      categories: {
        all: 'All Photos',
        cosplay: 'Cosplay',
        stage: 'Stage & Shows',
        gaming: 'Gaming & Esports',
        atmosphere: 'Atmosphere',
        portraits: 'Portraits'
      },
      gallery: {
        showingCount: 'Showing {filtered} of {total} captures',
        matching: 'matching "{query}"',
        resetFilters: 'Reset filters',
        noPhotosFound: 'No photos found',
        noPhotosDescription: 'No matches found for "{query}" in this category. Try adjusting your search query or reset filters.',
        clearFilters: 'Clear filters',
        featured: 'Featured'
      },
      lightbox: {
        counter: '{current} / {total}',
        fullRes: 'Full Res',
        fullResTitle: 'Open full resolution in new tab',
        close: 'Close modal (Esc)',
        prev: 'Previous photo (Arrow Left)',
        next: 'Next photo (Arrow Right)',
        photoBy: 'Photo:',
        bernexpo: 'Bernexpo'
      },
      footer: {
        title: 'HELDENLICHT',
        description: 'Dedicated cosplay and convention photography portfolio for HeroFest at Bernexpo.',
        cloudflarePages: 'Deployed on Cloudflare Pages',
        cloudflareR2: 'Assets served via Cloudflare R2',
        copyright: '© {year} Heldenlicht • heldenlicht.ch'
      },
      language: {
        toggleLabel: 'Toggle language',
        de: 'DE',
        en: 'EN'
      }
    }
  }
}))
