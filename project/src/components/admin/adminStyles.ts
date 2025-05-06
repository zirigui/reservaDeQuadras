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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db; // gray-300
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #111827; // gray-900
`;

export const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #111827;
  background-color: white;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4F46E5; // indigo-600
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4338CA; // indigo-700
  }
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
