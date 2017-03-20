import { AbstractClient } from 'rest-client-sdk';

class UserClient extends AbstractClient {
  getPathBase() {
    return '/v1/users';
  }

  getName() {
    return 'User';
  }
}

export default UserClient;
