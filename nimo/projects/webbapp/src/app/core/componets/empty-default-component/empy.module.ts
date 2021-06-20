import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDefaultComponentComponent } from './empty-default-component.component';
import { EmptyProduct } from './product-empty.components';
const COMPONENTS = [EmptyDefaultComponentComponent, EmptyProduct];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
  exports: [...COMPONENTS],
  providers: []
})
export class EmptyIconsModule {}
