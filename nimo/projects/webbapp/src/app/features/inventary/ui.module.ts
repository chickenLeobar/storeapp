import { NgModule } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { EmptyIconsModule } from '././,,/../../../core/componets/empty-default-component/empy.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
const EXTRA = [FlexLayoutModule, EmptyIconsModule];

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
  NzSwitchModule,
  NzDividerModule,
  NzDescriptionsModule,
  NzEmptyModule,
  NzMessageModule,
  NzAvatarModule,
  NzDropDownModule
];

const MATERIAL = [ScrollingModule, DragDropModule];

export const UI_MODULES = [...zorro, ...MATERIAL, ...EXTRA];

@NgModule({
  declarations: [],
  imports: [...zorro, ...MATERIAL, ...EXTRA],
  exports: [],
  providers: []
})
export class UiModule {}
