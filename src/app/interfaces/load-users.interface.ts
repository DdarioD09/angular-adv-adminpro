import { User } from "../models/user.model";

export interface loadUsers {
    total: number;
    users: User[];
}