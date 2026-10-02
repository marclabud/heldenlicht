<script setup lang="ts">
const { locale, setLocale, t } = useI18n()

const toggleLocale = (code: 'de' | 'en') => {
  setLocale(code)
}
</script>

<template>
  <div
    class="inline-flex items-center p-1 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-inner backdrop-blur-sm"
    role="group"
    :aria-label="t('language.toggleLabel')"
  >
    <button
      type="button"
      class="px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
      :class="[
        locale === 'de'
          ? 'bg-amber-500 text-zinc-950 shadow-sm shadow-amber-500/20'
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
      ]"
      :aria-pressed="locale === 'de'"
      @click="toggleLocale('de')"
    >
      {{ t('language.de') }}
    </button>

    <button
      type="button"
      class="px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
      :class="[
        locale === 'en'
          ? 'bg-amber-500 text-zinc-950 shadow-sm shadow-amber-500/20'
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
      ]"
      :aria-pressed="locale === 'en'"
      @click="toggleLocale('en')"
    >
      {{ t('language.en') }}
    </button>
  </div>
</template>
