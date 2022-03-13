export interface User {
    id: string;
    name: string;
    picture: string;
}

export interface UserFull {
    id: string;
    name: string;
    picture: string;
    email: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

type Role = 'user' | 'admin';

export interface UserCreate {
    email: string;
    password: string;
    name: string;
    role?: Role;
}

export interface MenuCreate {
    name: string;
    icon: string;
    menus: Array<string>;
    path: string;
}

export interface MenuResponse  {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    icon: string;
    menus: Array<MenuResponse>;
    path: string;
}

export interface LoginSuccess {
    user: any,
    token: string
}

export interface LoginSend {
}
