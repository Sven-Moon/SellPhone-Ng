import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './components/app/app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppComponents } from './app-components'
import { FilterPipe } from './pipes/filter.pipe'
import { AppServices } from './app-services'
import { AppStores } from './app-stores'
import { StoreModule } from '@ngrx/store'
// import { AppMockInterceptors } from './app-mocks';
import { environment } from 'src/environments/environment'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { SearchEffects } from './stores/search/search.effects'
import { StaticDataEffects } from './stores/staticData/staticData.effects'
import { Helpers } from './helpers/helpers'
// import { NgrxFormsModule } from 'ngrx-forms'
import { CommonModule } from '@angular/common';
import { NgrxFormsModule } from 'ngrx-forms'
// import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ...AppComponents,
    FilterPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    NgbModule,
    // FontAwesomeModule,
    FormsModule,
    NgrxFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(AppStores),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      SearchEffects,
      StaticDataEffects
    ])
  ],
  providers: [
    ...AppServices,
    // ...(environment.useMocking ? AppMockInterceptors : []),
    Helpers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
