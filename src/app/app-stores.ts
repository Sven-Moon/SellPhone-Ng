// barrel
// import { searchResults } from './stores/searchResults.store';
import { estimatorModels } from './stores/estimatorModels.store';
import { estimatorTypes } from './stores/estimatorTypes.store';
import { staticData } from './stores/staticData.store';
import { searchReducer } from './stores/search/search.reducer'
import { staticDataReducer } from './stores/staticData/staticData.reducer';


export const AppStores = {
  // searchResults,
  estimatorTypes,
  estimatorModels,
  staticData,
  siteSearchResults: searchReducer,
  staticDataV2: staticDataReducer
}
