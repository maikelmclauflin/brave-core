import * as React from 'react'
import { getLocale } from 'components/common/locale'
// Styled Components
import {
  StyledWrapper,
  WarningText,
  BannerButton,
  ButtonRow
} from './style'

export interface Props {
  onBackup: () => void
  onDismiss: () => void
}

const BackupWarningBanner = (props: Props) => {
  const { onDismiss, onBackup } = props

  return (
    <StyledWrapper>
      <WarningText>{getLocale('braveWalletUiBackupWarningText')}</WarningText>
      <ButtonRow>
        <BannerButton onClick={onBackup} buttonType='primary'>{getLocale('braveWalletUiBackupButton')}</BannerButton>
        <BannerButton onClick={onDismiss} buttonType='secondary'>{getLocale('braveWalletUiDismissButton')}</BannerButton>
      </ButtonRow>
    </StyledWrapper>
  )
}

export default BackupWarningBanner
