import type { FC } from 'react'
import { useIntl } from 'react-intl'
import { NextSeo } from 'next-seo'
import type { HTMLTagsProviderProps } from './index.d'
import { HTMLTagsProviderMessages } from './HTMLTagsProvider.message'

type MessageKey = keyof typeof HTMLTagsProviderMessages

const HTMLTagsProvider: FC<HTMLTagsProviderProps> = () => {
	const { formatMessage } = useIntl()
	const pageTitleKey = 'default'

	const messages = HTMLTagsProviderMessages[pageTitleKey as MessageKey]

	return (
		<NextSeo
			description={formatMessage(HTMLTagsProviderMessages.siteDescription)}
			title={messages ? formatMessage(messages) : ''}
		/>
	)
}

export default HTMLTagsProvider
