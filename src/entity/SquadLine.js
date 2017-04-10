// @flow
import { Record } from 'immutable';

type SquadLineProps = {
  id: ?number,
  number: ?number,
  points: ?number,
};

const defaultValue: SquadLineProps = {
  id: null,
  number: null,
  points: null,
};

export default class SquadLine extends Record(defaultValue) {
  constructor(input: any) {
    const data = Object.assign({}, input, {
      points: input._embedded.points,
    });

    return super(data);
  }
}
