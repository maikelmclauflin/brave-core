import * as React from 'react'

import {
  StyledWrapper,
  Title,
  IconBackground,
  PageIcon,
  InputColumn,
  Description
} from './style'
import { PasswordInput } from '../../../shared'
import { NavButton } from '../../../extension'
import { getLocale } from 'components/common/locale'

export interface Props {
  onSubmit: () => void
  onPasswordChanged: (value: string) => void
  onConfirmPasswordChanged: (value: string) => void
  disabled: boolean
  hasPasswordError: boolean
  hasConfirmPasswordError: boolean
}

function OnboardingCreatePassword (props: Props) {
  const {
    onSubmit,
    onPasswordChanged,
    onConfirmPasswordChanged,
    disabled,
    hasConfirmPasswordError,
    hasPasswordError
  } = props

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !disabled) {
      onSubmit()
    }
  }

  return (
    <StyledWrapper>
      <IconBackground>
        <PageIcon />
      </IconBackground>
      <Title>{getLocale('braveWalletUiCreatePasswordTitle')}</Title>
      <Description>{getLocale('braveWalletUiCreatePasswordDescription')}</Description>
      <InputColumn>
        <PasswordInput
          placeholder={getLocale('braveWalletUiCreatePasswordInput')}
          onChange={onPasswordChanged}
          error={getLocale('braveWalletUiCreatePasswordError')}
          hasError={hasPasswordError}
          autoFocus={true}
        />
        <PasswordInput
          placeholder={getLocale('braveWalletUiCreatePasswordInput2')}
          onChange={onConfirmPasswordChanged}
          onKeyDown={handleKeyDown}
          error={getLocale('braveWalletUiCreatePasswordError2')}
          hasError={hasConfirmPasswordError}
        />
      </InputColumn>
      <NavButton buttonType='primary' text={getLocale('braveWalletUiButtonContinue')} onSubmit={onSubmit} disabled={disabled} />
    </StyledWrapper>
  )
}

export default OnboardingCreatePassword
