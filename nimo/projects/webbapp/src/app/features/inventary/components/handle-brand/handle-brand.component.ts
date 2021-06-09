import { IBrand } from './../../models/index';
import { BrandService } from './../../services/brand.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromInventary from '../../reducers';
import * as brandActions from '../../actions/brand.actions';
import { debounceTime, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'leo-handle-brand',
  templateUrl: './handle-brand.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HandleBrandComponent implements OnInit {
  @ViewChild('formCreate', { read: TemplateRef }) formBrand!: TemplateRef<any>;
  public brandName!: FormControl;

  public searchBrand!: FormControl;

  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private brandService: BrandService,
    private store: Store<fromInventary.State>
  ) {
    this.store.dispatch(
      brandActions.loadBrands({
        query: ''
      })
    );
  }

  $brands = this.store.select(fromInventary.selectBrands);

  ngOnInit(): void {
    this.brandName = this.fb.control([], Validators.required);
    this.searchBrand = this.fb.control([]);
    this.searchBrand.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      console.log('emit ');
      this.store.dispatch(brandActions.loadBrands({ query: value }));
    });
  }

  public eventItemBrand(source: {
    event: 'EDIT' | 'DELETE';
    payload: IBrand;
  }): void {
    switch (source.event) {
      case 'DELETE': {
        this.store.dispatch(
          brandActions.deleteBrand({ brand: source.payload })
        );
        break;
      }
      case 'EDIT': {
        this.store.dispatch(brandActions.editBrand({ brand: source.payload }));
      }
    }
  }

  public openCreateBrand() {
    this.modalService.create({
      nzTitle: 'Crear Marca',
      nzContent: this.formBrand,
      nzOkText: 'crear',
      nzOnOk: () => {
        if (this.brandName.valid) {
          this.store.dispatch(
            brandActions.addBrand({
              brand: {
                name: this.brandName.value
              }
            })
          );
          this.brandName.reset();
        }
      }
    });
  }
}
