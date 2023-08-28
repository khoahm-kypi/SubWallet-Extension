// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { BalanceItemProps, Logo, Typography } from '@subwallet/react-ui';
import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

type Props = ThemeProps & {
  onPressItem?: BalanceItemProps['onPressItem'],
  logoKey?: string,
  symbol: string,
  chain?: string,
  networkKey?: string,
  subSymbol?: string,
  slug?: string,
  subTitle?: string,
  subContent?: React.ReactNode,
} ;

function Component (
  props: Props) {
  const { chain,
    className = '',
    logoKey,
    networkKey,
    slug = '',
    subContent,
    subSymbol,
    subTitle,
    symbol } = props;
  // todo: Update BalanceItem in react-ui lib
  // - loading
  // - auto detect logo, only use logoKey
  // - price change status

  return (
    <div className={classNames('token-item-container', className)}>
      <Logo
        isShowSubLogo={!!chain && !slug.includes('NATIVE')}
        network={networkKey}
        shape={'squircle'}
        size={40}
        token={logoKey}
        {
          ...chain && {
            subNetwork: chain,
            subToken: subSymbol
          }
        }
      />
      <div className='token-item-information'>
        <Typography.Text className='token-item-information__title'>
          {symbol}
        </Typography.Text>
        { subTitle && (
          <Typography.Text className='token-item-information__sub-title'>
            {subTitle}
          </Typography.Text>
        )}
        {subContent}
      </div>
    </div>
  );
}

export const TokenItem = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    '&.token-item-container': {
      display: 'flex',

      '.token-item-information': {
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',

        '&__title': {},

        '&__sub-title': {
          fontSize: 12,
          opacity: 0.65,
          textAlign: 'start'
        }
      }
    }
  });
});
