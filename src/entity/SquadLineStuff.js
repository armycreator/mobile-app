// @flow
import { Record } from 'immutable';
import { UnitStuff } from './';

type SquadLineStuffProps = {
  id: ?number,
  number: ?number,
  unitStuff: ?UnitStuff,
};

const defaultValue: SquadLineStuffProps = {
  id: null,
  number: null,
  unitStuff: null,
};

export default class SquadLineStuff extends Record(defaultValue) {
  constructor(input: any) {
    const data = Object.assign({}, input, {
      unitStuff: input._embedded.unit_stuff &&
        new UnitStuff(input._embedded.unit_stuff),
    });
    return super(data);
  }
}
