import { defaultlanguage } from 'constants/constants'

describe('localization spec', () => {
  const allowedLang = ['fa', 'en']

  const getLocale = (url:string) => {
    const slicedUrl = url.slice(url.indexOf('://') + 3)
    const localeSlice = slicedUrl.slice(slicedUrl.indexOf('/') + 1)
    return localeSlice.slice(0, localeSlice.indexOf('/') < 0 ? undefined:localeSlice.indexOf('/') )
  }
  it('passes fa - default', () => {
    cy.visit('http://localhost:3000')
    cy.url().then((url) => {
      const locale =getLocale(url)

      expect(locale).be.oneOf(allowedLang)
      expect(locale).to.eq(defaultlanguage.languageCode)

      cy.get('html').should('have.attr', 'lang').and('be.oneOf', allowedLang)

      cy.get('body').should('have.attr', 'dir').and('be.oneOf', ['ltr', 'rtl'])

      cy.get('div[role="menu"]').should('not.be.visible')

      cy.viewport('iphone-6').get('button[aria-controls="mobile-menu"]').should('be.visible')
      
      cy.get('#mobile-menu').should('have.class', 'right-0')
    })
  })

  it('passes en', () => {
    cy.visit('http://localhost:3000/en')
    cy.url().then((url) => {
      const locale =getLocale(url)

      expect(locale).not.to.eq('fa')

      cy.get('div[role="menu"]').should('not.be.visible')

      cy.get('#mobile-menu').should('not.have.class', 'right-0')
        .should('have.class', 'left-0')
    })
  })
})