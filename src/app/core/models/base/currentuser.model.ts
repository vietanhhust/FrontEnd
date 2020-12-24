import { UserModel } from "./UserModel";

export class CurrentUser implements UserModel {

  token: string;
  refreshtoken: string;
  username: string;
  subsidiary_id: string;
  constructor(params: { [key in keyof CurrentUser]: CurrentUser[key] }) {
    Object.assign(this, params);
  }
}
