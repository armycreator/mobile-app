// @flow
import { List, Record } from 'immutable';
import { Squad, UnitType } from './';

type SquadListByTypeProps = {
  unitType: ?UnitType,
  squadList: List<Squad>,
  points: number,
  activePoints: number,
  hasInactiveSquad: boolean,
};

const defaultValue: SquadListByTypeProps = {
  unitType: null,
  squadList: List(),
  points: 0,
  activePoints: 0,
  hasInactiveSquad: false,
};

export default class SquadListByType extends Record(defaultValue) {
  constructor(input: any) {
    const data = Object.assign({}, input, {
      unitType: new UnitType(input.unitType),
      squadList: List(input.squadList).map(squad => new Squad(squad)),
    });
    return super(data);
  }
}
