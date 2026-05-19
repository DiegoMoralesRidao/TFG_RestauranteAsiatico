import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    } | {
        message: string;
    }>;
    register(req: {
        username: string;
        password: string;
    }): Promise<import("../users/user.entity").User>;
    getProfile(req: {
        user: any;
    }): any;
}
