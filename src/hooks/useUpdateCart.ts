import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCart } from '../api/carts';
import { CARTS_QUERY_KEY } from './useCartsQuery';
import { CART_DETAIL_QUERY_KEY } from './useCartById';
import type { CartsResponse } from '../types/api';

export const useUpdateCartMutation = (cartId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCart,
        onSuccess: (updatedCart) => {
            // 1. Обновляем данные текущей корзины (детальная страница) НАПРЯМУЮ в кэше.
            queryClient.setQueryData([CART_DETAIL_QUERY_KEY, cartId], updatedCart);

            // 2. ВРУЧНУЮ обновляем список корзин в кэше.
            // DummyJSON НЕ сохраняет изменения в своей базе данных по-настоящему. 
            // Если мы сделаем invalidateQueries, React Query сделает GET запрос и получит СТАРЫЕ данные.
            // Поэтому мы обновляем текущий кэш страницы корзин руками, чтобы UI показывал новые суммы!
            queryClient.setQueriesData<CartsResponse>({ queryKey: [CARTS_QUERY_KEY] }, (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    carts: oldData.carts.map((cart) =>
                        cart.id === updatedCart.id ? updatedCart : cart
                    ),
                };
            });
        },
    });
};
