import { Request } from "express";

const statuses = ["ACTIVE", "INACTIVE", "SUSPENDED", "DELETED", "BANNED"] as const;
export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    username: string;
    age?: number;
    phoneNumber?: string;
    roles?: string[]; // Array of role names
    status?: typeof statuses[number];
}

export interface AuthTokenPayload {
    userId: string;
    email: string;
    roles: string[] | undefined; 
}

export interface RequestWithAuth extends Request {
    user: AuthTokenPayload;
}

export class UserWithToken {
    user: User;
    token: string;
}