import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponents } from './app-components';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchService } from './services/search.service';
import { AppServices } from './app-services';
import { AppStores } from './app-stores';
import { AppActions } from './app-actions';
import { StoreModule } from '@ngrx/store';
import { AppMockInterceptors } from './app-mocks';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [...AppComponents, FilterPipe ], //spreader operator
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(AppStores)
  ],
  providers: [
    ...AppServices,
    ...AppActions,
    ...(environment.useMocking ? AppMockInterceptors : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
