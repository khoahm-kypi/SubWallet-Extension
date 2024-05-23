// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset } from '@subwallet/chain-list/types';
import { getExplorerLink } from '@subwallet/extension-base/services/transaction-service/utils';
import { BalanceItem } from '@subwallet/extension-base/types';
import { Avatar } from '@subwallet/extension-koni-ui/components';
import { useGetAccountByAddress, useGetChainPrefixBySlug, useSelector, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { reformatAddress, toShort } from '@subwallet/extension-koni-ui/utils';
import { Button, Icon } from '@subwallet/react-ui';
import BigN from 'bignumber.js';
import CN from 'classnames';
import { ArrowSquareUpRight } from 'phosphor-react';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { MetaInfo } from '../MetaInfo';

interface Props extends ThemeProps {
  item: BalanceItem;
}

const Component: React.FC<Props> = (props: Props) => {
  const { className, item } = props;

  const { address, free, locked, tokenSlug } = item;

  const { t } = useTranslation();
  const { assetRegistry } = useSelector((state) => state.assetRegistry);
  const chainInfoMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);

  const account = useGetAccountByAddress(address);

  const tokenInfo = useMemo((): _ChainAsset|undefined => assetRegistry[tokenSlug], [assetRegistry, tokenSlug]);
  const chainInfo = useMemo(() => {
    if (tokenInfo?.originChain === undefined) {
      return undefined;
    }

    return chainInfoMap[tokenInfo.originChain];
  }, [chainInfoMap, tokenInfo?.originChain]);

  const total = useMemo(() => new BigN(free).plus(locked).toString(), [free, locked]);
  const addressPrefix = useGetChainPrefixBySlug(tokenInfo?.originChain);

  const reformatedAddress = useMemo(() => reformatAddress(address, addressPrefix), [address, addressPrefix]);

  const name = useMemo(() => {
    return account?.name;
  }, [account?.name]);

  const openBlockExplorer = useCallback(
    (link: string) => {
      return () => {
        window.open(link, '_blank');
      };
    },
    []
  );

  const decimals = tokenInfo?.decimals || 0;
  const symbol = tokenInfo?.symbol || '';
  const link = (chainInfo !== undefined) && getExplorerLink(chainInfo, address, 'account');

  return (
    <MetaInfo
      className={CN(className, 'account-token-detail')}
      hasBackgroundWrapper={true}
      spaceSize='xxs'
    >
      <MetaInfo.Number
        className='account-info'
        decimals={decimals}
        label={(
          <div className='account-info'>
            <Avatar
              size={24}
              value={address}
            />
            <div className='account-name-address ml-xs'>
              {
                name
                  ? (
                    <>
                      <span className='account-name'>{name}</span>
                      <span className='account-address'>&nbsp;({toShort(reformatedAddress, 4, 4)})</span>
                    </>
                  )
                  : (
                    <span className='account-name'>({toShort(reformatedAddress)})</span>
                  )
              }
            </div>
          </div>
        )}
        suffix={symbol}
        value={total}
        valueColorSchema='light'
      />
      <MetaInfo.Number
        className='balance-info'
        decimals={decimals}
        label={t('Transferable')}
        suffix={symbol}
        value={free}
        valueColorSchema='gray'
      />
      <MetaInfo.Number
        className='balance-info'
        decimals={decimals}
        label={t('Locked')}
        suffix={symbol}
        value={locked}
        valueColorSchema='gray'
      />
      {!!link && <Button
        block
        disabled={!link}
        icon={
          <Icon
            phosphorIcon={ArrowSquareUpRight}
          />
        }
        onClick={openBlockExplorer(link)}
        type={'ghost'}
      >
        {t('View on explorer')}
      </Button>}
    </MetaInfo>
  );
};

const AccountTokenBalanceItem = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '&.meta-info-block': {
      marginTop: token.marginXS,
      paddingBottom: 0,

      '&:first-child': {
        marginTop: 0
      }
    },

    '&.account-token-detail': {
      '.__col:first-child': {
        flex: 2
      },

      '.__row': {
        marginBottom: 0
      }
    },

    '.account-info': {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: token.fontSizeHeading6,
      lineHeight: token.lineHeightHeading6,

      '.account-name-address': {
        overflow: 'hidden',
        textWrap: 'nowrap',
        display: 'flex',
        flexDirection: 'row'
      },

      '.account-name': {
        color: token.colorText,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },

      '.account-address': {
        color: token.colorTextTertiary
      },

      '.__value-col': {
        flex: '0 1 auto'
      },

      '.__label': {
        flex: '1',
        'white-space': 'nowrap'
      }
    },

    '.balance-info': {
      paddingLeft: token.paddingXL,

      '.__label': {
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeightSM,
        color: token.colorTextTertiary
      },

      '.__value': {
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeightSM
      },
      '.__value-col': {
        flex: '0 1 auto'
      }
    }
  };
});

export default AccountTokenBalanceItem;
