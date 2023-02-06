import { FormattedMessage } from 'react-intl'

export default function Home() {
	return (
		<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
			<p className='text-4xl mt-2'>
				<FormattedMessage id='app.header.home' defaultMessage='' />
			</p>
		</div>
	)
}
