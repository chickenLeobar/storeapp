import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgenumsComponent } from './badgenums.component';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
const COMPONENTS = [BadgenumsComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, NzOutletModule],
  exports: [...COMPONENTS],
  providers: []
})
export class StaBadgeModule {}
