import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    border-radius: 25px;
    svg {
      margin-right: 5px;
    }
  }
`;

export const ModalContent = styled.div`
  padding: 5px;
  display: flex;
  label {
    color: var(--title-secondary);
    width: 100%;
    display: block;
    div {
      display: flex;
      justify-content: space-between;
    }
    .error {
      color: #c53030;
      font-size: 0.8rem;
      font-weight: 500;
      text-align: right;
    }
    input {
      width: 100%;
      margin-top: 5px;
      padding: 5px 10px;
    }
  }
`;
