// @flow

import { AbstractClient } from 'rest-client-sdk';

class SquadClient extends AbstractClient {
  getPathBase(): string {
    return '/v1/squads';
  }

  getName(): string {
    return 'Squad';
  }
}

export default SquadClient;
