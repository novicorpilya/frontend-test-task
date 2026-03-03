import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Отключаем повторные запросы при фокусе, чтобы избежать лишней нагрузки
            retry: 1, // Количество повторных попыток при неудачных запросах
            staleTime: 5 * 60 * 1000, // Данные считаются "свежими" 5 минут
        },
    },
});
