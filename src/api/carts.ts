import { apiClient } from './client';
import type { CartsResponse, Cart } from '../types/api';

export const fetchCarts = async (limit: number, skip: number): Promise<CartsResponse> => {
    const { data } = await apiClient.get<CartsResponse>('/carts', {
        params: { limit, skip },
    });
    return data;
};

export const fetchCartById = async (id: string): Promise<Cart> => {
    const { data } = await apiClient.get<Cart>(`/carts/${id}`);
    return data;
};

interface UpdateCartParams {
    id: string;
    products: { id: number; quantity: number }[];
}

export const updateCart = async ({ id, products }: UpdateCartParams): Promise<Cart> => {
    const { data } = await apiClient.put<Cart>(`/carts/${id}`, {
        merge: false, // Изменили на false, чтобы сервер затирал удаленные продукты, а не мерджил их
        products,
    });

    // Фикс для DummyJSON: при PUT запросе сервер возвращает `discountedPrice`
    // вместо `discountedTotal` для каждого продукта. Нормализуем ответ.
    if (data && data.products) {
        data.products = data.products.map((p) => ({
            ...p,
            discountedTotal: p.discountedTotal ?? (p as unknown as { discountedPrice: number }).discountedPrice,
        }));
    }

    return data;
};
