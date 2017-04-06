// @flow
import { fromJS, Map, Record } from 'immutable';

type UnitTypeProps = {
  id: ?number,
}

const defaultValue: UnitTypeProps = {
  id: null,
};

export default class UnitType extends Record(defaultValue) {
}
