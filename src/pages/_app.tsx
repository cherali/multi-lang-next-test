import type { AppProps } from 'next/app'
import 'theme/globals.css'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
