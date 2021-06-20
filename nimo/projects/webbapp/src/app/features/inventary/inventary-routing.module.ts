import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventaryComponent } from './containers/inventary/inventary.component';
import { SaleComponent } from './containers/sale/sale.component';
import { BusinessComponent } from './containers/business/business.component';
const routes: Routes = [
  { path: 'inventary', component: InventaryComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'business', component: BusinessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaryRoutingModule {}
