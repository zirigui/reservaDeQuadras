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
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937; // gray-900
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #111827;
  background-color: white;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ListItem = styled.li`
  background-color: #f9fafb; // gray-50
  padding: 1rem;
  border: 1px solid #e5e7eb; // gray-200
  border-radius: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CourtCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

export const CourtCard = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const CardContent = styled.div`
  text-align: center;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  p {
    color: #666;
  }
`;

export const Form = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 8px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;


