// @flow
import { List, Record } from 'immutable';
import { Squad, UnitType } from './';

type SquadListByTypeProps = {
  unitType: ?UnitType,
  squadList: List<Squad>,
};

const defaultValue: SquadListByTypeProps = {
  unitType: null,
  squadList: List(),
};

export default class SquadListByType extends Record(defaultValue) {
  constructor(input: any) {
    const data = Object.assign(input, {
      unitType: new UnitType(input.unitType),
      squadList: List(input.squadList).map(squad => new Squad(squad)),
    });
    return super(data);
  }
}
