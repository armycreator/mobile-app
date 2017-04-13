// @flow
import sdk from '../Sdk';
import { SquadLine } from '../entity';

export function fetchSquadDetail(id: number) {
  return (dispatch: Function) => {
    return sdk.squad
      .find(id)
      .then(squadDetail => {
        dispatch({
          type: 'SQUAD_DETAIL_RECEIVE',
          squadDetail,
        });
      })
      .catch(console.error);
  };
}

export function changeSquadLineActiveStatus(
  squadLine: SquadLine,
  active: boolean
) {
  return (dispatch: Function) => {
    const newSquadLine = squadLine.set('inactive', !active);

    dispatch({
      type: 'SQUAD_LINE_DETAIL_RECEIVE',
      squadLine: newSquadLine,
    });

    return (
      sdk.squadLine.update(newSquadLine)//    dispatch({ // .then(squadLine => {
      //      type: 'SQUAD_LINE_DETAIL_RECEIVE',
      //      squadLine,
      //    });
      //  })
      .catch(console.error)
    );
  };
}
