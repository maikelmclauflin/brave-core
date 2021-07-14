import * as React from 'react'

import {
  StyledWrapper,
  Title,
  Description,
  TermsRow,
  CopyButton,
  WarningBox,
  WarningText,
  DisclaimerText,
  DisclaimerColumn,
  AlertIcon,
  RecoveryBubble,
  RecoveryBubbleText,
  RecoveryPhraseContainer
} from './style'
import { Tooltip } from '../../../shared'
import { NavButton } from '../../../extension'
import { getLocale } from 'components/common/locale'
import { Checkbox } from 'brave-ui'

export interface Props {
  onSubmit: () => void
  isRecoveryTermsAccepted: boolean
  onSubmitTerms: (key: string, selected: boolean) => void
  recoverPhrase: string[]
  onCopy: () => void
}

function OnboardingBackup (props: Props) {
  const { onSubmit, isRecoveryTermsAccepted, onSubmitTerms, recoverPhrase, onCopy } = props

  return (
    <StyledWrapper>
      <Title>{getLocale('braveWalletUiRecoveryTitle')}</Title>
      <Description>{getLocale('braveWalletUiRecoveryDescription')}</Description>
      <WarningBox>
        <AlertIcon />
        <DisclaimerColumn>
          <DisclaimerText><WarningText>{getLocale('braveWalletUiRecoveryWarning1')} </WarningText>{getLocale('braveWalletUiRecoveryWarning2')}</DisclaimerText>
          <DisclaimerText>{getLocale('braveWalletUiRecoveryWarning3')}</DisclaimerText>
        </DisclaimerColumn>
      </WarningBox>
      <RecoveryPhraseContainer>
        {recoverPhrase.map((word) =>
          <RecoveryBubble key={word}>
            <RecoveryBubbleText>{recoverPhrase.indexOf(word) + 1}. {word}</RecoveryBubbleText>
          </RecoveryBubble>
        )}
      </RecoveryPhraseContainer>
      <Tooltip text={getLocale('braveWalletUiToolTipCopyToClipboard')}>
        <CopyButton onClick={onCopy}>{getLocale('braveWalletUiButtonCopy')}</CopyButton>
      </Tooltip>
      <TermsRow>
        <Checkbox value={{ backedUp: isRecoveryTermsAccepted }} onChange={onSubmitTerms}>
          <div data-key='backedUp'>{getLocale('braveWalletUiRecoveryTerms')}</div>
        </Checkbox>
      </TermsRow>
      <NavButton disabled={!isRecoveryTermsAccepted} buttonType='primary' text={getLocale('braveWalletUiButtonContinue')} onSubmit={onSubmit} />
    </StyledWrapper>
  )
}

export default OnboardingBackup
