import React from 'react';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { Wrapper, Container } from './styles';

const DefaultLayout: React.FC = ({ children }) => (
  <Wrapper>
    <Header />
    <Container>
      <Sidebar />
      {children}
    </Container>
  </Wrapper>
);

export default DefaultLayout;
