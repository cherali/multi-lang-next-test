import type { ReactNode } from 'react'
import type {
  MissingTranslationError,
  MessageFormatError,
  MissingDataError,
  InvalidConfigError,
  UnsupportedFormatterError,
  FormatError
} from 'react-intl'
import type { IntlMessagesType } from 'types'

export interface LanguageProviderProps {
  children: ReactNode;
  messages:IntlMessagesType;
}

export type IError =
  MissingTranslationError |
  MessageFormatError |
  MissingDataError |
  InvalidConfigError |
  UnsupportedFormatterError |
  FormatError

export interface LanguageProviderContextProps {
  language: any;
  messages: any;
}