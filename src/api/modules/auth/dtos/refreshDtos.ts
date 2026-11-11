export interface RefreshRequestDto {
  refreshToken: string;
}

export interface RefreshedResponseDto {
  readonly accessToken: string;
  readonly tokenType: "Bearer";
  readonly expiresIn: number;
  readonly refreshToken: string;
  readonly refreshExpiresIn: number;
}
