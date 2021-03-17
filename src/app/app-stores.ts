// barrel
import { saleCalculatorReducer } from './stores/sale-calculator/sale-calculator.reducer'
import { searchReducer } from './stores/search/search.reducer'
import { staticDataReducer } from './stores/staticData/staticData.reducer';
import { StoreModule } from '@ngrx/store';
import * as fromContactInfo from './stores/contact-info/contact-info.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ContactInfoEffects } from './stores/contact-info/contact-info.effects'

export const AppStores = {
  siteSearchResults: searchReducer,
  staticData: staticDataReducer,
  saleOrder: saleCalculatorReducer,
  contactInfo: fromContactInfo.reducer
}
