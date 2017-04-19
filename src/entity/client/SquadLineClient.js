// @flow

import { AbstractClient } from 'rest-client-sdk';
import { SquadLine } from '../';

class SquadLineClient extends AbstractClient {
  getPathBase(): string {
    return '/v1/squadlines';
  }

  getName(): string {
    return 'SquadLine';
  }

  getEntityURI(entity: SquadLine) {
    return `${this.getPathBase()}/${entity.id}`;
  }
}

export default SquadLineClient;
