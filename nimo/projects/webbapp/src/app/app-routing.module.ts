import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './features/auth/services/auth.guard';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: 'app',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./features/inventary/inventary.module').then(
        m => m.InventaryModule
      )
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
