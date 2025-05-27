import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  padding: 1.5rem;
`;

export const Wrapper = styled.div`
  max-width: 768px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
`;

export const NewBookingButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4f46e5;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #6366f1;
  }
`;

export const ReservationCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CourtInfo = styled.h3`
  font-weight: 500;
`;

export const WarningText = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #d97706;
`;

export const CancelButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  background: none;
  color: ${({ disabled }) => (disabled ? '#9ca3af' : '#dc2626')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'none' : '#fef2f2')};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

export const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #1f2937;
`;

export const EmptyText = styled.p`
  margin-top: 0.25rem;
  color: #6b7280;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
`;

export const ModalText = styled.p`
  font-size: 1rem;
  color: #555;
`;

export const ModalButton = styled.button`
  margin-top: 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #43a047;
  }
`;