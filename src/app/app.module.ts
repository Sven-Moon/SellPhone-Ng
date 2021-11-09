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
import { CommonModule } from '@angular/common';
import { NgrxFormsModule } from 'ngrx-forms';
import { ModalModule } from 'ngx-bootstrap/modal'
import { AppMockInterceptors } from './app-mocks'


@NgModule({
  declarations: [
    ...AppComponents,
    FilterPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    EffectsModule.forRoot([
      SearchEffects,
      StaticDataEffects
    ]),
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgbModule,
    NgrxFormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(AppStores),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  providers: [
    ...AppServices,
    ...(environment.useMocking ? AppMockInterceptors : []),
    Helpers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
