import { IProduct } from './../../models/index';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HandleBrandComponent } from '../../components/handle-brand/handle-brand.component';
import { HandleCategoriesComponent } from '../../components/handle-categories/handle-categories.component';
import { HandleProductComponent } from '../../components/handle-product/handle-product.component';
import * as categoriactions from '../../actions/category.actions';
import * as fromActions from '../../actions/brand.actions';
import { Store } from '@ngrx/store';
import { State, selectCategories, selectProducts } from '../../reducers';
import * as productActions from '../../actions/product.actionts';
import { ComponentStore } from '@ngrx/component-store';

interface ContainerProductState {}

@Component({
  selector: 'leo-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./../../styles/inventary.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ComponentStore]
})
export class InventaryComponent implements OnInit, OnDestroy {
  categories = ['gaseosas', 'inergumenos', 'lacteos'];
  $categories = this.store.select(selectCategories);
  $products = this.store.select(selectProducts);

  constructor(
    private modal: NzModalService,
    private store: Store<State>,
    private componentStore: ComponentStore<ContainerProductState>
  ) {
    this.store.dispatch(categoriactions.loadCategories({ query: '' }));
    this.store.dispatch(fromActions.loadBrands({ query: '' }));
    this.store.dispatch(productActions.loadProducts());
    this.componentStore.setState({});
  }

  ngOnDestroy(): void {
    this.modal.openModals.forEach(moda => {
      moda.destroy();
    });
  }

  ngOnInit(): void {}

  /*=============================================
   =            view            =
   =============================================*/
  public $vm = this.componentStore.select(this.$products, products => {
    return {
      products
    };
  });

  // edit product
  public editProduct(product: IProduct): void {
    this.store.dispatch(productActions.selectProduct({ product }));
    this.openModalHandleProduct();
  }
  // create product open modal for that
  public createProduct(): void {
    // clean current Id
    this.store.dispatch(productActions.cleanProductId());
    this.openModalHandleProduct();
  }
  // delete prduct

  public deleteProduct(product: IProduct): void {
    this.modal.confirm({
      nzTitle: 'Eliminar Producto',
      nzContent: '¿Desea eliminar este producto?',
      nzOnOk: () => {
        this.store.dispatch(
          productActions.removeProduct({
            product
          })
        );
      }
    });
  }

  /*=============================================
  =            Modals            =
  =============================================*/

  public openCategoriesModal(): void {
    this.modal.create({
      nzTitle: 'Categorias',
      nzContent: HandleCategoriesComponent,
      nzWidth: '800px'
    });
  }
  public openBrandModal(): void {
    this.modal.create({
      nzTitle: 'Marcas',
      nzContent: HandleBrandComponent,
      nzWidth: '800px'
    });
  }

  public openModalHandleProduct() {
    this.modal.create({
      nzTitle: 'Producto',
      nzContent: HandleProductComponent,
      nzWidth: '800px'
    });
  }
}
