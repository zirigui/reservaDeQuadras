import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 28rem;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    margin-top: 1rem;
    font-size: 1.875rem;
    font-weight: bold;
    color: #1f2937; // gray-900
  }

  p {
    margin-top: 0.5rem;
    color: #4b5563; // gray-600
  }
`;

export const IconContainer = styled.div`
  background-color: #e0e7ff; // indigo-100
  padding: 0.75rem;
  border-radius: 9999px;
  display: inline-block;
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-size: 0.875rem; // text-sm
    font-weight: 500;
    color: #4b5563; // gray-700
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-top: 0.25rem;
`;

export const IconWrapper = styled.div`
  position: absolute;
  inset-y: 0;
  left: 0;
  padding-left: 0.75rem;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const Input = styled.input`
  padding-left: 2.5rem;
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db; // gray-300
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1; // indigo-500
    outline: none;
    ring: 2px solid #6366f1; // indigo-500
  }
`;

export const Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem;
  background-color: #4f46e5; // indigo-600
  color: white;
  font-size: 0.875rem; // text-sm
  font-weight: 500;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca; // indigo-700
  }

  &:focus {
    outline: none;
    ring: 2px solid #6366f1; // indigo-500
  }
`;