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
    groups: Array<GroupResponse>
}

export interface UserLogin {
    id: string
    email: string;
    password: string;

}

type Role = 'user' | 'admin';

export interface UserCreate {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: Role;
    groups: Array<string>
}

export interface MenuCreate {
    id?: string;
    name: string;
    icon: string;
    menus: Array<string>;
    path: string;
}

export interface GroupCreate {
    id?: string;
    name: string;
    menus: Array<string>;
}

export interface GroupResponse {
    id: string;
    name: string;
    icon: string;
    menus: Array<MenuResponse>;
    createdAt: Date;
    updatedAt: Date;
}

export interface MenuResponse {
    id: string;
    name: string;
    icon: string;
    menus: Array<MenuResponse>;
    path: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginSuccess {
    user: any,
    token: string
}

export interface LoginSend {
}
