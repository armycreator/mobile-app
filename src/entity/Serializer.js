// @flow
import { Serializer } from 'rest-client-sdk';
import { fromJS, List } from 'immutable';
import * as entities from './';

function convertItem(input, clientName) {
  if (typeof entities[clientName] === 'function') {
    return new entities[clientName](input);
  }

  console.warn(
    `${clientName} entity not found, did you add in in src/entity/index.js ?`
  );
  return fromJS(input);
}

export default class EntitySerializer extends Serializer {
  deserializeItem(rawData: string, type: string) {
    // do stuff with your item input
    return convertItem(JSON.parse(rawData), type);
  }

  deserializeList(rawListData: string, type: string) {
    const data = JSON.parse(rawListData);

    switch (type) {
      case 'ArmyGroup':
        if (data.data && data.data.length > 0) {
          return new entities.Collection({
            items: List(data.data).map(item => convertItem(item, type)),
          });
        }
        break;
      default:
        if (data.items && data.items.length > 0) {
          data.items = List(data.items).map(item => convertItem(item, type));
        }
        break;
    }

    return new entities.Collection(data);
  }

  serializeItem(entity: any, type: string) {
    return JSON.stringify(entity.toJSON());
  }
}
