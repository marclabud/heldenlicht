// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: [
    'types/openapi.d.ts',
    '**/*.d.ts'
  ]
})
