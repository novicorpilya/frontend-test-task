import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useCartByIdQuery } from '../hooks/useCartById';
import { useUpdateCartMutation } from '../hooks/useUpdateCart';
import { TableContainer, StyledTable, Th, Td, Tr } from '../components/Table';
import { SkeletonBox } from '../components/Skeleton';
import { ErrorBanner } from '../components/ErrorBanner';
import type { Cart, Product } from '../types/api';
import {
  PageHeader,
  BackLink,
  Title,
  SummaryCards,
  CardBox,
  ProductImage,
  QuantityControl,
  DeleteButton,
} from './CartDetailPage.styles';

const CartSummary = ({ cart, isLoading }: { cart: Cart | undefined; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <SummaryCards>
        <SkeletonBox height="80px" />
        <SkeletonBox height="80px" />
        <SkeletonBox height="80px" />
      </SummaryCards>
    );
  }

  return (
    <SummaryCards>
      <CardBox>
        <h4>ID Клиента</h4>
        <p>User {cart?.userId}</p>
      </CardBox>
      <CardBox>
        <h4>Всего товаров</h4>
        <p>{cart?.totalProducts} шт. ({cart?.totalQuantity} поз.)</p>
      </CardBox>
      <CardBox>
        <h4>Общая сумма</h4>
        <p style={{ color: '#2b8a3e' }}>${cart?.discountedTotal}</p>
      </CardBox>
    </SummaryCards>
  );
};

const CartTableSkeleton = () => (
  <>
    {Array.from({ length: 3 }).map((_, index) => (
      <Tr key={`skel-${index}`}>
        <Td><SkeletonBox width="40px" height="40px" /></Td>
        <Td><SkeletonBox width="150px" /></Td>
        <Td><SkeletonBox width="50px" /></Td>
        <Td><SkeletonBox width="80px" /></Td>
        <Td><SkeletonBox width="60px" /></Td>
        <Td><SkeletonBox width="30px" /></Td>
      </Tr>
    ))}
  </>
);

const CartProductRow = memo(({
  product,
  onQuantityChange,
  onDelete,
  isPending
}: {
  product: Product;
  onQuantityChange: (id: number, qty: number) => void;
  onDelete: (id: number) => void;
  isPending: boolean;
}) => (
  <Tr>
    <Td>
      <ProductImage src={product.thumbnail} alt={product.title} loading="lazy" />
    </Td>
    <Td>
      <strong>{product.title}</strong>
      <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
        Скидка: {product.discountPercentage}%
      </div>
    </Td>
    <Td>${product.price}</Td>
    <Td>
      <QuantityControl>
        <button
          onClick={() => onQuantityChange(product.id, Math.max(1, product.quantity - 1))}
          disabled={isPending || product.quantity <= 1}
          aria-label="Уменьшить количество"
        >
          -
        </button>
        <span>{product.quantity}</span>
        <button
          onClick={() => onQuantityChange(product.id, product.quantity + 1)}
          disabled={isPending}
          aria-label="Увеличить количество"
        >
          +
        </button>
      </QuantityControl>
    </Td>
    <Td>
      <strong>${product.discountedTotal}</strong>
    </Td>
    <Td>
      <DeleteButton
        title="Удалить из корзины"
        onClick={() => onDelete(product.id)}
        disabled={isPending}
        aria-label="Удалить товар"
      >
        🗑
      </DeleteButton>
    </Td>
  </Tr>
));

CartProductRow.displayName = 'CartProductRow';

export const CartDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: cart, isLoading, isError, refetch } = useCartByIdQuery(id);
  const updateMutation = useUpdateCartMutation(id!);

  const handleQuantityChange = useCallback((productId: number, newQuantity: number) => {
    if (!cart) return;
    const updatedProducts = cart.products.map((p) => ({
      id: p.id,
      quantity: p.id === productId ? newQuantity : p.quantity
    }));
    updateMutation.mutate({ id: id!, products: updatedProducts });
  }, [cart, id, updateMutation]);

  const handleDeleteProduct = useCallback((productId: number) => {
    if (!cart) return;
    const remainingProducts = cart.products
      .filter((p) => p.id !== productId)
      .map(({ id, quantity }) => ({ id, quantity }));
    updateMutation.mutate({ id: id!, products: remainingProducts });
  }, [cart, id, updateMutation]);

  if (isError) {
    return (
      <div>
        <BackLink to="/carts" aria-label="Назад к списку">←</BackLink>
        <ErrorBanner
          message="Не удалось загрузить данные заказа. Возможно, данного заказа не существует."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader>
        <BackLink to="/carts" title="Назад к списку" aria-label="Назад к списку">←</BackLink>
        <Title>Детали заказа #{id}</Title>
      </PageHeader>

      {updateMutation.isPending && (
        <div style={{ padding: '8px 16px', background: '#e6f7ff', color: '#096dd9', borderRadius: '4px', marginBottom: '16px', fontSize: '14px' }}>
          Сохраняем изменения...
        </div>
      )}

      {updateMutation.isError && (
        <ErrorBanner
          message="Не удалось сохранить изменения на сервере. Попробуйте еще раз."
          onRetry={() => updateMutation.reset()}
        />
      )}

      <CartSummary cart={cart} isLoading={isLoading} />

      <h2>Состав корзины</h2>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <Th>Фото</Th>
              <Th>Название товара</Th>
              <Th>Цена ($)</Th>
              <Th>Кол-во</Th>
              <Th>Итог ($)</Th>
              <Th>Действие</Th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <CartTableSkeleton />
            ) : (
              cart?.products.map((product) => (
                <CartProductRow
                  key={product.id}
                  product={product}
                  onQuantityChange={handleQuantityChange}
                  onDelete={handleDeleteProduct}
                  isPending={updateMutation.isPending}
                />
              ))
            )}

            {!isLoading && (!cart?.products || cart.products.length === 0) && (
              <tr>
                <Td colSpan={6} style={{ textAlign: 'center', padding: '32px' }}>
                  Корзина пуста
                </Td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
};
