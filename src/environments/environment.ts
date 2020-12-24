export const environment = {
  production: true,
  devmode: true,
  apiEndpoint: 'http://103.21.149.106:8001/api/',
  tokenEndpoint: 'http://103.21.149.106:8001/connect/',
  client_id: 'web',
  client_secret: 'secretWeb',
  HASH_SALT: 'AOMH9FIYVVFSAL71QjjfNlu7SElVu4fY',
};

import * as env from '../environments/environment.endpoint';
import * as env2 from '../environments/environment.staging';
import * as env3 from '../environments/environment.local';
import * as env4 from '../environments/environment.prod';
