import * as React from 'react'

import {
  StyledWrapper,
  Title,
  Description,
  RecoveryPhraseInput,
  ErrorText,
  CheckboxRow,
  FormWrapper,
  InputColumn,
  FormText
} from './style'
import { PasswordInput } from '../../../shared'
import { NavButton } from '../../../extension'
import { getLocale } from 'components/common/locale'
import { Checkbox } from 'brave-ui'

export interface Props {
  onSubmit: () => void
  onRecoveryPhraseChanged: (value: string) => void
  onPasswordChanged: (value: string) => void
  onConfirmPasswordChanged: (value: string) => void
  recoveryPhrase: string
  disabled: boolean
  hasRestoreError?: boolean
  hasPasswordError: boolean
  hasConfirmPasswordError: boolean
}

function OnboardingRestore (props: Props) {
  const {
    onSubmit,
    onRecoveryPhraseChanged,
    onConfirmPasswordChanged,
    onPasswordChanged,
    recoveryPhrase,
    disabled,
    hasRestoreError,
    hasPasswordError,
    hasConfirmPasswordError
  } = props
  const [showRecoveryPhrase, setShowRecoveryPhrase] = React.useState<boolean>(false)

  const inputRecoveryPhrase = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRecoveryPhraseChanged(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !disabled) {
      onSubmit()
    }
  }

  const onShowRecoveryPhrase = (key: string, selected: boolean) => {
    if (key === 'showPhrase') {
      setShowRecoveryPhrase(selected)
    }
  }

  return (
    <StyledWrapper>
      <Title>{getLocale('braveWalletUiRestoreTite')}</Title>
      <Description>{getLocale('braveWalletUiRestoreDescription')}</Description>
      <FormWrapper>
        <RecoveryPhraseInput
          autoFocus={true}
          placeholder={getLocale('braveWalletUiRestorePlaceholder')}
          onChange={inputRecoveryPhrase}
          value={recoveryPhrase}
          onKeyDown={handleKeyDown}
          type={showRecoveryPhrase ? 'text' : 'password'}
        />
        {hasRestoreError && <ErrorText>{getLocale('braveWalletUiRestoreError')}</ErrorText>}
        <CheckboxRow>
          <Checkbox value={{ showPhrase: showRecoveryPhrase }} onChange={onShowRecoveryPhrase}>
            <div data-key='showPhrase'>{getLocale('braveWalletUiRestoreShowPhrase')}</div>
          </Checkbox>
        </CheckboxRow>
        <FormText>{getLocale('braveWalletUiRestoreFormText')}</FormText>
        <InputColumn>
          <PasswordInput
            placeholder={getLocale('braveWalletUiCreatePasswordInput')}
            onChange={onPasswordChanged}
            hasError={hasPasswordError}
            error={getLocale('braveWalletUiCreatePasswordError')}
          />
          <PasswordInput
            placeholder={getLocale('braveWalletUiCreatePasswordInput2')}
            onChange={onConfirmPasswordChanged}
            hasError={hasConfirmPasswordError}
            error={getLocale('braveWalletUiCreatePasswordError2')}
          />
        </InputColumn>
      </FormWrapper>
      <NavButton disabled={disabled} buttonType='primary' text={getLocale('braveWalletUiWelcomeRestoreButton')} onSubmit={onSubmit} />
    </StyledWrapper>
  )
}

export default OnboardingRestore
