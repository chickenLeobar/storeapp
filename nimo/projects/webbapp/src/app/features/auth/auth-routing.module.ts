import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './containers/base/base.component';
import { RegisterComponent } from './components/register/register.component';
import { LoguinComponent } from './components/loguin/loguin.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
const routes: Routes = [
  {
    component: BaseComponent,
    path: 'auth',
    children: [
      { component: LoguinComponent, path: 'loguin' },
      { component: RegisterComponent, path: 'register' },
      { component: ConfirmEmailComponent, path: 'confirm' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthsRoutingModule {}
