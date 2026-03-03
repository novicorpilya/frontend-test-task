import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
  border-radius: 8px;
  padding: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #cf1322;
`;

const RetryButton = styled.button`
  margin-top: 16px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cf1322;
  }
`;

interface ErrorBannerProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorBanner = ({ message = 'Произошла непредвиденная ошибка.', onRetry }: ErrorBannerProps) => {
    return (
        <ErrorContainer>
            <h3>Что-то пошло не так</h3>
            <p>{message}</p>
            {onRetry && (
                <RetryButton onClick={onRetry}>
                    Попробовать снова
                </RetryButton>
            )}
        </ErrorContainer>
    );
};
