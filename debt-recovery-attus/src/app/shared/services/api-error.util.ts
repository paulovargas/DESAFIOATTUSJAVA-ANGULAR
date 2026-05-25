import { HttpErrorResponse } from '@angular/common/http';

interface ApiErrorBody {
  message?: string;
  fields?: Record<string, string>;
}

export function apiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof HttpErrorResponse) {
    const body = error.error as ApiErrorBody | string | null;

    if (typeof body === 'string' && body.trim()) {
      return body;
    }

    if (body && typeof body === 'object') {
      if (body.fields && Object.keys(body.fields).length) {
        return Object.values(body.fields).join(' ');
      }

      if (body.message) {
        return body.message;
      }
    }
  }

  return fallback;
}
