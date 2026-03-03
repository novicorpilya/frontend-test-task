import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartsQuery } from '../hooks/useCartsQuery';
import { TableContainer, StyledTable, Th, Td, Tr, ActionButton } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { SkeletonBox } from '../components/Skeleton';
import { ErrorBanner } from '../components/ErrorBanner';
import type { Cart } from '../types/api';
import { PageHeader, PageTitle } from './CartsPage.styles';

const CartsTableSkeleton = () => (
    <>
        {Array.from({ length: 10 }).map((_, index) => (
            <Tr key={`skeleton-${index}`}>
                <Td><SkeletonBox width="40px" /></Td>
                <Td><SkeletonBox width="80px" /></Td>
                <Td><SkeletonBox width="100px" /></Td>
                <Td><SkeletonBox width="90px" /></Td>
                <Td><SkeletonBox width="110px" height="34px" borderRadius="6px" /></Td>
            </Tr>
        ))}
    </>
);

const CartRow = memo(({ cart, onNavigate }: { cart: Cart; onNavigate: (id: number) => void }) => (
    <Tr>
        <Td>#{cart.id}</Td>
        <Td>User {cart.userId}</Td>
        <Td>
            {cart.totalProducts} ({cart.totalQuantity} items)
        </Td>
        <Td>
            <strong>${cart.total.toFixed(2)}</strong>
            {cart.discountedTotal < cart.total && (
                <span style={{ color: 'green', display: 'block', fontSize: '12px' }}>
                    (Discount: ${cart.discountedTotal})
                </span>
            )}
        </Td>
        <Td>
            <ActionButton onClick={() => onNavigate(cart.id)}>
                Подробнее
            </ActionButton>
        </Td>
    </Tr>
));

CartRow.displayName = 'CartRow';

export const CartsPage = () => {
    const { data, isLoading, isError, refetch } = useCartsQuery();
    const navigate = useNavigate();

    const handleNavigate = useCallback((id: number) => navigate(`/carts/${id}`), [navigate]);

    return (
        <div>
            <PageHeader>
                <PageTitle>Список корзин</PageTitle>
            </PageHeader>

            {isError && (
                <ErrorBanner
                    message="Не удалось загрузить список корзин. Пожалуйста, проверьте подключение к интернету или попробуйте позже."
                    onRetry={() => refetch()}
                />
            )}

            {!isError && (
                <TableContainer>
                    <StyledTable>
                        <thead>
                            <tr>
                                <Th>ID Корзины</Th>
                                <Th>ID Пользователя</Th>
                                <Th>Кол-во товаров (шт)</Th>
                                <Th>Сумма</Th>
                                <Th>Действие</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <CartsTableSkeleton />
                            ) : (
                                data?.carts.map((cart) => (
                                    <CartRow
                                        key={cart.id}
                                        cart={cart}
                                        onNavigate={handleNavigate}
                                    />
                                ))
                            )}

                            {!isLoading && data?.carts.length === 0 && (
                                <tr>
                                    <Td colSpan={5} style={{ textAlign: 'center', padding: '32px' }}>
                                        Ничего не найдено
                                    </Td>
                                </tr>
                            )}
                        </tbody>
                    </StyledTable>
                </TableContainer>
            )}

            {!isError && data && <Pagination total={data.total} />}
        </div>
    );
};
