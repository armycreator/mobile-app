// @flow

import { AbstractClient } from 'rest-client-sdk';
import { ArmyGroup, User } from '../';

class ArmyGroupClient extends AbstractClient {
  getPathBase(): string {
    return '/v1/armies';
  }

  findByUser(user: User): Promise<any> {
    const url = `${this.sdk.config.segment}/users/${user.id}/armygroups`;

    return this.deserializeResponse(this.authorizedFetch(url), 'list');
  }

  getName(): string {
    return 'ArmyGroup';
  }

  getEntityURI(entity: ArmyGroup) {
    return `${this.getPathBase()}/${entity.id}`;
  }
}

export default ArmyGroupClient;
