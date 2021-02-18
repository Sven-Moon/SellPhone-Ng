// barrel
import { saleCalculatorReducer } from './stores/sale-calculator/sale-calculator.reducer';
import { searchReducer } from './stores/search/search.reducer';
import { staticDataReducer } from './stores/staticData/staticData.reducer';


export const AppStores = {
  siteSearchResults: searchReducer,
  staticData: staticDataReducer,
  saleOrder: saleCalculatorReducer
};
