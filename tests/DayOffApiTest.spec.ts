import { ApiClasses } from '@api/ApiClasses';
import DayOffContoller from '@api/controllers/DayOffContoller';
import { Status } from '@api/models/DayOffModel';

describe('Day Off tests', () => {
  it('Get all Day Off Events', async () => {
    const response = await new DayOffContoller().getDayOff(282, 1735682400000, 1767132000000);

    const dayOffList: number[] = response
      .filter((item) => item.status === Status.Approved)
      .map((item) => item.dayOffSchedulingId);

    console.log('DayOff IDs:', dayOffList);
  });

  it('Reject Day Off Events', async () => {
    const response = await new DayOffContoller().getDayOff(282, 1735682400000, 1767132000000);

    const dayOffList: number[] = response
      .filter((item) => item.status === Status.Approved)
      .map((item) => item.dayOffSchedulingId);

    console.log('DayOff IDs:', dayOffList);

    for await (const element of dayOffList) {
      await new DayOffContoller().rejectDayOff(314, 282, element);
    }
  });

  it.only('Cancel Day Off Events', async () => {
    const response = await new DayOffContoller().getDayOff(281, 1735682400000, 1767132000000);

    const dayOffList: number[] = response
      .filter((item) => item.status === Status.Approved)
      .map((item) => item.dayOffSchedulingId);

    for await (const element of dayOffList) {
      await new DayOffContoller().rejectDayOff(314, 282, element);
    }

    const dayOffListForDelete: number[] = response.map((item) => item.dayOffSchedulingId);

    console.log('DayOff IDs:', dayOffListForDelete);

    for await (const element of dayOffListForDelete) {
      await new DayOffContoller().cancelDayOff(281, element);
    }
  });
});
