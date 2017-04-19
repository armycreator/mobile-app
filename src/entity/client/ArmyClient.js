// @flow

import { Map } from 'immutable';
import { AbstractClient } from 'rest-client-sdk';
import { Army, User } from '../';

class ArmyClient extends AbstractClient {
  getPathBase(): string {
    return '/v1/armies';
  }

  findByUser(user: User): Promise<any> {
    const url = `${this.sdk.config.segment}/users/${user.id}/armies`;

    return this.deserializeResponse(this.authorizedFetch(url), 'list');
  }

  getName(): string {
    return 'Army';
  }

  getEntityURI(entity: Army) {
    return `${this.getPathBase()}/${entity.id}`;
  }
}

export default ArmyClient;
