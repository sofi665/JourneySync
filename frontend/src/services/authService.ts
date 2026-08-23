import api from "./api";

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
}

export interface LoginResponse {
    token: string;
    user: UserResponse;
}

export const register = async (
    data: RegisterRequest
): Promise<UserResponse> => {

    const response = await api.post<UserResponse>(
        "/auth/register",
        data
    );

    return response.data;
};

export const login = async (
    data: LoginRequest
): Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>(
        "/auth/login",
        data
    );

    return response.data;
};
