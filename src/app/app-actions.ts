// barrel
import { EstimatorModelActions } from './actions/estimatorModels.actions';
import { EstimatorTypeActions } from './actions/estimatorTypes.actions';
import { SearchActions } from './actions/search.actions';
import { StaticDataActions } from './actions/staticData.actions';

export const AppActions = [
  SearchActions,
  EstimatorTypeActions,
  EstimatorModelActions,
  StaticDataActions
];
