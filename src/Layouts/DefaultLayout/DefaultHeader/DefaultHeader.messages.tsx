import { defineMessages } from 'react-intl'

const languageScope = 'app.language'
const headerScope = 'app.header'

export const DefaultHeaderMessages = defineMessages({
	fa: {
		id: `${languageScope}.fa`,
		defaultMessage: 'FA'
	},
	en: {
		id: `${languageScope}.en`,
		defaultMessage: 'EN'
	},
	home: {
		id: `${headerScope}.home`,
		defaultMessage: 'Home'
	},
	events: {
		id: `${headerScope}.events`,
		defaultMessage: 'Events'
	},
	aboutUs: {
		id: `${headerScope}.aboutUs`,
		defaultMessage: 'About us'
	},
	contactUs: {
		id: `${headerScope}.contactUs`,
		defaultMessage: 'Contact us'
	}
})
