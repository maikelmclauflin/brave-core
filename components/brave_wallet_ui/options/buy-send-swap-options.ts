import { BuySendSwapObjectType } from '../constants/types'
import { getLocale } from 'components/common/locale'

export const BuySendSwapOptions: BuySendSwapObjectType[] = [
  {
    id: 'buy',
    name: getLocale('braveWalletUiBuy')
  },
  {
    id: 'send',
    name: getLocale('braveWalletUiSend')
  },
  {
    id: 'swap',
    name: getLocale('braveWalletUiSwap')
  }
]
