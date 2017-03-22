import { AbstractClient } from 'rest-client-sdk';

class UserClient extends AbstractClient {
  getPathBase() {
    return '/v1/users';
  }

  findMe() {
    const url = `${this.sdk.config.segment}/me`;

    return this.createEntityFromJsonResponse(this.authorizedFetch(url), 'item');
  }


  getName() {
    return 'User';
  }
}

export default UserClient;
