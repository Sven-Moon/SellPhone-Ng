import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponents } from './app-components';
import { FilterPipe } from './pipes/filter.pipe';
import { AppServices } from './app-services';
import { AppStores } from './app-stores';
import { AppActions } from './app-actions';
import { StoreModule } from '@ngrx/store';
import { AppMockInterceptors } from './app-mocks';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './stores/search/search.effects';

@NgModule({
  declarations: [
    ...AppComponents,
    FilterPipe ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(AppStores),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([SearchEffects])
  ],
  providers: [
    ...AppServices,
    ...AppActions,
    ...(environment.useMocking ? AppMockInterceptors : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
