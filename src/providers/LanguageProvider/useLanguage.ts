import { useContext } from 'react'
import LanguageProviderContext from './LanguageProviderContext'
import { LanguageProviderContextProps } from './index.d'

const useLanugage = ():LanguageProviderContextProps => useContext(LanguageProviderContext)

export default useLanugage
