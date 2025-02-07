import styled from 'styled-components';
import sizes from '@/utils/sizes';
import { fadeEffect } from '@/root/GlobalStyles';

export const Container = styled.div`
  width: 585px;
  height: 530px;
  ${[sizes.up('xl')]} {
    width: 819px;
    height: 742px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  filter: contrast(110%);
  -webkit-filter: contrast(110%);
  ${fadeEffect}
`;
