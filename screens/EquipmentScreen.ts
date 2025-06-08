import Elem from '@utils/Elem';

class EquipmentScreen {
  //Locators
  private get burgerButton() {
    return new Elem('id=com.trackensure.orchard:id/kebabMenu');
  }

  private get sidemenuEquipment() {
    return new Elem('id=com.trackensure.orchard:id/menuEquipment');
  }

  private get equipmentCards() {
    return $$('id=com.trackensure.orchard:id/equipmentItem');
  }

  public async getEquipmentCardByIndex(index: number) {
    const cards = await $$('id=com.trackensure.orchard:id/equipmentItem');
    const card = cards[index];
    return {
      name: await card.$('id=com.trackensure.orchard:id/equipmentName'),
      inventory: await card.$('id=com.trackensure.orchard:id/Inventory№'),
      serial: await card.$('id=com.trackensure.orchard:id/Serial№'),
      holder: await card.$('id=com.trackensure.orchard:id/Holder'),
      status: await card.$('id=com.trackensure.orchard:id/status')
    };
  }

  //Steps

  public async clickEquipmentCardByIndex(index: number) {
    const cards = await $$('id=com.trackensure.orchard:id/equipmentItem');
    await cards[index].click();
  }

  public async movingToEquipment(): Promise<void> {
    await this.burgerButton.click();
    await this.sidemenuEquipment.click();
  }
}

export default new EquipmentScreen();
