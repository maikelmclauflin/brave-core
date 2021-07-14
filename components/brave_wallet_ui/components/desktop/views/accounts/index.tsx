import * as React from 'react'

import { WalletAccountType } from '../../../../constants/types'

// Styled Components
import {
  StyledWrapper,
  SectionTitle,
  PrimaryListContainer,
  PrimaryRow,
  SecondaryListContainer,
  DisclaimerText,
  SubDivider,
  BackupIcon,
  ButtonsRow,
  SettingsIcon,
  BackupButton,
  BackupButtonText,
  SettingsButton
} from './style'

// Components
import { AccountListItem, AddButton } from '../../'
import { getLocale } from 'components/common/locale'

export interface Props {
  toggleNav: () => void
  accounts: WalletAccountType[]
  onClickBackup: () => void
  onClickAddAccount: () => void
}

function Accounts (props: Props) {
  const {
    accounts,
    onClickBackup,
    onClickAddAccount
  } = props

  const primaryAccounts = React.useMemo(() => {
    return accounts.filter((account) => account.accountType === 'Primary')
  }, [accounts])

  const secondaryAccounts = React.useMemo(() => {
    return accounts.filter((account) => account.accountType === 'Secondary')
  }, [accounts])

  const hardwareAccounts = React.useMemo(() => {
    return accounts.filter((account) => account.accountType === 'Trezor' || account.accountType === 'Ledger')
  }, [accounts])

  const onSelectAccount = () => {
    alert('Will Exand to Account Detail Page')
  }

  const onDeleteAccount = () => {
    alert('Will Popup a Delete account modal')
  }

  const onClickSettings = () => {
    alert('Will Popup a Account Settings modal')
  }

  return (
    <StyledWrapper>
      <PrimaryRow>
        <SectionTitle>{getLocale('braveWalletUiAccountsPrimary')}</SectionTitle>
        <ButtonsRow>
          <BackupButton onClick={onClickBackup}>
            <BackupIcon />
            <BackupButtonText>{getLocale('braveWalletUiBackupButton')}</BackupButtonText>
          </BackupButton>
          <SettingsButton onClick={onClickSettings}>
            <SettingsIcon />
          </SettingsButton>
        </ButtonsRow>
      </PrimaryRow>
      <PrimaryListContainer>
        {primaryAccounts.map((account) =>
          <AccountListItem
            key={account.id}
            isHardwareWallet={false}
            onClick={onSelectAccount}
            address={account.address}
            name={account.name}
            onDelete={onDeleteAccount}
          />
        )}
      </PrimaryListContainer>
      <SectionTitle>{getLocale('braveWalletUiAccountsSecondary')}</SectionTitle>
      <DisclaimerText>{getLocale('braveWalletUiAccountsSecondaryDisclaimer')}</DisclaimerText>
      <SubDivider />
      <SecondaryListContainer isHardwareWallet={false}>
        {secondaryAccounts.map((account) =>
          <AccountListItem
            key={account.id}
            isHardwareWallet={false}
            onClick={onSelectAccount}
            address={account.address}
            name={account.name}
            onDelete={onDeleteAccount}
          />
        )}
      </SecondaryListContainer>
      {hardwareAccounts.length !== 0 &&
        <SecondaryListContainer isHardwareWallet={true}>
          {hardwareAccounts.map((account) =>
            <AccountListItem
              key={account.id}
              isHardwareWallet={true}
              onClick={onSelectAccount}
              address={account.address}
              name={account.name}
              onDelete={onDeleteAccount}
            />
          )}
        </SecondaryListContainer>
      }
      <AddButton
        buttonType='secondary'
        onSubmit={onClickAddAccount}
        text={getLocale('braveWalletUiAddAccount')}
      />
    </StyledWrapper>
  )
}

export default Accounts
