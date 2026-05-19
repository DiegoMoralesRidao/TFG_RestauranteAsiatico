import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
export declare class CartItem {
    id: number;
    quantity: number;
    paymentDate: Date;
    user: User;
    product: Product;
}
