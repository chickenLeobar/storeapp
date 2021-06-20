import { NgModule, Injector, ComponentFactoryResolver } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCERS } from './reducers';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EmptyDefaultComponentComponent } from './core/componets/empty-default-component/empty-default-component.component';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

// const nzConfigFactory = (
//   injector: Injector,
//   resolver: ComponentFactoryResolver
// ): NzConfig => {
//   const factory = resolver.resolveComponentFactory(
//     EmptyDefaultComponentComponent
//   );
//   const { tplEmpty } = factory.create(injector).instance;
//   console.log('render empty');

//   return {
//     empty: {
//       nzDefaultEmptyContent: tplEmpty
//     }
//   };
// };

const zorro = [
  NzDropDownModule,
  NzSpaceModule,
  NzAvatarModule,
  NzButtonModule,
  NzSelectModule
];
registerLocaleData(es);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    ...zorro,
    StoreModule.forRoot(ROOT_REDUCERS, {}),
    EffectsModule.forRoot([]),
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      name: 'Store app'
    }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES }
    // {
    //   provide: NZ_CONFIG,
    //   useFactory: nzConfigFactory,
    //   deps: [Injector, ComponentFactoryResolver]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
