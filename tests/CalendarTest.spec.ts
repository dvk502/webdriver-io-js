import DayOffContoller from '@api/controllers/DayOffContoller';
import { tokenCache } from '@api/controllers/LoginController';
import AgentMapper from '@api/mappers/AgentMapper';
import { Status } from '@api/models/DayOffModel';
import { ApplicationScreens } from '@screens/ApplicationScreens';
import CommonMethods, { DayOfWeek } from '@utils/CommonMethods';
import { EventStatus, EventType } from '@utils/Enums';

describe('Calendar tests', () => {
  const screens = new ApplicationScreens();
  const agentId = 214;
  const teamLeadId = 163;

  beforeEach(async () => {
    if (browser.sessionId) {
      console.log('🔁 Завершаем предыдущую сессию...');
      await browser.reloadSession();
    }
    console.log('➡️ Before each test');
    tokenCache.clear();

    const response = await new DayOffContoller().getDayOff(agentId, 1735682400000, 1767132000000);

    const approvedDayOffList: number[] = response
      .filter((item) => item.status === Status.Approved)
      .map((item) => item.dayOffSchedulingId);

    for await (const element of approvedDayOffList) {
      await new DayOffContoller().rejectDayOff(teamLeadId, agentId, element);
    }

    const dayOffListForDelete: number[] = response.map((item) => item.dayOffSchedulingId);
    for await (const element of dayOffListForDelete) {
      await new DayOffContoller().cancelDayOff(agentId, element);
    }
  });

  it('01 Create Day Off', async () => {
    const dateFrom = CommonMethods.generateDate(-1, DayOfWeek.Tuesday);
    const dateTo = CommonMethods.generateDate(-1, DayOfWeek.Wednesday);

    console.log(`dateFrom initiate ${dateFrom}`);
    console.log(`dateTo initiate${dateTo}`);

    await screens.login.loginAgent(agentId);

    await screens.appBars.clickCalendarButton();
    await screens.appBars.clickAddButton();

    await screens.eventScreen.clickDropdownEventType();
    await screens.eventScreen.selectEvenType(EventType.DayOff);
    await screens.eventScreen.clickDateRange();

    await screens.calendarPicker.selectDate(dateFrom);
    await screens.calendarPicker.selectDate(dateTo);
    await screens.calendarPicker.clickOkButton();

    await screens.appBars.clickSaveButton();

    await screens.calendar.verifyVisibleDayOffEventOnWeekView(
      EventStatus.Requested,
      EventType.DayOff,
      dateFrom
    );
    await screens.calendar.verifyVisibleDayOffEventOnWeekView(
      EventStatus.Requested,
      EventType.DayOff,
      dateFrom
    );
  });

  it('02 Create Vacation', async () => {
    const dateFrom = CommonMethods.generateDate(0, DayOfWeek.Monday);
    const dateTo = CommonMethods.generateDate(0, DayOfWeek.Friday);

    console.log(`dateFrom initiate ${dateFrom}`);
    console.log(`dateTo initiate${dateTo}`);

    await screens.login.loginAgent(agentId);

    await screens.appBars.clickCalendarButton();
    await screens.appBars.clickAddButton();

    await screens.eventScreen.clickDropdownEventType();
    await screens.eventScreen.selectEvenType(EventType.Vacation);
    await screens.eventScreen.clickDateRange();

    await screens.calendarPicker.selectDate(dateFrom);
    await screens.calendarPicker.selectDate(dateTo);
    await screens.calendarPicker.clickOkButton();

    await screens.appBars.clickSaveButton();

    await screens.calendar.verifyVisibleDayOffEventOnWeekView(
      EventStatus.Requested,
      EventType.Vacation,
      dateFrom
    );
    await screens.calendar.verifyVisibleDayOffEventOnWeekView(
      EventStatus.Requested,
      EventType.Vacation,
      dateFrom
    );
  });

  it('03 Create Sick Leave', async () => {
    const dateFrom = CommonMethods.generateDate(1, DayOfWeek.Tuesday);
    const dateTo = CommonMethods.generateDate(1, DayOfWeek.Thursday);

    console.log(`dateFrom initiate ${dateFrom}`);
    console.log(`dateTo initiate${dateTo}`);

    await screens.login.loginAgent(agentId);

    await screens.appBars.clickCalendarButton();
    await screens.appBars.clickAddButton();

    await screens.eventScreen.clickDropdownEventType();
    await screens.eventScreen.selectEvenType(EventType.SickLeave);
    await screens.eventScreen.clickDateRange();

    await screens.calendarPicker.selectDate(dateFrom);
    await screens.calendarPicker.selectDate(dateTo);
    await screens.calendarPicker.clickOkButton();

    await screens.appBars.clickSaveButton();

    await screens.calendar.verifyVisibleDayOffEventOnWeekView(
      EventStatus.Requested,
      EventType.SickLeave,
      dateFrom
    );
    await screens.calendar.verifyVisibleDayOffEventOnWeekView(
      EventStatus.Requested,
      EventType.SickLeave,
      dateFrom
    );
  });
});
