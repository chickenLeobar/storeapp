import { INegocio } from './../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input
} from '@angular/core';

@Component({
  selector: 'leo-business-card',
  template: `
    <nz-card
      style="width:300px; margin: 10px 10px;"
      [nzCover]="coverTemplate"
      [nzActions]="[actionSetting, actionEdit]"
      nzHoverable
    >
      <nz-card-meta
        [nzTitle]="negocio.name"
        [nzDescription]="negocio.description"
      ></nz-card-meta>
      <ng-template #coverTemplate>
        <img
          width="200"
          style="padding: 10px;"
          [alt]="negocio.name"
          [src]="urlImage"
        />
      </ng-template>
      <ng-template #actionSetting>
        <i nz-icon nzType="setting"></i>
      </ng-template>
      <ng-template #actionEdit>
        <i nz-icon nzType="edit"></i>
      </ng-template>
    </nz-card>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessCardComponent implements OnInit {
  @Input() negocio!: INegocio;

  constructor() {}

  public get urlImage() {
    return this.negocio.image.url;
  }

  ngOnInit(): void {}
}
