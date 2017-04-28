// @flow

import { AbstractClient } from 'rest-client-sdk';
import { Squad } from '../';

class SquadClient extends AbstractClient {
  getPathBase(): string {
    return '/v1/squads';
  }

  getName(): string {
    return 'Squad';
  }

  getEntityURI(entity: Squad) {
    return `${this.getPathBase()}/${entity.id}`;
  }
}

export default SquadClient;
