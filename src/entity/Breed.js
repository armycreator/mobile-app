// @flow
import { fromJS, Map, Record } from 'immutable';

type BreedProps = {
  id: ?number,
  name: ?string,
}

const defaultValue: BreedProps = {
  id: null,
  name: null,
};

export default class Breed extends Record(defaultValue) {
}
