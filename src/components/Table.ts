import styled from '@emotion/styled';

export const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  background: white;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const Th = styled.th`
  background-color: #f8f9fa;
  color: #495057;
  padding: 16px;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  color: #212529;
  vertical-align: middle;
`;

export const Tr = styled.tr`
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f3f5;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

export const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #0056b3;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    background-color: #a0c4ff;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
