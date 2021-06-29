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

const DEPENDENCES_EXTRA = [FlexLayoutModule];

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
  ConfirmEmailComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, AuthsRoutingModule, DEPENDENCES_EXTRA, ...ZORRO]
})
export class AuthModule {}
