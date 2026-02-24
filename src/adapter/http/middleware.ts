import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ApiResponse } from "./response";
import { getErrorMessage } from "./error-handler";

type ApiHandler<T = unknown> = (
  request: NextRequest,
  context?: T
) => Promise<NextResponse> | NextResponse;

type AuthenticatedHandler = (
  request: NextRequest,
  userId: number
) => Promise<NextResponse> | NextResponse;

export const withErrorHandling = (handler: ApiHandler): ApiHandler => {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      console.error("API Error:", error);
      const message = getErrorMessage(error);
      return ApiResponse.error(message);
    }
  };
};

export const withAuth = (handler: AuthenticatedHandler): ApiHandler => {
  return async (request: NextRequest) => {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ApiResponse.unauthorized("No token provided");
    }

    const token = authHeader.substring(7);

    try {
      const secret = process.env.SECRET;
      if (!secret) {
        throw new Error("JWT secret not configured");
      }

      const secretKey = new TextEncoder().encode(secret);
      const { payload } = await jwtVerify(token, secretKey);
      const userId = payload.sub as unknown as number;

      return await handler(request, userId);
    } catch (error) {
      console.error("Auth error:", error);
      return ApiResponse.unauthorized("Invalid or expired token");
    }
  };
};

export const withMethod = (
  allowedMethods: string[],
  handler: ApiHandler
): ApiHandler => {
  return async (request: NextRequest) => {
    if (!allowedMethods.includes(request.method)) {
      return ApiResponse.error(
        `Method ${request.method} not allowed`,
        405
      );
    }
    return handler(request);
  };
};

export const compose = <T = unknown>(
  ...middlewares: ((handler: ApiHandler<T>) => ApiHandler<T>)[]
): ((handler: ApiHandler<T>) => ApiHandler<T>) => {
  return (handler: ApiHandler<T>) => {
    return middlewares.reduceRight(
      (wrapped, middleware) => middleware(wrapped),
      handler
    );
  };
};
