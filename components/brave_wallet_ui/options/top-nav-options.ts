import { TopTabNavObjectType } from '../constants/types'
import { getLocale } from 'components/common/locale'

export const TopNavOptions: TopTabNavObjectType[] = [
  {
    id: 'portfolio',
    name: getLocale('braveWalletUiTopNavPortfolio')
  },
  {
    id: 'prices',
    name: getLocale('braveWalletUiTopTabPrices')
  },
  {
    id: 'defi',
    name: getLocale('braveWalletUiTopTabDefi')
  },
  {
    id: 'nfts',
    name: getLocale('braveWalletUiTopNavNFTS')
  },
  {
    id: 'accounts',
    name: getLocale('braveWalletUiTopNavAccounts')
  }
]
