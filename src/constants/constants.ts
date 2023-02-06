import type { ILanguages } from 'constants/index.d'
import type { LanguageDataItem } from 'types'

export const languages: ILanguages = {
  fa: {
    languageCode: 'fa',
    direction: 'rtl',
    textAlign: 'right',
    reverseTextAlign: 'left',
    code: 'fa_IR',
  },
  en: {
    languageCode: 'en',
    direction: 'ltr',
    textAlign: 'left',
    reverseTextAlign: 'right',
    code: 'en_US',
  },

  // this object will never used and added for fixing build error due 'default' is a language in next.confing.js
  default: {
    languageCode: 'fa',
    direction: 'rtl',
    textAlign: 'right',
    reverseTextAlign: 'left',
    code: 'fa_IR',
  },
}

export const defaultlanguage: LanguageDataItem = languages.fa
