import * as React from 'react'

import {
  StyledWrapper,
  Title,
  Column,
  PageIcon,
  IconBackground
} from './style'
import { PasswordInput } from '../../shared'
import { NavButton } from '../'
import { getLocale } from 'components/common/locale'

export interface Props {
  onSubmit: () => void
  onPasswordChanged: (value: string) => void
  hasPasswordError: boolean
  disabled: boolean
}

function LockPanel (props: Props) {
  const { onSubmit, onPasswordChanged, disabled, hasPasswordError } = props

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
      <Title>{getLocale('braveWalletUiLockScreenTitle')}</Title>
      <Column>
        <PasswordInput
          placeholder={getLocale('braveWalletUiCreatePasswordInput')}
          onChange={onPasswordChanged}
          onKeyDown={handleKeyDown}
          error={getLocale('braveWalletUiLockScreenError')}
          hasError={hasPasswordError}
          autoFocus={true}
        />
      </Column>
      <NavButton
        buttonType='primary'
        text={getLocale('braveWalletUiLockScreenButton')}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    </StyledWrapper>
  )
}

export default LockPanel
