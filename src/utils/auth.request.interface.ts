import { Request } from "express";

export interface AuthRequest extends Request {
  user: AuthUser;
}

interface AuthUser {
  id: string;
  name: string;
}

export interface Pagination {
  page: number;
  size: number;
}
