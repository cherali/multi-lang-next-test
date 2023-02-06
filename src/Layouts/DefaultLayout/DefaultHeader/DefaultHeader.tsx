import { FC, useEffect, useRef, useState, useTransition } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import type { DefaultHeaderProps } from './index.d'
import { DefaultHeaderMessages } from './DefaultHeader.messages'
import useLanugage from 'providers/LanguageProvider/useLanguage'

const DefaultHeader: FC<DefaultHeaderProps> = () => {
	const { pathname, push, asPath, events } = useRouter()
	const { formatMessage } = useIntl()
	const ref = useRef<HTMLDivElement>(null)
	const [menuOpen, setMenuOpen] = useState(false)
	const [languageOpen, setLanguageOpen] = useState(false)
	const { language } = useLanugage()
	const [isPending, startTransition] = useTransition()

	const desktopMenuClasses = 'text-sm'
	const smMenuClasses = 'text-base block'

	const menuClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium'
	const menuSelectedClasses = 'bg-gray-900 text-white px-3 py-2 rounded-md font-medium'

	const headerLinks = [
		{ title: formatMessage(DefaultHeaderMessages.home), linkTo: '/' },
		{ title: formatMessage(DefaultHeaderMessages.events), linkTo: '/events' },
		{ title: formatMessage(DefaultHeaderMessages.aboutUs), linkTo: '/about-us' },
		{ title: formatMessage(DefaultHeaderMessages.contactUs), linkTo: '/contact-us' }
	]

	const languageItems = [
		{ title: formatMessage(DefaultHeaderMessages.fa), linkTo: 'fa', value: 'fa' },
		{ title: formatMessage(DefaultHeaderMessages.en), linkTo: 'en', value: 'en' }
	]

	const handleToggleMenu = () => {
		setLanguageOpen(false)
		setMenuOpen(s => !s)
	}

	const handleToggleLanguageList = () => {
		setMenuOpen(false)
		setLanguageOpen(s => !s)
	}

	const onClickLanguage = (locale: string) => () => {
		push(asPath, undefined, { locale }).then(r => {
			startTransition(() => {
				setLanguageOpen(false)
			})
		})
	}

	const closeMenu = () => setMenuOpen(false)

	// handle click outside
	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (ref.current && !ref.current.contains(event.target) && !isPending) {
				startTransition(() => {
					setMenuOpen && setMenuOpen(false)
					setLanguageOpen && setLanguageOpen(false)
				})
			}
		}
		events.on('routeChangeComplete', closeMenu)

		document.addEventListener('click', handleClickOutside, true)
		return () => {
			events.off('routeChangeComplete', closeMenu)
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [])

	return (
		<div ref={ref}>
			<nav className='bg-gray-800'>
				<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
					<div className='relative flex h-16 items-center justify-between'>
						<div
							className={clsx(
								'absolute inset-y-0 flex items-center sm:hidden',
								language.direction === 'ltr' ? 'left-0' : 'right-0'
							)}
						>
							{/* Mobile menu button */}
							<button
								type='button'
								className={clsx(
									menuOpen && '',
									'inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
								)}
								aria-controls='mobile-menu'
								aria-expanded='false'
								onClick={handleToggleMenu}
							>
								<span className='sr-only'>Open Menu</span>
								<svg
									className={clsx(!menuOpen ? 'block' : 'hidden', 'h-6 w-6')}
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									aria-hidden='true'
								>
									<path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
								</svg>
								<svg
									className={clsx(menuOpen ? 'block' : 'hidden', 'h-6 w-6')}
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									aria-hidden='true'
								>
									<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
								</svg>
							</button>
						</div>
						<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
							<div className='hidden sm:ml-6 sm:block'>
								<div className='flex space-x-4 uppercase'>
									{headerLinks.map((link, index) => (
										<Link
											key={index}
											className={clsx(link.linkTo === pathname ? menuSelectedClasses : menuClasses, desktopMenuClasses)}
											href={link.linkTo}
										>
											{link.title}
										</Link>
									))}
								</div>
							</div>
						</div>
						{/* language dropdown */}
						<div
							className={clsx(
								'absolute inset-y-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0',
								language.direction === 'ltr' ? 'right-0' : 'left-0'
							)}
						>
							<div className='relative ml-3'>
								<div>
									<button
										type='button'
										className='flex p-1 rounded-md text-gray-100 bg-gray-800 hover:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
										id='user-menu-button'
										aria-expanded='false'
										aria-haspopup='true'
										onClick={handleToggleLanguageList}
									>
										<span className='sr-only'>Select Language Menu</span>
										<svg
											className={'h-5 w-5'}
											xmlns='http://www.w3.org/2000/svg'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z' />
										</svg>
									</button>
								</div>
								<div
									className={clsx(
										!languageOpen && 'hidden',
										language.direction === 'ltr' ? 'origin-top-right right-0' : 'origin-top-left left-0',
										'absolute  z-10 mt-3 w-32 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
									)}
									role='menu'
									aria-orientation='vertical'
									aria-labelledby='user-menu-button'
									tabIndex={-1}
								>
									{languageItems.map((languageItem, index) => (
										<button
											key={index}
											className={clsx(
												language.languageCode === languageItem.value && 'bg-gray-100',
												'w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
											)}
											role='menuitem'
											id={`user-menu-item-${index}`}
											tabIndex={-1}
											onClick={onClickLanguage(languageItem.value)}
										>
											{languageItem.title}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				<div
					className={clsx(
						!menuOpen ? '-translate-x-full opacity-0' : 'opacity-100',
						!menuOpen && language.direction === 'rtl' && 'translate-x-full',
						language.direction === 'ltr' ? 'left-0' : 'right-0',
						'sm:hidden',
						'fixed top-0 z-40 w-64 h-screen transition-transform sm:translate-x-0'
					)}
					id='mobile-menu'
					tabIndex={0}
				>
					<div className='space-y-1 px-2 pt-2 pb-3  h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 uppercase'>
						{headerLinks.map((link, index) => (
							<Link
								key={index}
								className={clsx(link.linkTo === pathname ? menuSelectedClasses : menuClasses, smMenuClasses)}
								href={link.linkTo}
							>
								{link.title}
							</Link>
						))}
					</div>
				</div>
			</nav>
		</div>
	)
}

export default DefaultHeader
