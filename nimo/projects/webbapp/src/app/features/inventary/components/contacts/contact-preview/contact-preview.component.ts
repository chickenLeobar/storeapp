import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { IContact } from './../../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input
} from '@angular/core';

@Component({
  selector: 'leo-contact-preview',
  template: `
    <nz-card
      gdArea="preview"
      style="height: 40vh; width: 350px;"
      fxLayout
      fxLayoutAlign="center center"
    >
      <ng-container *ngIf="isValid">
        <nz-space nzAlign="start" nzDirection="vertical">
          <nz-descriptions
            *nzSpaceItem
            style="width: 300px;"
            [nzTitle]="contact?.name || ''"
            [nzColumn]="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }"
          >
            <nz-descriptions-item nzTitle="T. documento">
              Dni
            </nz-descriptions-item>
            <nz-descriptions-item nzTitle="N. documento">
              76280650
            </nz-descriptions-item>
            <nz-descriptions-item nzTitle="T. Contacto">
              Cliente
            </nz-descriptions-item>

            <nz-descriptions-item nzTitle="Telefono">
              987654321
            </nz-descriptions-item>
            <nz-descriptions-item nzTitle="Correo">
              usatloqueando@gmail.com
            </nz-descriptions-item>

            <nz-descriptions-item nzTitle="F. Registro">
              20-20-20
            </nz-descriptions-item>
          </nz-descriptions>
          <!-- buttons -->
          <div *nzSpaceItem>
            <button nz-button nzType="primary">
              ventas
            </button>
          </div>
        </nz-space>
      </ng-container>
    </nz-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact!: IContact | undefined | null;

  public isContact(source: NzSafeAny): source is IContact {
    return source != null && source != undefined && 'name' in source;
  }
  public get isValid() {
    return this.isContact(this.contact);
  }
  constructor() {}

  ngOnInit(): void {}
}
