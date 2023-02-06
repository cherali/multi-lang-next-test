import type { FC } from 'react'
import type { DefaultLayoutProps } from './index.d'
import DefaultHeader from './DefaultHeader'

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
	return (
		<>
			<DefaultHeader />
			{children}
		</>
	)
}

export default DefaultLayout
