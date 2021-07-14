import * as React from 'react'

import {
  StyledWrapper,
  Title,
  Description,
  PageIcon,
  RestoreButton
} from './style'
import { NavButton } from '../'
import { getLocale } from 'components/common/locale'

export interface Props {
  onSetup: () => void
  onRestore: () => void
}

function WelcomePanel (props: Props) {
  const { onRestore, onSetup } = props
  return (
    <StyledWrapper>
      <PageIcon />
      <Title>{getLocale('braveWalletUiWelcomeTitle')}</Title>
      <Description>{getLocale('braveWalletUiWelcomeDescription')}</Description>
      <NavButton buttonType='primary' text={getLocale('braveWalletUiWelcomeButton')} onSubmit={onSetup} />
      <RestoreButton onClick={onRestore}>{getLocale('braveWalletUiWelcomeRestoreButton')}</RestoreButton>
    </StyledWrapper>
  )
}

export default WelcomePanel
