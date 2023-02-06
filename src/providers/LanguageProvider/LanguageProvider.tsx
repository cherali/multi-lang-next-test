import { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import { IntlProvider, ReactIntlErrorCode } from 'react-intl'

import { defaultlanguage, languages } from 'constants/constants'
import type { LanguageProviderProps, IError } from './index.d'
import type { LanguagesCodeData } from 'types'

const LanguageProvider: FC<LanguageProviderProps> = ({ children, messages }) => {
	const { locale = defaultlanguage.languageCode } = useRouter()
	const currentLanguage = languages[locale as unknown as keyof typeof LanguagesCodeData]

	const handleError = useCallback((err: IError) => {
		if (process.env.NODE_ENV === 'development') {
			if (err.code === ReactIntlErrorCode.MISSING_TRANSLATION) {
				return console.warn({ message: err.message }, '[MISSING_TRANSLATION]')
			}

			console.error({ type: ReactIntlErrorCode[err.code as ReactIntlErrorCode], ...err }, '[TRANSLATIONs]')
		}
	}, [])

	return (
		<IntlProvider
			locale={currentLanguage.languageCode}
			messages={messages}
			defaultLocale={locale}
			onError={handleError}
		>
			{Boolean(messages) ? children : <span>loading...</span>}
		</IntlProvider>
	)
}

export default LanguageProvider
