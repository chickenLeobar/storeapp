import { map, take, tap, filter, mergeMap } from 'rxjs/operators';
import { INegocio } from './../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { CloudinaryService, CloudinaryResponse } from 'shared';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as businessActions from '../../actions/business.actions';
import { selectCurrentBusiness } from '../../reducers';
import { iif, of, defer, pipe } from 'rxjs';
import { get } from 'lodash';
import { obtainPreviewUrlOrNotFound } from '../../utils';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { LoadingService } from '../../../../core/ui/loading/loading.service';
import { castDraft } from 'immer';
@Component({
  selector: 'leo-business-cu',
  templateUrl: './business-cu.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class BusinessCuComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  model: any = {};
  // file for upload on server
  private file!: File;

  constructor(
    private cloudinaryService: CloudinaryService,
    private store: Store<State>,
    private cdr: ChangeDetectorRef,
    private loading: LoadingService
  ) {}

  public selectedBusiness: null | INegocio = null;

  public get isEdit(): boolean {
    return this.selectedBusiness != null;
  }

  public get previewImage() {
    if (this.selectedBusiness) {
      return obtainPreviewUrlOrNotFound(this.selectedBusiness);
    }
    return '';
  }

  $mode = this.store
    .select(selectCurrentBusiness)
    .pipe(
      filter(el => el != null),
      tap(business => {
        if (business) {
          this.model = {
            ...castDraft(business)
          };
          this.selectedBusiness = business;
          this.cdr.markForCheck();
        }
      }),
      pipe(untilDestroyed(this))
    )
    .subscribe();

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
    this.loading.show('');
    let business = this.model as INegocio;
    if (!this.form.valid) {
      return;
    }
    const createBusiness = (sourceImage?: CloudinaryResponse) => {
      let imageSource = sourceImage ? sourceImage : {};
      business = {
        ...business,
        image: imageSource
      };
      this.store.dispatch(
        businessActions.saveBusiness({
          negocio: business
        })
      );
    };

    const existFile = () => this.file != null;
    const cloudinarAndCreate = this.cloudinaryService
      .uploadFile(this.file)
      .pipe(map(createBusiness));

    const editBusiness = (sourceImage?: CloudinaryResponse) => {
      if (sourceImage) {
        business = {
          ...business,
          image: sourceImage
        };
      } else {
        business = {
          ...business,
          image: this.selectedBusiness?.image || {}
        };
      }
      this.store.dispatch(
        businessActions.editBusiness({
          negocio: business
        })
      );
    };

    const cloudinaryAndUpate = this.cloudinaryService
      .deleteAndCreate(
        get(this.selectedBusiness, 'image.public_id', null),
        this.file
      )
      .pipe(map(editBusiness));

    const create$ = iif(
      existFile,
      cloudinarAndCreate,
      defer(() => createBusiness())
    );
    const update$ = iif(
      existFile,
      cloudinaryAndUpate,
      defer(() => editBusiness())
    );

    of([1])
      .pipe(
        mergeMap(() => iif(() => this.isEdit, update$, create$)),
        take(1)
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
