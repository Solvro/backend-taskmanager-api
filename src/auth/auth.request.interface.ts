import { Request } from "express";

export interface AuthApiRequest extends Request {
  client: string;
}

export interface AuthRequest extends Request {
  user: AuthUser;
  client: string;
}

export interface SearchRequest extends AuthRequest {
  pagination: Pagination;
}

interface AuthUser {
  id: string;
  name: string;
}

export interface Pagination {
  page: number;
  size: number;
}

export interface AuthData {
  id: string;
  version: string;
  usersCredentials: { [userId: string]: string };
}
