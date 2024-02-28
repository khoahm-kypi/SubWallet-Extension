// Copyright 2019-2022 @subwallet/extension-web-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BaseModal } from '@subwallet/extension-web-ui/components';
import ChooseFeeItem from '@subwallet/extension-web-ui/components/Field/Swap/ChooseFeeItem';
import { ThemeProps } from '@subwallet/extension-web-ui/types';
import { ModalContext, Number } from '@subwallet/react-ui';
import CN from 'classnames';
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

type Props = ThemeProps & {
  modalId: string
}
const fakedatas =
  [{
    slug: 'polkadot-NATIVE-DOT',
    symbol: 'DOT',
    haveToPay: '100',
    availableBalance: '500',
    selected: true
  },
  {
    slug: 'kusama-NATIVE-KSM',
    symbol: 'KSM',
    haveToPay: '100',
    availableBalance: '500',
    selected: false
  },
  {
    slug: 'aleph-NATIVE-AZERO',
    symbol: 'AZERO',
    haveToPay: '100',
    availableBalance: '500',
    selected: true
  }
  ];

const Component: React.FC<Props> = (props: Props) => {
  const { className, modalId } = props;

  const { inactiveModal } = useContext(ModalContext);

  const onCancel = useCallback(() => {
    inactiveModal(modalId);
  }, [inactiveModal, modalId]);

  return (
    <>
      <BaseModal
        className={CN(className, 'choose-fee-token-container')}
        closable={true}
        destroyOnClose={true}
        id={modalId}
        onCancel={onCancel}
        title={'Choose fee token'}
      >
        <div className={'__choose-fee-wrapper'}>
          <div className={'__estimate-fee'}>
            <span className={'__title'}>Estimated  fee</span>
            <Number
              className={'__value'}
              decimal={3}
              decimalOpacity={0.45}
              prefix={'$'}
              size={30}
              value={1092}
            />
            <span className={'__pay-with'}>Pay with token:</span>
          </div>
          {fakedatas.map((fakedata, index) => (
            <ChooseFeeItem
              availableBalance={fakedata.availableBalance}
              haveToPay={fakedata.haveToPay}
              key={index}
              selected={fakedata.selected}
              slug={fakedata.slug}
              symbol={fakedata.symbol}
            />
          ))}
        </div>
      </BaseModal>
    </>
  );
};

const ChooseFeeTokenModal = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.__estimate-fee': {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24
    },
    '.__title': {
      fontSize: 14,
      fontWeight: token.bodyFontWeight,
      lineHeight: token.lineHeight,
      color: token.colorTextTertiary
    },
    '.__pay-with': {
      fontSize: 14,
      fontWeight: token.fontWeightStrong,
      lineHeight: token.lineHeight,
      color: token.colorTextTertiary
    },
    '.__value': {
      fontSize: token.fontSizeHeading2,
      lineHeight: token.lineHeightHeading2,
      fontWeight: token.fontWeightStrong,
      color: token.colorTextLight1,

      '.ant-number-integer, ant-number-prefix': {
        color: 'inherit !important',
        fontSize: 'inherit !important',
        fontWeight: `${token.fontWeightStrong}px !important`,
        lineHeight: 'inherit'
      },

      '.ant-number-decimal': {
        color: `${token.colorTextLight3} !important`,
        fontSize: `${token.fontSizeHeading3}px !important`,
        fontWeight: 'inherit !important',
        lineHeight: token.lineHeightHeading3
      }
    }

  };
});

export default ChooseFeeTokenModal;
