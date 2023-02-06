export enum LanguagesCodeData { 'fa', 'en' }

export type LanguagesCode = keyof typeof LanguagesCodeData

export interface LanguageDataItem {
  languageCode: LanguagesCode;
  direction: 'rtl' | 'ltr';
  textAlign: 'right' | 'left';
  reverseTextAlign: 'right' | 'left';
  code: string;
}

export type IntlMessagesType = Record<MessageIds, string> | Record<MessageIds, MessageFormatElement[]>