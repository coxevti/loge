import styled, { css } from 'styled-components';

interface StatusProps {
  status: boolean;
}

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
    svg {
      margin-right: 10px;
    }
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
    > input {
      width: 100%;
      margin-top: 5px;
      padding: 5px 10px;
    }
    .groupRadioButton {
      display: flex;
    }
  }
  [type='radio']:checked,
  [type='radio']:not(:checked) {
    position: absolute;
    left: -9999px;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .checkbox-box:checked + label,
  .checkbox-box:not(:checked) + label {
    margin-top: 15px;
    position: relative;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    justify-content: center;
    -ms-flex-pack: center;
    text-align: center;
    padding: 6px 25px;
    font-size: 14px;
    line-height: 30px;
    letter-spacing: 1px;
    margin-left: 6px;
    margin-right: 6px;
    margin-bottom: 16px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    color: var(--white);
    text-transform: uppercase;
    background-color: var(--dark-light);
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }
  .checkbox-box:checked + label::before,
  .checkbox-box:not(:checked) + label::before {
    position: absolute;
    content: '';
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border-radius: 4px;
    z-index: -2;
    background-image: linear-gradient(138deg, var(--red), var(--yellow));
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }
  .checkbox-box:not(:checked) + label::before {
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
  }
  .checkbox-box:checked + label::after,
  .checkbox-box:not(:checked) + label::after {
    position: absolute;
    content: '';
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border-radius: 4px;
    z-index: -2;
    background-color: var(--dark-light);
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }
  .checkbox-box:checked + label::after {
    opacity: 0;
  }
  .checkbox-box:checked + label .text,
  .checkbox-box:not(:checked) + label .text {
    position: relative;
    display: inline-block;
    -webkit-transition: opacity 300ms linear;
    transition: opacity 300ms linear;
  }
  .checkbox-box:checked + label .text {
    opacity: 0.6;
  }
  .checkbox-box:checked + label .text::after,
  .checkbox-box:not(:checked) + label .text::after {
    position: absolute;
    content: '';
    width: 0;
    left: 0;
    top: 50%;
    margin-top: -1px;
    height: 2px;
    background-image: linear-gradient(138deg, var(--red), var(--yellow));
    z-index: 1;
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }
  .checkbox-box:not(:checked) + label .text::after {
    width: 0;
  }
  .checkbox-box:checked + label .text::after {
    width: 100%;
  }
`;

export const TableColumnStatus = styled.span<StatusProps>`
  padding: 5px 20px;
  border-radius: 15px;
  width: 100%;
  color: white;
  background: #ff0000;
  ${(props) => props.status && css`background: #00cf00`}
`;
