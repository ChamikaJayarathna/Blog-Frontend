import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme === 'dark' ? 'rgb(16, 23, 42)' : 'white'};
  color: ${({ theme }) => theme === 'dark' ? '#FFFFFF' : 'gray-700'};
  min-height: 100vh;
`;

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector(state => state.theme);

  return (
    <StyledContainer theme={theme}>
      {children}
    </StyledContainer>
  );
};

export default ThemeProvider;
