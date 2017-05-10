// @flow
import { List, Record } from 'immutable';
import { Army } from './';

type ArmyGroupProps = {
  id: ?number,
  name: ?string,
  armyList: ?List<Army>,
};

const defaultValue: ArmyGroupProps = {
  id: null,
  name: null,
  armyList: null,
};

export default class ArmyGroup extends Record(defaultValue) {
  constructor(input: any) {
    const extraData = {
      armyList: List(input._embedded.armies).map(army => new Army(army)),
    };

    super(Object.assign({}, input, extraData));
  }
}
