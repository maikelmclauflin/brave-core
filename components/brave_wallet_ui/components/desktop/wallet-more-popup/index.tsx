import * as React from 'react'
import { getLocale } from 'components/common/locale'
// Styled Components
import {
  StyledWrapper,
  PopupButton,
  PopupButtonText,
  SettingsIcon,
  BackupIcon,
  LockIcon
} from './style'

export interface Props {
  onClickSetting: () => void
  onClickLock: () => void
  onClickBackup: () => void
}

const WalletMorePopup = (props: Props) => {
  const { onClickLock, onClickSetting, onClickBackup } = props

  return (
    <StyledWrapper>
      <PopupButton buttonType='primary' onClick={onClickLock}>
        <LockIcon />
        <PopupButtonText>{getLocale('braveWalletUiWalletPopupLock')}</PopupButtonText>
      </PopupButton>
      <PopupButton buttonType='secondary' onClick={onClickSetting}>
        <SettingsIcon />
        <PopupButtonText>{getLocale('braveWalletUiWalletPopupSettings')}</PopupButtonText>
      </PopupButton>
      <PopupButton buttonType='secondary' onClick={onClickBackup}>
        <BackupIcon />
        <PopupButtonText>{getLocale('braveWalletUiWalletPopupBackup')}</PopupButtonText>
      </PopupButton>
    </StyledWrapper>
  )
}

export default WalletMorePopup
