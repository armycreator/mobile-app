import { Serializer } from 'rest-client-sdk';
import { fromJS, List, Record } from 'immutable';
import * as entities from './';

function convertItem(input, clientName) {
  if (typeof entities[clientName] === 'function') {
    return new entities[clientName](input);
  }

  return fromJS(input);
}

export default class EntitySerializer extends Serializer {
  deserializeItem(rawData: string, type: string) {
    // do stuff with your item input
    return convertItem(JSON.parse(rawData), type);
  }

  deserializeList(rawListData: string, type: string) {
    const data = JSON.parse(rawListData);

    if (data.items && data.items.length > 0) {
      data.items = List(data.items).map(item => convertItem(item, type));
    }

    return new entities.Collection(data);
  }

  serializeItem(entity: any, type: string) {
    return JSON.stringify(entity.toJSON());
  }
}
