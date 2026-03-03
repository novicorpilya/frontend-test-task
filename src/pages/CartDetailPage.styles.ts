import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  color: #495057;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: #e9ecef;
    color: #212529;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
`;

export const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CardBox = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaeaea;

  h4 {
    margin: 0 0 8px 0;
    color: #6c757d;
    font-size: 14px;
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #212529;
  }
`;

export const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid #eee;
  background: #fff;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #ced4da;
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background: #f1f3f5;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  span {
    min-width: 20px;
    text-align: center;
    font-weight: 500;
  }

  @media (max-width: 480px) {
    button {
      width: 36px;
      height: 36px; 
    }
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  padding: 8px;
  font-size: 18px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: #fff1f0;
  }

  &:disabled {
    color: #ffccc7;
    cursor: not-allowed;
  }
`;
