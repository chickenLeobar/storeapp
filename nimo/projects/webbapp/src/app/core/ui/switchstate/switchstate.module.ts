import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchStateComponent } from './switch-state.component';
const COMPONENTS = [SwitchStateComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule],
  exports: [COMPONENTS],
  providers: []
})
export class SwitchModule {}
