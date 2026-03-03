import { useQuery } from '@tanstack/react-query';
import { fetchCarts } from '../api/carts';
import { usePaginationStore } from '../store/usePaginationStore';
import type { CartsResponse } from '../types/api';

// Ключ для кэша вынесен отдельно для удобства инвалидации
export const CARTS_QUERY_KEY = 'carts';

export const useCartsQuery = () => {
    // Подписываемся на Zustand store для получения текущей страницы (skip/limit)
    const limit = usePaginationStore((state) => state.limit);
    const skip = usePaginationStore((state) => state.skip);

    return useQuery<CartsResponse, Error>({
        // Кэш будет уникальным для каждой комбинации limit и skip!
        queryKey: [CARTS_QUERY_KEY, { limit, skip }],
        queryFn: () => fetchCarts(limit, skip),
        // Сохраняем предыдущие данные на экране, пока грузятся новые (избегает "мерцания")
        placeholderData: (previousData) => previousData,
    });
};
