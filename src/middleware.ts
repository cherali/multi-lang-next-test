import { NextRequest, NextFetchEvent, NextResponse } from 'next/server'
import { defaultlanguage } from 'constants/constants'

const PUBLIC_FILE = /\.(.*)$/

const stripDefaultLocale = (str: string): string => {
  const stripped = str.replace('/default', '')
  return stripped
}

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const language = request.nextUrl.locale === 'default' ? defaultlanguage.languageCode : request.nextUrl.locale


  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return undefined
  }

  if (request.nextUrl.locale === 'default' || request.nextUrl.locale !== language) {
    return NextResponse.redirect(
      `${request.nextUrl.origin}/${language}${stripDefaultLocale(request.nextUrl.pathname)}`
    )
  }
}