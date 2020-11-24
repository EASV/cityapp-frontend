import {Tourist} from '../../tourist/shared/tourist.model';

export interface TouristVisit {
  cityId: number
  tourist: Tourist
  touristId: number
  visitDate: Date
}
