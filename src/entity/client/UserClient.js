// @flow

import { AbstractClient } from 'rest-client-sdk';

class UserClient extends AbstractClient {
  getPathBase(): string {
    return '/v1/users';
  }

  findMe(): Promise<any> {
    const url = `${this.sdk.config.segment}/me`;

    const response = this.authorizedFetch(url);

    return this.createEntityFromJsonResponse(response, 'item');
  }

  getName(): string {
    return 'User';
  }
}

export default UserClient;
