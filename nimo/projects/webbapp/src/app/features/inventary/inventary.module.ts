import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventaryRoutingModule } from './inventary-routing.module';
import { InventaryComponent } from './containers/inventary.component';
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

import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  HandleCategoriesComponent,
  CreateCategorieComponent
} from './components/handle-categories/handle-categories.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ItemBrandComponent } from './components/handle-brand/item-brand.component';

const EXTRA = [FlexLayoutModule];

const zorro = [
  NzLayoutModule,
  NzListModule,
  NzInputModule,
  NzTableModule,
  NzLayoutModule,
  NzSpaceModule,
  NzModalModule,
  NzFormModule,
  NzGridModule,
  NzButtonModule,
  NzCheckboxModule,
  NzTypographyModule,
  NzIconModule
];
@NgModule({
  declarations: [
    InventaryComponent,
    HandleBrandComponent,
    HandleCategoriesComponent,
    ItemBrandComponent,
    CreateCategorieComponent
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
