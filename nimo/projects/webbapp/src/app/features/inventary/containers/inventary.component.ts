import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HandleBrandComponent } from '../components/handle-brand/handle-brand.component';
import { HandleCategoriesComponent } from '../components/handle-categories/handle-categories.component';
import { HandleProductComponent } from '../components/handle-product/handle-product.component';
import * as categoriactions from '../actions/category.actions';
import * as fromActions from '../actions/brand.actions';
import { Store } from '@ngrx/store';
import { State, selectCategories } from '../reducers';
@Component({
  selector: 'leo-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./../styles/inventary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InventaryComponent implements OnInit, OnDestroy {
  categories = ['gaseosas', 'inergumenos', 'lacteos'];
  $categories = this.store.select(selectCategories);

  constructor(private modal: NzModalService, private store: Store<State>) {
    this.store.dispatch(categoriactions.loadCategories({ query: '' }));
    this.store.dispatch(fromActions.loadBrands({ query: '' }));
    this.openCreateProductForm();
  }
  ngOnDestroy(): void {
    this.modal.openModals.forEach(moda => {
      moda.destroy();
    });
  }

  ngOnInit(): void {}

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
  public openCreateProductForm() {
    this.modal.create({
      nzTitle: 'Producto',
      nzContent: HandleProductComponent,
      nzWidth: '800px'
    });
  }
}
