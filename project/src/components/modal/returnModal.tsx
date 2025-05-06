import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  message: string;
  onClose: (result: boolean) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  const handleOkClick = () => {
    onClose(true); // Retorna 'true' ao clicar no OK
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalMessage>{message}</ModalMessage>
        <ModalButton onClick={handleOkClick}>OK</ModalButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
