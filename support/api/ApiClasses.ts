import LoginController from '@api/controllers/LoginController';
import ProfileController from '@api/controllers/ProfileController';

export class ApiClasses {
  private _login?: LoginController;
  private _profile?: ProfileController;

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
}

const api = new ApiClasses();
export default api;
