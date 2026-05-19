import { CartItem } from '../cart/cart-item.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    isPopular: boolean;
    cartItems: CartItem[];
}
