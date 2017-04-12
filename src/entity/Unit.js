// @flow
import { Record } from 'immutable';

type UnitProps = {
  id: ?number,
  name: ?string,
};

const defaultValue: UnitProps = {
  id: null,
  name: null,
};

export default class Unit extends Record(defaultValue) {}
