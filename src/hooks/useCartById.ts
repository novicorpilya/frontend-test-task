import { useQuery } from '@tanstack/react-query';
import { fetchCartById } from '../api/carts';
import type { Cart } from '../types/api';

export const CART_DETAIL_QUERY_KEY = 'cart';

export const useCartByIdQuery = (id: string | undefined) => {
    return useQuery<Cart, Error>({
        // Кэш уникален для каждой корзины по её ID
        queryKey: [CART_DETAIL_QUERY_KEY, id],
        queryFn: () => {
            if (!id) throw new Error('ID корзины не предоставлен');
            return fetchCartById(id);
        },
        // Хук не будет делать запрос, если id === undefined (предотвращает ошибки на старте)
        enabled: !!id,
    });
};
