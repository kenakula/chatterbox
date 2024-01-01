import { Location, NavigateFunction } from 'react-router-dom';

export interface IHistoryHelper {
  navigate: NavigateFunction | null;
  location: Location | null;
}
