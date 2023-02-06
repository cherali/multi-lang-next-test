import { FC, useCallback, useEffect, useTransition } from 'react'
import { useRouter } from 'next/router'
import { IntlProvider, ReactIntlErrorCode } from 'react-intl'

import { defaultlanguage, languages } from 'constants/constants'
import type { LanguageProviderProps, IError } from './index.d'
import type { LanguagesCodeData } from 'types'
import LanguageProviderContext from './LanguageProviderContext'

const LanguageProvider: FC<LanguageProviderProps> = ({ children, messages }) => {
	const [isPending, startTransition] = useTransition()

	const { locale = defaultlanguage.languageCode } = useRouter()
	const language = languages[locale as unknown as keyof typeof LanguagesCodeData]

	useEffect(() => {
		if (!isPending) {
			startTransition(() => {
				document.body.dir = language.direction
			})
		}
	}, [language])

	const handleError = useCallback((err: IError) => {
		if (process.env.NODE_ENV === 'development') {
			if (err.code === ReactIntlErrorCode.MISSING_TRANSLATION) {
				return console.warn({ message: err.message }, '[MISSING_TRANSLATION]')
			}

			console.error({ type: ReactIntlErrorCode[err.code as ReactIntlErrorCode], ...err }, '[TRANSLATIONs]')
		}
	}, [])

	return (
		<LanguageProviderContext.Provider
			value={{
				language
			}}
		>
			<IntlProvider locale={language.languageCode} messages={messages} defaultLocale={locale} onError={handleError}>
				{Boolean(messages) ? children : <span>loading...</span>}
			</IntlProvider>
		</LanguageProviderContext.Provider>
	)
}

export default LanguageProvider
