<template>
  <div class="min-h-screen bg-[#F7F5F2] text-[#1F1F1F] font-sans antialiased flex flex-col items-center justify-center p-6 selection:bg-[#D84C3F]/10 selection:text-[#D84C3F]">
    <div class="max-w-xl w-full bg-white border border-[#EBE8E2] rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
      <div class="flex items-center space-x-3 text-[#D84C3F]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-current fill-none" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.64 8.38m6.06 6a14.68 14.68 0 01-6.06-6m6.06 6H7.5a6.07 6.07 0 01-6-6v-.37a6.07 6.07 0 016-6h3.06m0 0a14.98 14.98 0 0012.12-6.16" />
        </svg>
        <h1 class="text-2xl font-bold tracking-tight text-[#1F1F1F]">Nuxt 4 + Tailwind v4 Starter</h1>
      </div>
      <p class="text-[#666666] leading-relaxed">
        Willkommen in deinem neuen standardisierten Monorepo! Dieses Template ist perfekt vorbereitet für die autonome Weiterentwicklung durch <strong>Antigravity 2.0</strong>.
      </p>
      <div class="border-t border-[#EBE8E2] pt-4 space-y-2">
        <div class="text-xs font-semibold text-[#666666] uppercase tracking-wider">Erste Schritte</div>
        <ul class="text-sm text-[#1F1F1F] space-y-2">
          <li class="flex items-start">
            <span class="text-[#6BA368] mr-2">✓</span>
            <span>Editiere <code>specs/business/business-spec.md</code> für deine Anforderungen.</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6BA368] mr-2">✓</span>
            <span>Konfiguriere API & Design-Tokens in <code>docs/Antigravity_Agent_Context.md</code>.</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6BA368] mr-2">✓</span>
            <span>Starte den Entwicklungs-Server mit <code>pnpm dev</code>.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
