// @flow
import { Record } from 'immutable';

type UnitGroupProps = {
  id: ?number,
  name: ?string,
};

const defaultValue: UnitGroupProps = {
  id: null,
  name: null,
};

export default class UnitGroup extends Record(defaultValue) {}
