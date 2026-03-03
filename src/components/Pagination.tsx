import styled from '@emotion/styled';
import { usePaginationStore } from '../store/usePaginationStore';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;

const NextPrevButton = styled.button`
  background-color: transparent;
  border: 1px solid #ced4da;
  color: #495057;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #f1f3f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  font-size: 14px;
  color: #495057;
`;

interface PaginationProps {
  total: number;
}

export const Pagination = ({ total }: PaginationProps) => {
  const { skip, limit, setSkip } = usePaginationStore();

  const handlePrev = () => {
    if (skip >= limit) setSkip(skip - limit);
  };

  const handleNext = () => {
    if (skip + limit < total) setSkip(skip + limit);
  };

  const safeLimit = Math.max(1, limit);
  const currentPage = Math.floor(skip / safeLimit) + 1;
  const totalPages = Math.ceil(total / safeLimit);

  return (
    <PaginationContainer>
      <NextPrevButton onClick={handlePrev} disabled={skip === 0}>
        Нaзaд
      </NextPrevButton>
      <PageInfo>
        Страница {currentPage} из {totalPages || 1}
      </PageInfo>
      <NextPrevButton onClick={handleNext} disabled={skip + limit >= total}>
        Вперед
      </NextPrevButton>
    </PaginationContainer>
  );
};
