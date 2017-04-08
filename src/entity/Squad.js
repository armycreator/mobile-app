// @flow
import { fromJS, Map, Record } from 'immutable';

type SquadProps = {
  id: ?number,
  name: ?string,
};

const defaultValue: SquadProps = {
  id: null,
  name: null,
};

export default class Squad extends Record(defaultValue) {}
