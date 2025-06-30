import api from '@api/ApiClasses';
import ApiController from '@api/ApiController';
import { DayOffSchedulingItem } from '@api/models/DayOffModel';
import { DAY_OFF } from '@utils/Endpoints';

class DayOffContoller extends ApiController {
  async getDayOff(
    agentId: number,
    dateFrom: number,
    dateTo: number
  ): Promise<DayOffSchedulingItem[]> {
    const userAuthData = await api.login.login(agentId);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userAuthData.token}`
    };

    const body = {
      agentId: agentId,
      dateFrom: dateFrom,
      dateTo: dateTo
    };

    try {
      const response = await this.post(DAY_OFF.listByFilter, body, headers);
      console.log(`[OK] Get/calendar/day-off/list-by-filter for agent_id:${agentId}`);

      return response.data as DayOffSchedulingItem[];
    } catch (error) {
      throw new Error(
        `[FAIL] Get agent's profile for user ${agentId} on ${process.env
          .ENVIRONMENT!}, error: ${error}`
      );
    }
  }

  /**
   *
   * @param manager_id
   * @param agentId
   * @param dayOffSchedulingId
   * @returns
   */
  async rejectDayOff(
    manager_id: number,
    agentId: number,
    dayOffSchedulingId: number
  ): Promise<any> {
    const userAuthData = await api.login.login(manager_id);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userAuthData.token}`
    };

    const body = {
      agentId,
      dayOffSchedulingId,
      comment: ''
    };

    try {
      const response = await this.put(DAY_OFF.rejectDayOff, body, headers);
      return response.data; // возвращаем тело успешного ответа (может быть пустым)
    } catch (error: any) {
      // Если есть тело ошибки — возвращаем его
      return error.response?.data ?? error.message ?? 'Unknown error';
    }
  }

  /**
   *
   * @param agentId
   * @param dayOffSchedulingId
   * @returns
   */
  async cancelDayOff(agentId: number, dayOffSchedulingId: number): Promise<any> {
    const userAuthData = await api.login.login(agentId);
    const token = userAuthData.token;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const body = {
      agentId,
      dayOffSchedulingId
    };

    try {
      const response = await this.put(DAY_OFF.cancelDayOff, body, headers);
      console.log(
        `[OK] put /agent-day-off-scheduling/cancel for agent_id:${agentId} Request_id: ${dayOffSchedulingId}`
      );
      return response.data; // возвращаем тело успешного ответа (может быть пустым)
    } catch (error: any) {
      // Если есть тело ошибки — возвращаем его
      return error.response?.data ?? error.message ?? 'Unknown error';
    }
  }
}

export default DayOffContoller;
