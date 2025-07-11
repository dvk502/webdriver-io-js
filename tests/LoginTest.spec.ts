import { ApiClasses } from '@api/ApiClasses';
import AgentMapper from '@api/mappers/AgentMapper';
import { ApplicationScreens } from '@screens/ApplicationScreens';
import CommonMethods from '@utils/CommonMethods';
import { EventType } from '@utils/Enums';

describe('Login tests', () => {
  const api = new ApiClasses();
  const screens = new ApplicationScreens();

  it('Login Api test', async () => {
    // const response = await api.profile.getPublicInfoAgent(221);

    const agentData = await AgentMapper.personalToUIModel(221);

    console.log(agentData);
  });

  it('Positiv Login', async () => {
    await screens.login.loginAgent('214');
    await screens.appBars.verifyTitleText('My Profile');

    await screens.equipment.movingToEquipment();
    await screens.appBars.verifyTitleText('Equipment');

    const card = await screens.equipment.getEquipmentCardByIndex(1);

    const status = await card.status;

    console.log(await card.name.getText());
    console.log(await card.inventory.getText());
    console.log(await card.serial.getText());
    console.log(await card.holder.getText());
    console.log(await card.status.getText());

    await screens.equipment.clickEquipmentCardByIndex(0);

    await expect(status).toHaveText('Dims');

    await driver
      .action('pointer')
      .move({ duration: 0, x: 354, y: 807 })
      .down({ button: 0 })
      .move({ duration: 1000, x: 355, y: 591 })
      .up({ button: 0 })
      .perform();

    const elem = await $(
      '//android.widget.TextView[@resource-id="com.trackensure.orchard:id/Inventory№" and @text="10000724"]'
    );

    await elem.scrollIntoView();
    await elem.click();
    await driver.pause(5000);
  });

  it('scroll to Inventory№ ', async () => {
    await screens.login.loginAgent('214');

    await screens.equipment.movingToEquipment();

    await screens.equipment.scrollToEquipmet('10000903', 1);
  });

  it.only('Calendar new test', async () => {
    await screens.login.loginAgent('214');
    await screens.appBars.clickCalendarButton();
    await screens.appBars.clickAddButton();
    await screens.eventScreen.clickDropdownEventType();
    await screens.eventScreen.selectEvenType(EventType.SickLeave);
    await screens.eventScreen.clickDateRange();
    await screens.eventScreen.selectDate('Tuesday, 24 June');
    await screens.eventScreen.selectDate('Thursday, 26 June');
    await screens.eventScreen.clickConfirmButton();
    await screens.appBars.clickSaveButton();

    await driver.pause(3000);
  });
});
