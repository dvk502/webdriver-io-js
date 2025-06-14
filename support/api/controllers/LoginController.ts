import { PreAuthRequest, PreAuthResponse, AuthResponse } from '@api/models/AuthModel';
import ApiController from '@api/ApiController';
import { AUTH_ENDPOINT } from '@utils/Endpoints';
import { DEVICE } from '@api/DeviceParams';

interface UserAuthData {
  token?: string;
  orgId?: number;
  authToken?: string;
}

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
   *
   * @param username - agent's email
   * @returns AuthResponse
   */
  async login(username: any): Promise<AuthResponse> {
    const preAuthData = await this.preAuthenticate(username);

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
      console.log(`[OK] Logged in user ${username}`);
      return response.data as AuthResponse;
    } catch (error) {
      throw new Error(`[FAIL] Login for user ${username}, error: ${error}`);
    }
  }
}

export default LoginController;
