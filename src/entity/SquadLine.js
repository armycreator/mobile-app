// @flow
import { List, Record } from 'immutable';
import { Unit, SquadLineStuff } from './';

type SquadLineProps = {
  id: ?number,
  number: ?number,
  points: ?number,
  unit: ?Unit,
  inactive: ?boolean,
  squadLineStuffList: ?List<SquadLineStuff>,
};

const defaultValue: SquadLineProps = {
  id: null,
  number: null,
  points: null,
  unit: null,
  inactive: null,
  squadLineStuffList: null,
};

export default class SquadLine extends Record(defaultValue) {
  constructor(input: any) {
    const data = Object.assign({}, input, {
      points: input._embedded.points,
      unit: input._embedded.unit && new Unit(input._embedded.unit),
      squadLineStuffList: input._embedded.squad_line_stuff_list &&
        List(input._embedded.squad_line_stuff_list).map(
          squadLineStuff => new SquadLineStuff(squadLineStuff)
        ),
    });

    return super(data);
  }
}
