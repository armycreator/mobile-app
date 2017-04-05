// @flow
import { fromJS, Map, Record } from 'immutable';

type ArmyProps = {
  id: ?number,
  name: ?string,
  description: ?string,
  points: ?number,
  active_points: ?number,
  wanted_points: ?number,
  _embedded: ?Map<any, any>,
}

const defaultValue: ArmyProps = {
  id: null,
  name: null,
  description: null,
  points: null,
  active_points: null,
  wanted_points: null,
  _embedded: null,
};

export default class User extends Record(defaultValue) {
  constructor(input) {
    const data = input;

    data._embedded = fromJS(data._embedded);
    super(data);
  }
}
