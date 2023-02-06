import type { LanguageDataItem, LanguagesCode } from 'types'

// language
export type ILanguages = Record<LanguagesCode | 'default', LanguageDataItem>
