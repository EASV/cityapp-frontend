import {TouristVisit} from './tourist-visit.model';

export interface City {
  zipCode: number;
  name: string;
  countryId?: number;
  tourists: TouristVisit[];
}
