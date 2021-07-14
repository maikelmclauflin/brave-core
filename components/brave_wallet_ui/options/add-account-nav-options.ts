import { TopTabNavObjectType } from '../constants/types'
import { getLocale } from 'components/common/locale'

export const AddAccountNavOptions: TopTabNavObjectType[] = [
  {
    id: 'create',
    name: getLocale('braveWalletUiAddAccountCreate')
  },
  {
    id: 'import',
    name: getLocale('braveWalletUiAddAccountImport')
  },
  {
    id: 'hardware',
    name: getLocale('braveWalletUiAddAccountHardware')
  }
]
