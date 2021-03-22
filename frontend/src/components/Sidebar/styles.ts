import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 200px;
  height: 100%;
  background: #fefefe;
  border-right: 1px solid #edeef3;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1d94ee;
  }
`;

export const Content = styled.div`
  padding: 5px 0;
  width: 100%;
  nav {
    flex: 1;
    font-size: 1rem;
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      border-right: 4px solid #fefefe;
      color: #b2b7d2;
      transition: color 0.2s;
      padding: 10px;
      svg {
        width: 24px;
        height: 24px;
        margin: 0 15px;
      }
      & + a {
        margin-top: 5px;
      }
      &.active {
        border-left: 4px solid #1b1b3d;
        color: #1b1b3d;
      }
      &:hover {
        color: #1b1b3d;
      }
    }
  }
`;
