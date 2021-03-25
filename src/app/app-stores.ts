// barrel
import { searchReducer } from './stores/search/search.reducer'
import { staticDataReducer } from './stores/staticData/staticData.reducer';
import * as fromContactInfo from './stores/contact-info/contact-info.reducer';
import * as fromSaleCalc from './stores/sale-calculator/sale-calculator.reducer';

export const AppStores = {
  siteSearchResults: searchReducer,
  staticData: staticDataReducer,
  saleOrder: fromSaleCalc.saleOrderReducer,
  contactInfo: fromContactInfo.reducer
}
