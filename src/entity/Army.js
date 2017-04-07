// @flow
import { fromJS, Map, Record } from 'immutable';
import Breed from './Breed';

type ArmyProps = {
  id: ?number,
  name: ?string,
  description: ?string,
  points: ?number,
  active_points: ?number,
  wanted_points: ?number,
  breed: ?Breed,
  _embedded: ?Map<any, any>,
}

const defaultValue: ArmyProps = {
  id: null,
  name: null,
  description: null,
  points: null,
  active_points: null,
  wanted_points: null,
  _embedded: null,
  breed: null,
};

export default class Army extends Record(defaultValue) {
  constructor(input: any) {
    const data = input;

    data._embedded = fromJS(data._embedded);
    data.breed = new Breed(data._embedded.breed);
    super(data);
  }
}
