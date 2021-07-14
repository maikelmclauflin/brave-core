import { AppsListType } from '../constants/types'
import { getLocale } from 'components/common/locale'
const compoundIcon = require('../assets/app-icons/compound-icon.png')
const makerIcon = require('../assets/app-icons/maker-icon.jpeg')
const aaveIcon = require('../assets/app-icons/aave-icon.jpeg')
const openSeaIcon = require('../assets/app-icons/opensea-icon.png')
const raribleIcon = require('../assets/app-icons/rarible-icon.png')

export const AppsList: AppsListType[] = [
  {
    category: getLocale('braveWalletUiDefiCategory'),
    categoryButtonText: getLocale('braveWalletUiDefiButtonText'),
    appList: [
      {
        name: getLocale('braveWalletUiCompoundName'),
        description: getLocale('braveWalletUiCompoundDescription'),
        url: getLocale('braveWalletUiCompoundUrl'),
        icon: compoundIcon
      },
      {
        name: getLocale('braveWalletUiMakerName'),
        description: getLocale('braveWalletUiMakerDescription'),
        url: getLocale('braveWalletUiMakerUrl'),
        icon: makerIcon
      },
      {
        name: getLocale('braveWalletUiAaveName'),
        description: getLocale('braveWalletUiAaveDescription'),
        url: getLocale('braveWalletUiAaveUrl'),
        icon: aaveIcon
      }
    ]
  },
  {
    category: getLocale('braveWalletUiNftCategory'),
    categoryButtonText: getLocale('braveWalletUiNftButtonText'),
    appList: [
      {
        name: getLocale('braveWalletUiOpenSeaName'),
        description: getLocale('braveWalletUiOpenSeaDescription'),
        url: getLocale('braveWalletUiOpenSeaUrl'),
        icon: openSeaIcon
      },
      {
        name: getLocale('braveWalletUiRaribleName'),
        description: getLocale('braveWalletUiRaribleDescription'),
        url: getLocale('braveWalletUiRaribleUrl'),
        icon: raribleIcon
      }
    ]
  }
]
