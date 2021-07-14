import * as React from 'react'

import {
  StyledWrapper,
  Title,
  Description,
  IconBackground,
  PageIcon,
  TermsRow,
  SkipButton
} from './style'
import { NavButton } from '../../../extension'
import { getLocale } from 'components/common/locale'
import { Checkbox } from 'brave-ui'

export interface Props {
  onSubmit: () => void
  isBackupTermsAccepted: boolean
  isOnboarding: boolean
  onSubmitTerms: (key: string, selected: boolean) => void
  onCancel: () => void
}

function OnboardingRecovery (props: Props) {
  const { onSubmit, isBackupTermsAccepted, isOnboarding, onSubmitTerms, onCancel } = props

  return (
    <StyledWrapper>
      <IconBackground>
        <PageIcon />
      </IconBackground>
      <Title>{getLocale('braveWalletUiBackupIntroTitle')}</Title>
      <Description>{getLocale('braveWalletUiBackupIntroDescription')}</Description>
      <TermsRow>
        <Checkbox value={{ backupTerms: isBackupTermsAccepted }} onChange={onSubmitTerms}>
          <div data-key='backupTerms'>{getLocale('braveWalletUiBackupIntroTerms')}</div>
        </Checkbox>
      </TermsRow>
      <NavButton disabled={!isBackupTermsAccepted} buttonType='primary' text={getLocale('braveWalletUiButtonContinue')} onSubmit={onSubmit} />
      <SkipButton onClick={onCancel}>{isOnboarding ? getLocale('braveWalletUiBackupButtonSkip') : getLocale('braveWalletUiBackupButtonCancel')}</SkipButton>
    </StyledWrapper>
  )
}

export default OnboardingRecovery
