import { FC } from 'react';
import styled from 'styled-components';

const Divider = styled.hr`
  margin: 40px auto;
  border: 0;
  border-top: 3px solid rgba(255,255,255,.1);
  max-width: 90%;
`;

const BlockDivider: FC = () => <Divider />;

export default BlockDivider;
