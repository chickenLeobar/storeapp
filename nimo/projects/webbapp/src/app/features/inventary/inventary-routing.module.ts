import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventaryComponent } from './containers/inventary/inventary.component';
import { SaleComponent } from './containers/sale/sale.component';
import { BusinessComponent } from './containers/business/business.component';
import { BaseComponent } from './containers/base/base.component';
const routes: Routes = [
  {
    component: BaseComponent,
    path: '',
    children: [
      { path: 'inventary', component: InventaryComponent },
      { path: 'sale', component: SaleComponent },
      { path: 'business', component: BusinessComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaryRoutingModule {}
