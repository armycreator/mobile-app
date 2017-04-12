// @flow
import { Record } from 'immutable';

type StuffProps = {
  id: ?number,
  name: ?string,
};

const defaultValue: StuffProps = {
  id: null,
  name: null,
};

export default class Stuff extends Record(defaultValue) {}
