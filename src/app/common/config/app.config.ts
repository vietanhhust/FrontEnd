import {InjectionToken} from '@angular/core';

import { environment } from 'src/environments/environment';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig = {
  client: {
    client_id: environment.client_id,
    client_secret: environment.client_secret,
  },
  generate: {
    pagesize: 20,
    formatFloat: '1.0-10',
  },
  routes: {
    login: 'login',
    error404: '404',
    error403: '403'
  },
};
