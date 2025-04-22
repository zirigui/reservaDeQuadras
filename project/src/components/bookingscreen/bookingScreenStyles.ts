import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  padding: 1.5rem;
`;

export const Card = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 60rem;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.875rem; // text-3xl
  font-weight: bold;
  color: #1f2937; // gray-900
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const DateText = styled.span`
  color: #4b5563; // gray-600
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const CourtSection = styled.div``;

export const SectionTitle = styled.h3`
  font-size: 1.125rem; // text-lg
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const CourtList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CourtButton = styled.button<{ selected: boolean }>`
  padding: 1rem;
  border-radius: 0.75rem;
  border: ${(props) => (props.selected ? '2px solid #4F46E5' : '1px solid #D1D5DB')};
  background-color: ${(props) => (props.selected ? '#E0E7FF' : 'transparent')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    border-color: #4F46E5;
  }
`;

export const CourtName = styled.h4`
  font-weight: 500;
`;

export const CourtType = styled.p`
  font-size: 0.875rem; // text-sm
  color: #6B7280; // gray-500
`;

export const SelectedIndicator = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background-color: #4F46E5; // indigo-600
`;

export const TimeSection = styled.div``;

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const TimeButton = styled.button<{ selected: boolean }>`
  padding: 0.75rem;
  text-align: center;
  border-radius: 0.75rem;
  background-color: ${(props) => (props.selected ? '#4F46E5' : '#F3F4F6')};
  color: ${(props) => (props.selected ? 'white' : '#4B5563')};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? '#4338CA' : '#E5E7EB')};
  }
`;

export const ActionButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`;

export const ActionButton = styled.button<{ disabled: boolean }>`
  padding: 1rem 1.5rem;
  background-color: #4F46E5;
  color: white;
  font-size: 1rem; // text-base
  font-weight: 600;
  border-radius: 0.75rem;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#4F46E5' : '#4338CA')};
  }
`;
