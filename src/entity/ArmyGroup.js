// @flow
import { Record } from 'immutable';

type ArmyGroupProps = {
  id: ?number,
  name: ?string,
};

const defaultValue: ArmyGroupProps = {
  id: null,
  name: null,
};

export default class ArmyGroup extends Record(defaultValue) {}
