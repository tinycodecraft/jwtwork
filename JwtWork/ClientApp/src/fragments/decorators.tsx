import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FADE_IN_KEYFRAMES = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

  const BigIcon = styled(FontAwesomeIcon)`
  color: #fff;
  padding: 10px;
  font-size: 1.75em;
`;

export { FADE_IN_KEYFRAMES, BigIcon}