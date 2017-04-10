import { fromJS, List } from 'immutable';
import { Army, Collection, User, Squad } from './';

export default function entityFactory(input, listOrItem, clientName = null) {
  if (listOrItem === 'list') {
    // do stuff with your list input
    let data = input;

    if (data.items && data.items.length > 0) {
      data.items = List(data.items).map(item => convertItem(item, clientName));
    }

    return new Collection(data);
  } else {
    return convertItem(input, clientName);
  }
}

function convertItem(input, clientName) {
  switch (clientName) {
    case 'User':
      return new User(input);
    case 'Army':
      return new Army(input);
    case 'Squad':
      return new Squad(input);
    default:
      return fromJS(input);
  }
}
