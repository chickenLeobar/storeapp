import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { IContact, TypeContact } from './../../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { isNull, isUndefined, get } from 'lodash';
import { InputBoolean } from 'ng-zorro-antd/core/util';

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
  selector: 'descriptions-contact',
  template: `
    <nz-descriptions
      [nzBordered]="nzBordered"
      [nzTitle]="contact?.name || ''"
      [nzColumn]="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }"
    >
      <nz-descriptions-item [nzTitle]="item.label" *ngFor="let item of details">
        {{ item.value }}
      </nz-descriptions-item>
    </nz-descriptions>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionsComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  _contact!: IContact | undefined | null;
  @Input() set contact(v: IContact | undefined | null) {
    this._contact = v;
  }
  get contact() {
    return this._contact;
  }

  @Input() @InputBoolean() nzBordered: NzSafeAny;

  ngOnInit(): void {}

  public details: ItemDetail[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const { contact } = changes;
    if (!isNull(contact.currentValue) && !isUndefined(contact.currentValue)) {
      if (contact.previousValue !== contact.currentValue) {
        this.details = this.buildDetails(contact.currentValue);
        this.cdr.markForCheck();
      }
    } else {
      this.details = [];
      this.cdr.markForCheck();
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
}
