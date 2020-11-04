import {Filter} from './filter.model';

export interface FilteredList<T>
{
  filter: Filter;
  totalCount: number;
  list: T[];
}
