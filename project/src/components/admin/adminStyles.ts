import styled from 'styled-components';

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
    transform: scale(1.02);
  }
`;

export const NoticeCardContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NoticeCard = styled.div`
  background-color: #fff8e1;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const NoticeTextArea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
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

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
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

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0 1rem 0;
  color: #1f2937;
`;
