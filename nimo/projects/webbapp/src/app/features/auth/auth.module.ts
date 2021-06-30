import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthsRoutingModule } from './auth-routing.module';
import { BaseComponent } from './containers/base/base.component';
import { LoguinComponent } from './components/loguin/loguin.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import effects from './effects';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../auth/reducers';
import services from './services';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '../../core/ui/loading/loading.module';
import { CodeComponent } from './components/confirm-email/code.component';
const DEPENDENCES_EXTRA = [FlexLayoutModule, LoadingModule];
import { authProvider } from './services/token.service';
const ZORRO = [
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzInputModule,
  NzModalModule,
  NzTypographyModule
];
const COMPONENTS = [
  BaseComponent,
  LoguinComponent,
  RegisterComponent,
  ConfirmEmailComponent,
  CodeComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    AuthsRoutingModule,
    HttpClientModule,
    DEPENDENCES_EXTRA,
    ...ZORRO,
    ReactiveFormsModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducers)
  ],
  providers: [...services, authProvider]
})
export class AuthModule {}
