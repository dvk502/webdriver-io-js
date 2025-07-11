import LoginScreen from '@screens/LoginScreen';
import Components from '@screens/Components';
import EquipmentScreen from './EquipmentScreen';
import ProfileScreen from './ProfileScreen';
import CalendarScreen from './Calendar/CalendarScreen';
import EventScreen from './Calendar/EventScreen';
import CalendarPicker from './Calendar/CalendarPicker';

export class ApplicationScreens {
  public login = LoginScreen;
  public appBars = Components;
  public equipment = EquipmentScreen;
  public profile = ProfileScreen;
  public calendar = CalendarScreen;
  public calendarPicker = CalendarPicker;
  public eventScreen = EventScreen;
}
