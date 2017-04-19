// @flow

import { AbstractClient } from 'rest-client-sdk';
import { User } from '../';

class UserClient extends AbstractClient {
  getPathBase(): string {
    return '/v1/users';
  }

  findMe(): Promise<any> {
    const url = `${this.sdk.config.segment}/me`;

    const response = this.authorizedFetch(url);

    return this.deserializeResponse(response, 'item');
  }

  getName(): string {
    return 'User';
  }

  getEntityURI(entity: User) {
    return `${this.getPathBase()}/${entity.id}`;
  }
}

export default UserClient;
