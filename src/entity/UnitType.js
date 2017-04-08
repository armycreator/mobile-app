// @flow
import { Record } from 'immutable';

type UnitTypeProps = {
  id: ?number,
  name: ?string,
};

const defaultValue: UnitTypeProps = {
  id: null,
  name: null,
};

export default class UnitType extends Record(defaultValue) {}
