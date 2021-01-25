import styled, { css } from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';
import sizes from '../../sizes';

const icon = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 24px;
    fill: #aeaeae;
  }
`;

export const Container = styled.div`
  ${[sizes.up('sm')]} {
    display: none;
  }
`;

export const Space = styled.div`
  margin-top: 50px;
`;

export const Navbar = styled.nav`
  width: 100%;
  height 44px;
  bottom: 0;
  display: flex;
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
`;

export const NavLink = styled(RouterNavLink)`
  ${icon}
  &.active {
    svg {
      fill: #fff;
    }
  }
`;

export const SignOutWrapper = styled.div`
  ${icon}
  cursor: pointer;
`;