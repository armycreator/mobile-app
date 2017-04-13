import { fromJS, List, Record } from 'immutable';
import * as entities from './';

export default function entityFactory(input, listOrItem, clientName = null) {
  if (listOrItem === 'list') {
    // do stuff with your list input
    let data = input;

    if (data.items && data.items.length > 0) {
      data.items = List(data.items).map(item => convertItem(item, clientName));
    }

    return new entities.Collection(data);
  } else {
    return convertItem(input, clientName);
  }
}

function convertItem(input, clientName) {
  if (typeof entities[clientName] === 'function') {
    return new entities[clientName](input);
  }

  return fromJS(input);
}
