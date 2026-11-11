export type UserRole = "USER" | "LIBRARY" | "ADMIN";

export type AccountStatus = "ACTIVE" | "BANNED" | "SUSPENDED" | "DELETED";

export interface AccountView {
  readonly accountId: number;
  readonly profileId: number;
  readonly username: string | null;
  readonly firstname: string | null;
  readonly lastname: string | null;
  readonly role: UserRole;
  readonly status: AccountStatus;
  readonly createdAt: Date;
  /** Only present for LIBRARY accounts */
  readonly subscriptionActive?: boolean;
}
