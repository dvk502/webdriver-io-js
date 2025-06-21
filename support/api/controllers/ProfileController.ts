import api from '@api/ApiClasses';
import ApiController from '@api/ApiController';
import { AgentPublicDTO } from '@api/models/AgentModel';
import { AGENT_PROFILE, AUTH_ENDPOINT } from '@utils/Endpoints';

class ProfileController extends ApiController {
  async getPublicInfoAgent(agentId: number): Promise<AgentPublicDTO> {
    const userAuthData = await api.login.login(agentId);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userAuthData.token}`
    };

    try {
      const response = await this.get(AGENT_PROFILE.publicInfo(agentId), headers);
      console.log(`[OK] Get agent's profile ${agentId}`);

      return response.data as AgentPublicDTO;
    } catch (error) {
      throw new Error(
        `[FAIL] Get agent's profile for user ${agentId} on ${process.env
          .ENVIRONMENT!}, error: ${error}`
      );
    }
  }
}

export default ProfileController;
