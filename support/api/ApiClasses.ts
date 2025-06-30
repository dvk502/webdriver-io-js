import LoginController from '@api/controllers/LoginController';
import ProfileController from '@api/controllers/ProfileController';
import DayOffContoller from './controllers/DayOffContoller';

export class ApiClasses {
  private _login?: LoginController;
  private _profile?: ProfileController;
  private _dayOff?: DayOffContoller;

  public get login(): LoginController {
    if (!this._login) {
      this._login = new LoginController();
    }
    return this._login;
  }

  public get profile(): ProfileController {
    if (!this._profile) {
      this._profile = new ProfileController();
    }
    return this._profile;
  }

  public get dayOff(): DayOffContoller {
    if (!this._dayOff) {
      this._dayOff = new DayOffContoller();
    }
    return this._dayOff;
  }
}

const api = new ApiClasses();
export default api;
