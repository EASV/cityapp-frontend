import {City} from '../../cities/shared/city.model';

export interface Address {
  id: number;
  streetName: string;
  streetNr: string;
  additional: string;
  cityId: number;
  city: City;
}
