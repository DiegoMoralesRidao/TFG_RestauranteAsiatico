import { CartItem } from '../cart/cart-item.entity';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    username: string;
    password?: string;
    role: UserRole;
    cartItems: CartItem[];
}
