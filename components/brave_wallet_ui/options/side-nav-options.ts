import { NavObjectType } from '../constants/types'
import { getLocale } from 'components/common/locale'
import {
  WalletIconD,
  WalletIconL,
  RewardsIconL,
  RewardsIconD,
  CreditCardIconL,
  CreditCardIconD
} from '../assets/svg-icons/nav-button-icons'

export const NavOptions: NavObjectType[] = [
  {
    name: getLocale('braveWalletUiSideNavCrypto'),
    primaryIcon: WalletIconL,
    secondaryIcon: WalletIconD,
    id: 'crypto'
  },
  {
    name: getLocale('braveWalletUiSideNavRewards'),
    primaryIcon: RewardsIconL,
    secondaryIcon: RewardsIconD,
    id: 'rewards'
  },
  {
    name: getLocale('braveWalletUiSideNavCards'),
    primaryIcon: CreditCardIconL,
    secondaryIcon: CreditCardIconD,
    id: 'cards'
  }
]
