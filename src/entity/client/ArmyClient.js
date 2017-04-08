// @flow

import { Map } from 'immutable';
import { AbstractClient } from 'rest-client-sdk';
import { User } from '../';

class ArmyClient extends AbstractClient {
  getPathBase(): string {
    return '/v1/armies';
  }

  findByUser(user: User): Promise<any> {
    const url = `${this.sdk.config.segment}/users/${user.id}/armies`;

    return this.createEntityFromJsonResponse(this.authorizedFetch(url), 'list');
  }

  getName(): string {
    return 'Army';
  }
}

export default ArmyClient;
