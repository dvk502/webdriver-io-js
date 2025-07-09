import { PreAuthRequest, PreAuthResponse, AuthResponse } from '@api/models/AuthModel';
import ApiController from '@api/ApiController';
import { AUTH_ENDPOINT } from '@utils/Endpoints';
import { DEVICE } from '@api/DeviceParams';

interface UserAuthData {
  token?: string;
  orgId?: number;
  authToken?: string;
}

export const tokenCache: Map<string, AuthResponse> = new Map();

class LoginController extends ApiController {
  async preAuthenticate(username: string): Promise<UserAuthData> {
    const requestBody: PreAuthRequest = {
      userName: username,
      password: process.env.PASSWORD!
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const response = await this.post(AUTH_ENDPOINT.preAuthenticate, requestBody, headers);
      const { token, organizationDTOS } = response.data as PreAuthResponse;
      console.log(`[OK] Pre-authentication for user ${username}`);
      return {
        token,
        orgId: organizationDTOS[0].orgId
      };
    } catch (error) {
      throw new Error(
        `[FAIL] Pre-authentication for user ${username} on ${process.env
          .ENVIRONMENT!}, error: ${error}`
      );
    }
  }

  /**
   * Авторизация (кэширует токен по username)
   * @param agentId - agent's email
   * @returns AuthResponse с токеном
   */
  async login(agentId: any): Promise<AuthResponse> {
    if (tokenCache.has(agentId)) {
      return tokenCache.get(agentId)!;
    }
    const preAuthData = await this.preAuthenticate(String(agentId));

    const requestBody = {
      appVersion: DEVICE.appVersion,
      platform: DEVICE.platform,
      platformVersion: DEVICE.platformVersion,
      uuid: DEVICE.uuid,
      orgId: preAuthData.orgId
    };

    const headers = {
      Authorization: `Bearer ${preAuthData.token}`
    };

    try {
      const response = await this.post(AUTH_ENDPOINT.authenticate, requestBody, headers);
      const authData = response.data as AuthResponse;
      tokenCache.set(agentId, authData);
      console.log(`[OK] Logged in user ${agentId}`);
      return authData;
    } catch (error) {
      throw new Error(`[FAIL] Login for user ${agentId}, error: ${error}`);
    }
  }
}

export default LoginController;
