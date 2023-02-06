import { defaultlanguage, languages } from 'constants/constants'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import type { LanguageDataItem, LanguagesCodeData } from 'types'

interface MyDocumentProps {
	language: LanguageDataItem
}

function MyDocument({ language }: MyDocumentProps) {
	return (
		<Html>
			<Head />
			<body dir={language.direction}>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

MyDocument.getInitialProps = async (docContext: DocumentContext): Promise<any> => {
	const docProps = await Document.getInitialProps(docContext)

	const lang = docContext.locale === 'default' ? defaultlanguage.languageCode : docContext.locale

	return {
		...docProps,
		language: languages[lang as unknown as keyof typeof LanguagesCodeData]
	}
}

export default MyDocument
