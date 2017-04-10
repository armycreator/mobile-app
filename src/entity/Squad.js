// @flow
import { fromJS, List, Map, Record } from 'immutable';
import { SquadLine } from './';

type SquadProps = {
  id: ?number,
  name: ?string,
  points: number,
  activePoints: number,
  hasInactiveSquad: boolean,
  squadLineList: ?List<SquadLine>,
};

const defaultValue: SquadProps = {
  id: null,
  name: null,
  points: 0,
  activePoints: 0,
  hasInactiveSquad: false,
  squadLineList: null,
};

export default class Squad extends Record(defaultValue) {
  constructor(input: any) {
    const data = Object.assign({}, input, {
      points: input._embedded.points,
      activePoints: input._embedded.active_points,
      hasInactiveSquad: input._embedded.has_inactive_squad,
      squadLineList: input._embedded.squad_line_list &&
        List(input._embedded.squad_line_list).map(
          squadLine => new SquadLine(squadLine)
        ),
    });
    return super(data);
  }
}
