import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventaryRoutingModule } from './inventary-routing.module';
import { InventaryComponent } from './containers/inventary.component';

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

const zorro = [NzLayoutModule];
@NgModule({
  declarations: [InventaryComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTypographyModule,
    InventaryRoutingModule,
    NzInputModule,
    NzTableModule,
    NzLayoutModule,
    HttpClientModule,
    StoreModule.forFeature(fromInventary.featureKey, fromInventary.reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [...services],
})
export class InventaryModule {}
