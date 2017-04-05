// @flow

import { AbstractClient } from 'rest-client-sdk';

class UserClient extends AbstractClient {
  getPathBase(): string {
    return '/v1/users';
  }

  findMe(): Promise<any> {
    const url = `${this.sdk.config.segment}/me`;

    return this.createEntityFromJsonResponse(this.authorizedFetch(url), 'item');
  }


  getName(): string {
    return 'User';
  }
}

export default UserClient;
