import Button from 'components/Button';
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalTitle } from 'components/Modal/styles';
import React, { MouseEventHandler } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';

interface ModalProps {
  show: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  title: string;
}

const root = document.getElementById('root') as HTMLElement;

const Modal: React.FC<ModalProps> = ({ show, onClose, onSubmit, title, children }) => {
  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <ModalContainer>
        <div className="modal-content">
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button
              type="button"
              width="auto"
              onClick={onSubmit}
              className="btn-submit"
            >
              Salvar
            </Button>
            <Button
              type="button"
              width="auto"
              onClick={onClose}
              className="btn-close"
            >
              Sair
            </Button>
          </ModalFooter>
        </div>
      </ModalContainer>
    </CSSTransition>, root
  );
};

export default Modal;
