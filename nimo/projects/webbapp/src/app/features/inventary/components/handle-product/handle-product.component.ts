import { IProduct } from './../../models/index';
import { FormControl, FormBuilder } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { map, switchMap, tap, filter, take } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  State,
  selectAndSearchCategories,
  selectBrands,
  selectCurrentProduct
} from '../../reducers';
import { AvalibleModes, HandleCountMode, IInterfaz } from '../../libs';
import { FormGroup } from '@angular/forms';
import * as productActions from '../../actions/product.actionts';
interface InitialState {
  interfaz?: IInterfaz;
  currentProduct?: IProduct;
}
import { LoadingService } from '../../../../core/ui/loading/loading.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@Component({
  selector: 'leo-handle-product',
  templateUrl: './handle-product.component.html',
  styles: [],
  providers: [ComponentStore, HandleCountMode]
})
@UntilDestroy()
export class HandleProductComponent implements OnInit {
  methodcounts: {
    label: string;
    value: AvalibleModes;
  }[] = [
    {
      value: 'MONT',
      label: 'Monto'
    },
    {
      value: 'UNITY',
      label: 'Unidad'
    },
    {
      value: 'LITER',
      label: 'Litro'
    },
    {
      value: 'kilo',
      label: 'kilo'
    }
  ];

  /*=============================================
  =            others controls            =
  =============================================*/

  visibleBrandChague: FormControl = new FormControl(true);

  /*=============================================
 =            forms Definition            =
 =============================================*/
  productForm = new FormGroup({
    name: this.fb.control([]),
    description: this.fb.control([]),
    stock: this.fb.control([]),
    mont_enter: this.fb.control([]),
    mont_exist: this.fb.control([]),
    method_cont: this.fb.control([]),
    brand: this.fb.control([]),
    category: this.fb.control([])
  });

  /*=============================================
  =            local Effects            =
  =============================================*/
  changueEvaluateMethod$ = this.componentStore.effect(
    ($trigger: Observable<{ mode: AvalibleModes }>) => {
      return $trigger.pipe(
        switchMap(mod => {
          this.resultMode.changueMode(mod.mode);
          return this.resultMode.value.pipe(
            tap(data => {
              this.componentStore.patchState({
                interfaz: data
              });
            })
          );
        })
      );
    }
  );

  /*=============================================
  =            variaables            =
  =============================================*/

  private isEdit = false;

  constructor(
    private readonly componentStore: ComponentStore<InitialState>,
    private store: Store<State>,
    private resultMode: HandleCountMode,
    private fb: FormBuilder,
    private loading: LoadingService
  ) {
    this.componentStore.setState({});
    this.changueEvaluateMethod$({ mode: 'MONT' });
  }
  // categories
  $categories = this.store.select(selectAndSearchCategories);
  // brands
  $brands = this.store.select(selectBrands);

  readonly $selectInterfaz = this.componentStore.select(
    state => state.interfaz
  );

  ngOnInit(): void {
    this.formConfigurations();
    this.$selectedCurrentProdcut
      .pipe(
        tap(d => {
          console.log(d);
        }),
        filter(Boolean)
      )
      .pipe(untilDestroyed(this))
      .subscribe(pr => {
        let praux = pr as IProduct;
        // set values in form
        this.productForm.patchValue({
          ...praux
        });
      });
  }
  private formConfigurations() {
    this.productForm.get('method_cont')?.patchValue('MONT');
    this.productForm.get('method_cont')?.valueChanges.subscribe(val => {
      this.changueEvaluateMethod$({ mode: val });
    });
  }

  public registerProduct(event: NzSafeAny) {
    // prepare product

    let product = this.productForm.value as IProduct;

    this.loading.show('Guardando producto');

    const sendBrand = Boolean(this.visibleBrandChague.value);
    if (!sendBrand) {
      delete product?.brand;
    }
    if (!this.resultMode.stockVisible) {
      delete product.stock;
    }
    //
    this.$selectedCurrentProdcut.pipe(take(1)).subscribe(pr => {
      if (this.isEdit) {
        product = {
          ...product,
          id: pr.id
        };
        this.store.dispatch(productActions.editProduct({ product }));
      } else {
        this.store.dispatch(
          productActions.addProduct({
            product: product
          })
        );
      }
    });
  }
  // selected current id
  $selectedCurrentProdcut = this.store.select(
    selectCurrentProduct
  ) as Observable<IProduct>;

  public $vm = this.componentStore.select(
    this.$categories,
    this.$brands,
    this.$selectInterfaz,
    this.$selectedCurrentProdcut,
    (categories, brands, interfaz, curentProduct) => {
      this.isEdit = curentProduct != null;
      return {
        categories: categories,
        brands: brands,
        interface: interfaz,
        isEdit: this.isEdit
      };
    }
  );
}
