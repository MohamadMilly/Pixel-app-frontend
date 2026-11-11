import type { AccountView } from "../../../../shared/types/account.types";

export interface AuthTokenView {
  readonly accessToken: string;
  readonly tokenType: "Bearer";
  /** Access-token lifetime in seconds. */
  readonly expiresIn: number;
  readonly refreshToken: string;
  /** Refresh-token lifetime in seconds. */
  readonly refreshExpiresIn: number;
  readonly account: AccountView;
}

export type LoginRequestDto = {
  username: string;
  password: string;
};

