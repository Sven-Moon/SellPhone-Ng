import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactInfoReviewComponent } from './components/contact-info-review/contact-info-review.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { OrderEditModalComponent } from './components/order-edit-modal/order-edit-modal.component';
import { OrderPrintComponent } from './components/order-print/order-print.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PhoneEstimatorComponent } from './components/phone-estimator/phone-estimator.component';
import { SaleCalculatorComponent } from './components/sale-calculator/sale-calculator.component';
import { SearchResultsComponent } from './components/search-results/app-search-results.component';


const routes: Routes = [
  { path: '', component: PhoneEstimatorComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'sellmyphone', component: SaleCalculatorComponent, },
  { path: 'order-review', component: OrderReviewComponent },
  {
    path: 'order-summary', component: OrderSummaryComponent,
    children: [
      { path: '', redirectTo: 'contact-info', pathMatch: 'full' },
      {
        path: 'order-edit-modal',
        component: OrderEditModalComponent,
        outlet: 'orderEditModal'
      },
      { path: 'contact-info', component: ContactInfoComponent },
      { path: 'contact-info-review', component: ContactInfoReviewComponent }
    ]
  },
  { path: 'order-print', component: OrderPrintComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
