import App, { AppContext, AppProps } from 'next/app'
import LanguageProvider from 'providers/LanguageProvider'
import type { IntlMessagesType } from 'types'
import { defaultlanguage } from 'constants/constants'
import HTMLTagsProvider from 'providers/HTMLTagsProvider'
import DefaultLayout from 'Layouts/DefaultLayout'

import 'theme/globals.css'

interface AppPageProps extends AppProps {
	messages: IntlMessagesType
}

function MyApp({ Component, pageProps, messages }: AppPageProps) {
	return (
		<LanguageProvider messages={messages}>
			<HTMLTagsProvider />
			<DefaultLayout>
				<Component {...pageProps} />
			</DefaultLayout>
		</LanguageProvider>
	)
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<any> => {
	const appProps = await App.getInitialProps(appContext)

	const language = appContext.ctx.locale === 'default' ? defaultlanguage.languageCode : appContext.ctx.locale

	const messages = await import(`@public/static/locales/${language}.json`)

	return {
		...appProps,
		messages
	}
}

export default MyApp
