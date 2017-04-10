// @flow
import sdk from '../Sdk';

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
