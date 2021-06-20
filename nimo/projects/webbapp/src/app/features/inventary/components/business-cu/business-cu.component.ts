import { map, take, tap } from 'rxjs/operators';
import { INegocio } from './../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { CloudinaryResponse, CloudinaryService } from 'shared';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as businessActions from '../../actions/business.actions';
@Component({
  selector: 'leo-business-cu',
  templateUrl: './business-cu.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessCuComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  model: any = {};
  // file for upload on server
  private file!: File;

  constructor(
    private cloudinaryService: CloudinaryService,
    private store: Store<State>
  ) {}

  public options: FormlyFormOptions = {
    formState: {}
  };

  public receiveFile({
    errors,
    file
  }: {
    errors: string[];
    file: File | null;
  }) {
    if (errors.length == 0 && file != null) {
      this.file = file;
    }
  }
  public fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Nombre',
        placeholder: 'Ingrese el nombre de su empresa'
      }
    },
    {
      key: 'direction',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Dirección',
        placeholder: 'Ingrese la dirección de su empresa'
      }
    },
    {
      key: 'social_reason',
      type: 'input',
      templateOptions: {
        required: false,
        label: 'Razón Social',
        placeholder: 'Razon social de su empresa'
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        required: false,
        label: 'Descripción',
        placeholder: 'Describa su empresa'
      }
    }
  ];

  public saveBusiness() {
    let business = this.model as INegocio;
    if (!this.form.valid) {
      console.log('form not is valid');
      return;
    }

    if (this.file) {
      this.cloudinaryService
        .uploadFile(this.file)
        .pipe(
          tap(resp => {
            business = {
              ...business,
              image: resp
            };
            this.store.dispatch(
              businessActions.saveBusiness({
                negocio: business
              })
            );
          }),
          take(1)
        )
        .subscribe();
    } else {
      console.log('not file');
    }
  }

  ngOnInit(): void {}
}
