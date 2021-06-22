import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';

const COMPONENTS = [LoadingComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, NzOutletModule, NgxSpinnerModule],
  exports: [...COMPONENTS],
  providers: [LoadingService]
})
export class LoadingModule {}
