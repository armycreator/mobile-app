// @flow
import { fromJS, Map, Record } from 'immutable';

type SquadProps = {
  id: ?number,
  name: ?string,
  points: number,
  activePoints: number,
  hasInactiveSquad: boolean,
};

const defaultValue: SquadProps = {
  id: null,
  name: null,
  points: 0,
  activePoints: 0,
  hasInactiveSquad: false,
};

export default class Squad extends Record(defaultValue) {
  constructor(input: any) {
    const data = Object.assign({}, input, {
      points: input._embedded.points,
      activePoints: input._embedded.active_points,
      hasInactiveSquad: input._embedded.has_inactive_squad,
    });
    return super(data);
  }
}
