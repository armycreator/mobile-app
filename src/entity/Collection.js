// @flow
import { List, Record } from 'immutable';

type CollectionProps = {
  current_page_number: number,
  num_items_per_page: number,
  total_count: number,
  items: List<any>,
};

const defaultValue: CollectionProps = {
  current_page_number: 1,
  num_items_per_page: 0,
  total_count: 0,
  items: List(),
};

export default class Collection extends Record(defaultValue) {}
