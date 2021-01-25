// barrel
import { searchReducer } from './stores/search/search.reducer'
import { staticDataReducer } from './stores/staticData/staticData.reducer';
import { estimatorReducer } from './stores/estimator/estimator.reducer';


export const AppStores = {
  siteSearchResults: searchReducer,
  staticData: staticDataReducer,
  phoneModelsByType: estimatorReducer
}
