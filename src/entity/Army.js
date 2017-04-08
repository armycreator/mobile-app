// @flow
import { List, Record } from 'immutable';
import { Breed, SquadListByType } from './';

type ArmyProps = {
  id: ?number,
  name: ?string,
  description: ?string,
  points: ?number,
  active_points: ?number,
  wanted_points: ?number,
  breed: ?Breed,
  squadListByType: ?List<SquadListByType>,
};

const defaultValue: ArmyProps = {
  id: null,
  name: null,
  description: null,
  points: null,
  active_points: null,
  wanted_points: null,
  breed: null,
  squadListByType: null,
};

export default class Army extends Record(defaultValue) {
  constructor(input: any) {
    const extraData = {
      breed: new Breed(input._embedded.breed),
      squadListByType: List(input._embedded.squad_list_by_type).map(
        squadListByType => new SquadListByType(squadListByType)
      ),
    };

    super(Object.assign({}, input, extraData));
  }
}
