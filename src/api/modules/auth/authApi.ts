import { type ApiInstance, apiInstance } from "../../../lib/axios";
import type { ApiSuccessResponse } from "../../types/response.types";
import type { LogoutRequestDto } from "./dtos/logoutDtos";
import type { RefreshRequestDto } from "./dtos/refreshDtos";
import type { AuthTokenView, LoginRequestDto } from "./dtos/shared.types";

import type { SignupLibraryRequestDto } from "./dtos/signupLibraryDtos";
import type { SignUpUserRequestDto } from "./dtos/signupUserDtos";

export class AuthApi {
  apiInstance: ApiInstance;
  constructor(apiInstance: ApiInstance) {
    this.apiInstance = apiInstance;
  }

  async signupUser({
    firstname,
    lastname,
    username,
    password,
  }: SignUpUserRequestDto) {
    const response = await this.apiInstance.post<
      ApiSuccessResponse<AuthTokenView>
    >("/auth/signup/user", {
      firstname,
      lastname,
      username,
      password,
    });
    return response.data;
  }

  async loginUser({ username, password }: LoginRequestDto) {
    const response = await this.apiInstance.post<
      ApiSuccessResponse<AuthTokenView>
    >("/auth/signup/user", {
      username,
      password,
    });
    return response.data;
  }

  async signupLibrary(data: SignupLibraryRequestDto) {
    const response = await this.apiInstance.post<
      ApiSuccessResponse<AuthTokenView>
    >("/auth/signup/library", data);
    return response;
  }

  async loginLibrary({ password, username }: LoginRequestDto) {
    const response = await this.apiInstance.post<
      ApiSuccessResponse<AuthTokenView>
    >("/auth/login/library", {
      username,
      password,
    });

    return response.data;
  }
  async loginAdmin({password,username}) {

  }
  
  refreshToken({refreshToken}: RefreshRequestDto) {
  
  }
  
  logout({refreshToken,allSessions}:LogoutRequestDto) {
    
  }
}

export const authApi = new AuthApi(apiInstance);
