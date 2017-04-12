// @flow
import { Record } from 'immutable';

type SquadLineStuffProps = {
  id: ?number,
  number: ?number,
};

const defaultValue: SquadLineStuffProps = {
  id: null,
  number: null,
};

export default class SquadLineStuff extends Record(defaultValue) {}
