import type { GenericAbortSignal, Method } from 'axios';

export enum RequestMethod {
  POST = 'POST',
  DELETE = 'DELETE',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export type Response = {
  body: unknown;
  status: unknown;
};

export type ApiBody = {
  [key: string]: unknown;
};

export type RequestOption = {
  url?: string;
  adminApi?: boolean;
  tokenLess?: boolean;
  method: Method;
  action?: string | number;
  params?: unknown;
  body?: unknown;
  token?: string;
  signal?: GenericAbortSignal;
};

export interface RequestError {
  data?: unknown[];
}

export enum EXCEPTION_CODE {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  CONFLICT = 'CONFLICT',
  EXPECTATION_FAILED = 'EXPECTATION_FAILED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  OBJECT_ID_IS_FALSE = 'OBJECT_ID_IS_FALSE',
  USER_WITH_THIS_PHONE_NUMBER_ALREADY_EXIST = 'USER_WITH_THIS_PHONE_NUMBER_ALREADY_EXIST',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_IS_SUSPENDED = 'USER_IS_SUSPENDED',
  PASSWORD_IS_WRONG = 'PASSWORD_IS_WRONG',
  CLIENT_ERROR = 'CLIENT_ERROR',
}

export class ErrorException {
  errorCode: number;
  data: string;
  code: number;
  msg: keyof typeof EXCEPTION_CODE;

  constructor(
    data: string,
    msg: keyof typeof EXCEPTION_CODE,
    code: number,
    errorCode: number
  ) {
    this.data = data;
    this.errorCode = errorCode;
    this.code = code;
    this.msg = msg;
  }
}

export type ErrorExceptions = ErrorException[];
