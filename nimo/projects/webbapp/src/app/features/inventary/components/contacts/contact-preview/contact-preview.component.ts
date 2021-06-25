import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { IContact, TypeContact } from './../../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  ChangeDetectorRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import { isNull, isUndefined, get } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
function isValid(candidate: unknown) {
  let isValid = true;

  if (isUndefined(candidate) || isNull(candidate)) {
    isValid = false;
  }
  return isValid;
}

const labels: { [key in keyof IContact]?: string } = {
  create: 'F. De Creación',
  email: 'Email',
  type_contact: 'T. Documento',
  direction: 'Dirección',
  num_document: 'N. Documento',
  phone: 'Teléfono',
  name: 'Nombre'
};

type ItemDetail = {
  label: string;
  value: string;
};

@Component({
  selector: 'leo-contact-preview',
  template: `
    <nz-card
      gdArea="preview"
      style="height: 450px; width: 350px; padding: 10px;"
      fxLayout
      fxLayoutAlign="center start"
      [hidden]="!isValid"
    >
      <div #templatePortalContent></div>
      <nz-space nzAlign="start" nzDirection="vertical">
        <nz-descriptions
          *nzSpaceItem
          style="width: 300px; "
          [nzTitle]="contact?.name || ''"
          [nzColumn]="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }"
        >
          <nz-descriptions-item
            [nzTitle]="item.label"
            *ngFor="let item of details"
          >
            {{ item.value }}
          </nz-descriptions-item>
        </nz-descriptions>
        <!-- buttons -->
        <div *nzSpaceItem>
          <div
            fxFlex="row"
            fxLayoutAlign="space-between"
            class="w-100"
            style="width: 250px !important;"
          >
            <button nz-button nzType="primary">
              ventas
            </button>
            <nz-space>
              <button
                (click)="deleteContact()"
                *nzSpaceItem
                nz-button
                nzType="primary"
                nzDanger
              >
                <i nz-icon nzType="delete" nzTheme="outline"></i>
              </button>
              <button
                *nzSpaceItem
                nz-button
                nzType="primary"
                (click)="onEdit.emit(contact)"
              >
                <i nz-icon nzType="edit" nzTheme="outline"></i>
              </button>
            </nz-space>
          </div>
        </div>
      </nz-space>
    </nz-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ContactPreviewComponent
  implements OnInit, AfterViewInit, OnChanges {
  @Input() contact!: IContact | undefined | null;

  @Output() onEdit = new EventEmitter<unknown>();
  @Output() onDelete = new EventEmitter<unknown>();

  public details: ItemDetail[] = [];

  public isContact(source: NzSafeAny): source is IContact {
    return source != null && source != undefined && 'name' in source;
  }

  public deleteContact() {
    this.modalService.confirm({
      nzTitle: 'Eliminar contacto',
      nzContent: '¿Esta seguro que desea realizar esta acción?',
      nzOnOk: () => {
        this.onDelete.emit(this.contact);
      }
    });
  }
  public get isValid() {
    return this.isContact(this.contact);
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { contact } = changes;
    if (!isNull(contact.currentValue) && !isUndefined(contact.currentValue)) {
      if (contact.previousValue !== contact.currentValue) {
        this.details = this.buildDetails(contact.currentValue);
        this.cdr.markForCheck();
      }
    }
  }

  private buildDetails(contact: IContact): ItemDetail[] {
    return Object.keys(contact)
      .map(key => {
        let value = get(contact, key) as NzSafeAny;
        if (isValid(value)) {
          const label = get(labels, key);
          if (label) {
            if (key == 'type_contact') {
              value =
                (value as TypeContact) == 'CLIENT' ? 'Cliente' : 'Proveedor';
            }

            return {
              label: label,
              value: value
            } as ItemDetail;
          } else {
            return null;
          }
        } else {
          return null;
        }
      })
      .filter(d => !isNull(d)) as ItemDetail[];
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {}
}
