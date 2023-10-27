import { useEffect, memo } from 'react';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import PropTypes from 'prop-types'
import { ApiStatusEnum } from 'src/config';


type AuthenticatorProps = Readonly<{
  delay?: number;
  authStatus: ApiStatusEnum;
  error: any;  
  handleOnFail: (...args: typeof PropTypes.any[]) => void|typeof PropTypes.any;
  handleOnSuccess: (...args: typeof PropTypes.any[]) => void|typeof PropTypes.any;
}>;

const CHILD_DIV_COUNT = 9;

const ROTATE_KEYFRAMES = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const getChildDivBorderColor = (authStatus: ApiStatusEnum): string => {
  switch (authStatus) {
    case ApiStatusEnum.FAILURE: return '#e93e60';
    case ApiStatusEnum.SUCCESS: return '#09d3ac';
    default: return 'rgba(9, 30, 66, 0.35)';
  }
};

const getChildDivCSS = (): string => {
  const childDivTemplate = (idx: number): string => `
    &:nth-child(${idx + 1}) {
      height: calc(96px / 9 + ${idx} * 96px / 9);
      width: calc(96px / 9 + ${idx} * 96px / 9);
      animation-delay: calc(50ms * ${idx + 1});
    }
  `;

  return [...Array(CHILD_DIV_COUNT).keys()]
    .map((key) => childDivTemplate(key))
    .join('');
};

const AuthenticatorWrapper = styled.div<Pick<AuthenticatorProps, 'authStatus'>>`
  width: 100px;
  height: 100px;
  padding: 2px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin: 1.25em auto auto auto;

  > div {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-top-color: ${({ authStatus }) => getChildDivBorderColor(authStatus)};
    animation: ${ROTATE_KEYFRAMES} 1500ms cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards;

    ${getChildDivCSS()}
  }
`;

const Authenticator = memo<AuthenticatorProps>(({
  authStatus,
  error,  
  handleOnFail,
  handleOnSuccess,
  delay = 1500
}: AuthenticatorProps) => {
  useEffect(() => {
    const authHandler = setTimeout(() => {
      switch (authStatus) {
        case ApiStatusEnum.FAILURE: return handleOnFail(error);
        case ApiStatusEnum.SUCCESS: return handleOnSuccess();
        default: return;
      }
    }, delay);

    return () => {
      clearTimeout(authHandler);
    }
  }, [authStatus,error, delay, handleOnFail, handleOnSuccess]);

  if (!authStatus || authStatus === ApiStatusEnum.NONE) {
    return null;
  }

  return (
    <AuthenticatorWrapper authStatus={authStatus}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </AuthenticatorWrapper>
  );
});

Authenticator.displayName = 'Authenticator';

export default Authenticator;