import * as React from 'react'
import { AddAccountNavTypes, WalletAccountType } from '../../../../constants/types'
import { AddAccountNavOptions } from '../../../../options/add-account-nav-options'
import { Select } from 'brave-ui/components'
import { PopupModal, TopTabNav } from '../..'
import { NavButton } from '../../../extension'
import { getLocale } from 'components/common/locale'

// Styled Components
import {
  Input,
  StyledWrapper,
  DisclaimerText,
  DisclaimerWrapper,
  SelectWrapper,
  HardwareTitle,
  HardwareButtonRow,
  HardwareButton,
  LedgerIcon,
  TrezorIcon,
  HardwareInfoRow,
  HardwareInfoColumn,
  InfoIcon,
  ImportButton,
  ImportRow
} from './style'

export interface Props {
  onClose: () => void
  onCreateAccount: (name: string) => void
  onImportAccount: (name: string, key: string) => void
  onConnectHardwareWallet: (hardware: 'Ledger' | 'Trezor') => void
  accounts: WalletAccountType[]
  title: string
}

const AddAccountModal = (props: Props) => {
  const { title, accounts, onClose, onCreateAccount, onImportAccount, onConnectHardwareWallet } = props
  const suggestedAccountName = `${getLocale('braveWalletUiAccount')} ${accounts.length + 1}`
  const [tab, setTab] = React.useState<AddAccountNavTypes>('create')
  const [importOption, setImportOption] = React.useState<string>('key')
  const [file, setFile] = React.useState<HTMLInputElement['files']>()
  const [accountName, setAccountName] = React.useState<string>(suggestedAccountName)
  const [privateKey, setPrivateKey] = React.useState<string>('')
  const [selectedHardwareWallet, setSelectedHardwareWallet] = React.useState<'Ledger' | 'Trezor'>('Ledger')

  const handleAccountNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(event.target.value)
  }

  const handlePrivateKeyChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(event.target.value)
  }

  const onSubmit = () => {
    if (tab === 'hardware') {
      onConnectHardwareWallet(selectedHardwareWallet)
      return
    }
    if (tab === 'create') {
      onCreateAccount(accountName)
      return
    }
    if (tab === 'import') {
      if (importOption === 'key') {
        onImportAccount(accountName, privateKey)
        return
      }
      // TODO: Douglas, Will need to add more logic here to
      // to read the uploaded file and convert to string.
      onImportAccount(accountName, '')
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit()
    }
  }

  const onChangeTab = (id: AddAccountNavTypes) => {
    if (id === 'create') {
      setAccountName(suggestedAccountName)
    } else {
      setAccountName('')
    }
    setTab(id)
  }

  const onSelectLedger = () => {
    setSelectedHardwareWallet('Ledger')
  }

  const onSelectTrezor = () => {
    setSelectedHardwareWallet('Trezor')
  }

  const onImportOptionChange = (value: string) => {
    setImportOption(value)
  }

  const onFileUpload = (file: React.ChangeEvent<HTMLInputElement>) => {
    if (file.target.files) {
      setFile(file.target.files)
    }
  }

  const isDisabled = React.useMemo(() => {
    if (tab === 'create') {
      return accountName === ''
    }
    if (tab === 'import') {
      if (importOption === 'key') {
        return accountName === '' || privateKey === ''
      }
      return accountName === '' || file === undefined
    }
    return false
  }, [tab, importOption, accountName, privateKey, file])

  return (
    <PopupModal title={title} onClose={onClose}>
      <TopTabNav
        tabList={AddAccountNavOptions}
        onSubmit={onChangeTab}
        selectedTab={tab}
      />

      <StyledWrapper>
        {tab === 'import' &&
          <>
            <DisclaimerWrapper>
              <DisclaimerText>{getLocale('braveWalletUiImportAccountDisclaimer')}</DisclaimerText>
            </DisclaimerWrapper>
            <SelectWrapper>
              <Select
                value={importOption}
                onChange={onImportOptionChange}
              >
                <div data-value='key'>
                  {getLocale('braveWalletUiImportAccountKey')}
                </div>
                <div data-value='file'>
                  {getLocale('braveWalletUiImportAccountFile')}
                </div>
              </Select>
            </SelectWrapper>
            {importOption === 'key' ? (
              <Input
                placeholder={getLocale('braveWalletUiImportAccountPlaceholder')}
                onChange={handlePrivateKeyChanged}
                type='password'
              />
            ) : (
              <>
                <ImportRow>
                  <ImportButton htmlFor='recoverFile'>{getLocale('braveWalletUiImportAccountUploadButton')}</ImportButton>
                  <DisclaimerText>{file ? file[0].name : getLocale('braveWalletUiImportAccountUploadPlaceholder')}</DisclaimerText>
                </ImportRow>
                <input
                  type='file'
                  id='recoverFile'
                  name='recoverFile'
                  style={{ display: 'none' }}
                  onChange={onFileUpload}
                />
              </>
            )}
          </>
        }
        {tab !== 'hardware' &&
          <Input
            value={accountName}
            placeholder={getLocale('braveWalletUiAddAccountPlaceholder')}
            onKeyDown={handleKeyDown}
            onChange={handleAccountNameChanged}
          />
        }
        {tab === 'hardware' &&
          <>
            <HardwareTitle>{getLocale('braveWalletUiConnectHardwareTitle')}</HardwareTitle>
            <HardwareButtonRow>
              <HardwareButton
                onClick={onSelectLedger}
                isSelected={selectedHardwareWallet === 'Ledger'}
              >
                <LedgerIcon />
              </HardwareButton>
              <HardwareButton
                onClick={onSelectTrezor}
                isSelected={selectedHardwareWallet === 'Trezor'}
              >
                <TrezorIcon />
              </HardwareButton>
            </HardwareButtonRow>
            <HardwareInfoRow>
              <InfoIcon />
              <HardwareInfoColumn>
                <DisclaimerText>{getLocale('braveWalletUiConnectHardwareInfo1')} {selectedHardwareWallet} {getLocale('braveWalletUiconnectHardwareInfo2')}</DisclaimerText>
                <DisclaimerText>{getLocale('braveWalletUiConnectHardwareInfo3')}</DisclaimerText>
              </HardwareInfoColumn>
            </HardwareInfoRow>
          </>
        }
        <NavButton
          onSubmit={onSubmit}
          disabled={isDisabled}
          text={
            tab === 'create' ?
              `${getLocale('braveWalletUiAddAccountCreate')} ${getLocale('braveWalletUiAccount')}`
              : tab === 'hardware' ?
                getLocale('braveWalletUiAddAccountConnect')
                : getLocale('braveWalletUiAddAccountImport')
          }
          buttonType='primary'
        />

      </StyledWrapper>
    </PopupModal>
  )
}

export default AddAccountModal
