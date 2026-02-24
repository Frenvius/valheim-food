import { NextResponse } from "next/server";
import type { ApiSuccessResponse, ApiErrorResponse } from "@/domain/types";

export class ApiResponse {
  static success<T>(data: T, status: number = 200): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status }
    );
  }

  static error(
    error: string,
    status: number = 500,
    details?: unknown
  ): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        error,
        details,
      },
      { status }
    );
  }

  static notFound(message: string = "Resource not found"): NextResponse<ApiErrorResponse> {
    return this.error(message, 404);
  }

  static unauthorized(message: string = "Authentication required"): NextResponse<ApiErrorResponse> {
    return this.error(message, 401);
  }

  static forbidden(message: string = "Access forbidden"): NextResponse<ApiErrorResponse> {
    return this.error(message, 403);
  }

  static badRequest(message: string, details?: unknown): NextResponse<ApiErrorResponse> {
    return this.error(message, 400, details);
  }

  static created<T>(data: T): NextResponse<ApiSuccessResponse<T>> {
    return this.success(data, 201);
  }

  static noContent(): NextResponse {
    return new NextResponse(null, { status: 204 });
  }
}
