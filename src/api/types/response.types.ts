export interface ErrorDetail {
  readonly path: string;
  readonly message: string;
}

export interface PageInfo<TCursor> {
  readonly limit: number;
  readonly hasNextPage: boolean;
  readonly nextCursor: TCursor | null;
}

export interface Paginated<T, TCursor = number> {
  readonly data: T[];
  readonly pageInfo: PageInfo<TCursor>;
}

export interface ApiSuccessResponse<T> {
  readonly success: true;
  readonly data: T;
}

export interface ApiPaginatedResponse<T, TCursor = number> {
  readonly success: true;
  readonly data: T[];
  readonly pageInfo: PageInfo<TCursor>;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly details?: readonly ErrorDetail[];
  };
}

