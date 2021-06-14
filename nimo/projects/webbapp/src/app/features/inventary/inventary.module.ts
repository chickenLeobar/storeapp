import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventaryRoutingModule } from './inventary-routing.module';
import { InventaryComponent } from './containers/inventary/inventary.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import * as fromInventary from './reducers';
import effects from './effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import services from './services';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HandleBrandComponent } from './components/handle-brand/handle-brand.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  HandleCategoriesComponent,
  CreateCategorieComponent
} from './components/handle-categories/handle-categories.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ItemBrandComponent } from './components/handle-brand/item-brand.component';
import { HandleProductComponent } from './components/handle-product/handle-product.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { SaleComponent } from './containers/sale/sale.component';
import { NzCardModule } from 'ng-zorro-antd/card';
const EXTRA = [FlexLayoutModule];

const zorro = [
  NzUploadModule,
  NzLayoutModule,
  NzListModule,
  NzInputModule,
  NzCardModule,
  NzTableModule,
  NzLayoutModule,
  NzSpaceModule,
  NzModalModule,
  NzFormModule,
  NzGridModule,
  NzButtonModule,
  NzCheckboxModule,
  NzTypographyModule,
  NzIconModule,
  NzSelectModule,
  NzInputNumberModule,
  NzSwitchModule
];
@NgModule({
  declarations: [
    InventaryComponent,
    HandleBrandComponent,
    HandleCategoriesComponent,
    ItemBrandComponent,
    CreateCategorieComponent,
    HandleProductComponent,
    SaleComponent
  ],
  imports: [
    CommonModule,
    InventaryRoutingModule,
    HttpClientModule,
    ...zorro,
    FormsModule,
    ReactiveFormsModule,
    EXTRA,
    StoreModule.forFeature(fromInventary.featureKey, fromInventary.reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...services]
})
export class InventaryModule {}
