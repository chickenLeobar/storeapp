import { get } from 'lodash';
import { CloudinaryResponse, CloudinaryService } from 'shared';
import { IProduct } from './../../models/index';
import { FormControl, FormBuilder } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { map, switchMap, tap, filter, take, mergeMap } from 'rxjs/operators';
import { EMPTY, Observable, of, defer, iif } from 'rxjs';
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
  public file!: File;

  public imageUrl!: NzSafeAny;
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

  private selectedProduct: null | IProduct = null;

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

  public receiveFile({
    errors,
    file
  }: {
    errors: string[];
    file: File | null;
  }) {
    if (errors.length == 0 && file != null) {
      this.file = file;
      console.log('receive file');
    } else {
      console.log('errors');
    }
  }
  /*=============================================
  =            variaables            =
  =============================================*/

  private isEdit = false;

  constructor(
    private readonly componentStore: ComponentStore<InitialState>,
    private store: Store<State>,
    private resultMode: HandleCountMode,
    private fb: FormBuilder,
    private loading: LoadingService,
    private cloudinaryService: CloudinaryService
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
      .pipe(filter(Boolean))
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

    const createProduct = (sourceImage?: CloudinaryResponse) => {
      console.log(sourceImage);
      console.log(this.file);
      let imageSource = sourceImage ? [sourceImage] : [];
      product = {
        ...product,
        images: imageSource
      };
      this.store.dispatch(
        productActions.addProduct({
          product: product
        })
      );
    };
    const existFile = () => this.file != null;
    const cloudinarAndCreate = this.cloudinaryService
      .uploadFile(this.file)
      .pipe(map(createProduct));

    const editProduct = (sourceImage?: CloudinaryResponse) => {
      let imageSource = sourceImage ? [sourceImage] : [];
      if (sourceImage) {
        product = {
          ...product,
          images: imageSource
        };
      } else {
        product = {
          ...product,
          id: this.selectedProduct?.id!,
          images: this.selectedProduct?.images || []
        };
      }
      this.store.dispatch(productActions.editProduct({ product }));
    };

    const cloudinaryAndUpate = this.cloudinaryService
      .deleteAndCreate(get(product, 'image[0].public_id', null), this.file)
      .pipe(map(editProduct));

    const create$ = iif(
      existFile,
      cloudinarAndCreate,
      defer(() => createProduct())
    );
    const update$ = iif(
      existFile,
      cloudinaryAndUpate,
      defer(() => editProduct())
    );

    of([1])
      .pipe(
        mergeMap(() => iif(() => this.isEdit, update$, create$)),
        take(1)
      )
      .subscribe();

    // this.$selectedCurrentProdcut.pipe(take(1)).subscribe(pr => {
    //   if (this.isEdit) {
    //     product = {
    //       ...product,
    //       id: pr.id
    //     };
    //     this.store.dispatch(productActions.editProduct({ product }));
    //   } else {
    //     this.store.dispatch(
    //       productActions.addProduct({
    //         product: product
    //       })
    //     );
    //   }
    // });
  }
  // selected current id
  $selectedCurrentProdcut = this.store.select(selectCurrentProduct).pipe(
    tap((pr: NzSafeAny) => {
      this.selectedProduct = pr;
      this.imageUrl = get(pr, 'images[0].url', null);
    })
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
