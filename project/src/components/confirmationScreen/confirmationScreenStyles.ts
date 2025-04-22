import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

export const Card = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 32rem;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937; // gray-900
  }

  p {
    margin-top: 0.5rem;
    color: #4b5563; // gray-600
  }
`;

export const IconContainer = styled.div`
  background-color: #d1fae5; // green-100
  padding: 1rem;
  border-radius: 9999px;
  display: inline-block;
`;

export const Details = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DetailCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f3f4f6; // gray-50
  border-radius: 0.75rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Button = styled.button<{ bgColor: string; hoverColor: string; textColor?: string; borderColor?: string }>`
  width: 100%;
  padding: 1rem 1.25rem;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor || 'white'};
  font-size: 0.875rem; // text-sm
  font-weight: 500;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: ${(props) => (props.borderColor ? `1px solid ${props.borderColor}` : 'none')};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }

  &:focus {
    outline: none;
    ring: 2px solid #6366f1; // indigo-500
  }
`;