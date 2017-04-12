// @flow

import { AbstractClient } from 'rest-client-sdk';

class SquadLineClient extends AbstractClient {
  getPathBase(): string {
    return '/v1/squadlines';
  }

  getName(): string {
    return 'SquadLine';
  }
}

export default SquadLineClient;
