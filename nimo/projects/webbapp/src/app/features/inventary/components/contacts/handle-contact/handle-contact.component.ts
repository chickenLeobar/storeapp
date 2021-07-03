import { IContact } from './../../../models/index';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { isNull, isUndefined } from 'lodash';

@Component({
  selector: 'leo-handle-contact',
  template: `
    <form nz-form nzLayout="vertical">
      <formly-form
        [model]="model"
        [options]="options"
        [fields]="fields"
        [form]="form"
      >
      </formly-form>
      <div *nzModalFooter>
        <button nz-button (click)="saveData()" nzType="primary">
          {{ labelHandle }}
        </button>
      </div>
    </form>
  `,
  styles: []
})
export class HandleContactComponent implements OnInit {
  public form = new FormGroup({});

  public model: NzSafeAny = {};
  private _contact!: IContact;

  public addContact(v: IContact | null | undefined) {
    if (!isNull(v) && !isUndefined(v)) {
      this._contact = v;
      this.model = {
        ...v
      };
      console.log(v);
    } else {
      this.model = {};
    }
  }
  public get labelHandle() {
    return this.isEdit ? 'Editar' : 'Guardar';
  }
  public get isEdit() {
    return this._contact != null;
  }

  onContactSave = new EventEmitter<Partial<IContact>>();

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Nombre',
        placeholder: 'Nombre del contacto'
      }
    },
    {
      key: 'type_document',
      type: 'select',
      templateOptions: {
        label: 'Tipo de Documento',
        options: [
          { label: 'dni', value: 'DNI' },
          { label: 'ruc', value: 'RUC' }
        ]
      }
    },
    {
      key: 'num_document',
      type: 'input',
      templateOptions: {
        label: 'Número de documento',
        placeholder: 'número de documento',
        pattern: /^[0-9]*$/
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => {
            return `${field.formControl?.value} no es valor valido para este campo`;
          }
        }
      }
    },
    {
      key: 'direction',
      type: 'input',
      templateOptions: {
        label: 'Dirección',
        placeholder: 'Dirección'
      }
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        label: 'Teléfono',
        placeholder: '',
        pattern: /^[+0-9\s]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => {
            return `${field.formControl?.value} no es valor valido para este campo`;
          }
        }
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        placeholder: '',
        type: 'email'
      }
    },
    {
      key: 'type_contact',
      type: 'select',
      templateOptions: {
        label: 'Tipo de contacto',
        options: [
          { label: 'Proveedor', value: 'PROVIDER' },
          { label: 'Cliente', value: 'CLIENT' }
        ]
      }
    },
    {
      key: 'notes',
      type: 'textarea',
      templateOptions: {
        label: 'Notas'
      }
    }
  ];

  constructor() {}

  public saveData() {
    let contact: Partial<IContact> = this.model;
    if (this.form.valid) {
      if (this.isEdit) {
        contact = {
          ...contact,
          id: this._contact.id
        };
      }
      this.onContactSave.emit(contact);
    } else {
    }
  }
  ngOnInit(): void {}
}
