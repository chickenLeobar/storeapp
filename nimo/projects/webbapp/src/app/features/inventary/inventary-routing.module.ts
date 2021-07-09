import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventaryComponent } from './containers/inventary/inventary.component';
import { SaleComponent } from './containers/sale/sale.component';
import { BusinessComponent } from './containers/business/business.component';
import { BaseComponent } from './containers/base/base.component';
import { ContactsComponent } from './containers/contacts/contacts.component';
import { SelectBusinessGuard } from './guards/select-business.service';
import { SalesComponent } from './containers/sales/sales.component';
const routes: Routes = [
  {
    component: BaseComponent,
    path: '',
    children: [
      {
        path: 'inventary',
        component: InventaryComponent,
        canActivate: [SelectBusinessGuard]
      },
      {
        path: 'sale',
        component: SaleComponent,
        canActivate: [SelectBusinessGuard]
      },
      {
        path: 'sales',
        component: SalesComponent,
        canActivate: [SelectBusinessGuard]
      },
      { path: 'business', component: BusinessComponent },
      {
        path: 'contacts',
        component: ContactsComponent,
        canActivate: [SelectBusinessGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaryRoutingModule {}
