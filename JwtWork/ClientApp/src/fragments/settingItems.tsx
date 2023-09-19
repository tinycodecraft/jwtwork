import styled from '@emotion/styled';
import { FADE_IN_KEYFRAMES } from './decorators';


const SettingsLink = styled.a`
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 0.25rem;
  background: transparent;
`;

const SettingsMenuLink = styled.a`
  width: 100%;
  color: #555;
  font-size: 1rem;
  z-index: initial;
  text-align: left;
  line-height: 1.5;
  position: relative;
  white-space: nowrap;
  display: inline-block;
  padding: 0.375rem 1rem;
  pointer-events: visible;

  svg {
    opacity: 0.8;
    margin: 0 0.3rem;
  }
`;

const SettingsMenuTitle = styled.li`
  color: #7f888f;
  font-size: 18px;
  font-weight: 600;
  margin-left: auto;
  line-height: 35px;
  margin-right: auto;
  text-align: center;
  padding-bottom: 3px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SettingsMenu = styled.ul`
  top: 0;
  opacity: 1;
  left: auto;
  right: 69px;
  width: 11rem;
  z-index: 1000;
  display: block;
  padding: 5px 0;
  min-width: 11rem;
  user-select: none;
  position: absolute;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.08), 0 5px 20px 0 rgba(0, 0, 0, 0.06);

  :before,
  :after {
    top: 22px;
    content: '';
    width: 17px;
    position: absolute;
    display: inline-block;
    transform: translateY(-50%);
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
  }

  :before {
    left: auto;
    right: -16px;
    margin-left: auto;
    border-left: 16px solid #dbdbdb;
  }

  :after {
    right: -15px;
    border-left: 16px solid #fff;
  }

  > li:not(:first-of-type) {
    transition: background-color .2s ease-out;

    :hover {
      background-color: #f5f5f5;
    }
  }
`;

const StyledSettings = styled.div<{ isMenuOpen: boolean }>`
  right: 0;
  top: 120px;
  width: 65px;
  z-index: 1031;
  position: fixed;
  text-align: center;
  animation-delay: 0.25s;
  border-radius: 8px 0 0 8px;
  transition: background 0.15s ease-in;
  animation: ${FADE_IN_KEYFRAMES} 0.25s both ease;
  background: ${({ isMenuOpen }) => `rgba(0, 0, 0, ${isMenuOpen ? 0.6 : 0.45})`};

  :hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

export {  SettingsLink, SettingsMenu, SettingsMenuLink, SettingsMenuTitle,StyledSettings }