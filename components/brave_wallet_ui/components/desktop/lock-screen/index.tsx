import * as React from 'react'

import {
  StyledWrapper,
  Title,
  IconBackground,
  PageIcon,
  InputColumn
} from './style'
import { PasswordInput } from '../../shared'
import { NavButton } from '../../extension'
import { getLocale } from 'components/common/locale'

export interface Props {
  onSubmit: () => void
  onPasswordChanged: (value: string) => void
  hasPasswordError: boolean
  disabled: boolean
}

function LockScreen (props: Props) {
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
      <InputColumn>
        <PasswordInput
          placeholder={getLocale('braveWalletUiCreatePasswordInput')}
          onChange={onPasswordChanged}
          onKeyDown={handleKeyDown}
          error={getLocale('braveWalletUiLockScreenError')}
          hasError={hasPasswordError}
          autoFocus={true}
        />
      </InputColumn>
      <NavButton
        buttonType='primary'
        text={getLocale('braveWalletUiLockScreenButton')}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    </StyledWrapper>
  )
}

export default LockScreen
