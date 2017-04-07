// @flow
import { Record } from 'immutable';

type UserProps = {
  id: ?number,
  username: ?string,
};

const defaultValue: UserProps = {
  id: null,
  username: null,
};

export default class User extends Record(defaultValue) {}
