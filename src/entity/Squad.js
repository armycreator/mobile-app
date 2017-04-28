// @flow
import { List, Record } from 'immutable';
import { SquadLine, UnitGroup } from './';

type SquadProps = {
  id: ?number,
  name: ?string,
  points: number,
  activePoints: number,
  hasInactiveSquad: boolean,
  unitGroup: ?UnitGroup,
  squadLineList: ?List<SquadLine>,
};

const defaultValue: SquadProps = {
  id: null,
  name: null,
  points: 0,
  activePoints: 0,
  hasInactiveSquad: false,
  squadLineList: null,
  unitGroup: null,
};

export default class Squad extends Record(defaultValue) {
  constructor(input: any) {
    const data = Object.assign({}, input, {
      points: input._embedded.points,
      activePoints: input._embedded.active_points,
      hasInactiveSquad: input._embedded.has_inactive_squad,
      unitGroup: input._embedded.unit_group &&
        new UnitGroup(input._embedded.unit_group),
      squadLineList: input._embedded.squad_line_list &&
        List(input._embedded.squad_line_list).map(
          squadLine => new SquadLine(squadLine)
        ),
    });
    return super(data);
  }
}
