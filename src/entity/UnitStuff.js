// @flow
import { Record } from 'immutable';
import { Stuff } from './';

type UnitStuffProps = {
  points: ?number,
  stuff: ?Stuff,
};

const defaultValue: UnitStuffProps = {
  points: null,
  stuff: null,
};

export default class UnitStuff extends Record(defaultValue) {
  constructor(input: any) {
    const data = Object.assign({}, input, {
      stuff: input._embedded.stuff && new Stuff(input._embedded.stuff),
    });
    return super(data);
  }
}
