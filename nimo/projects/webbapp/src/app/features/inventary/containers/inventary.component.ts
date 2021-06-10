import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HandleBrandComponent } from '../components/handle-brand/handle-brand.component';
import { HandleCategoriesComponent } from '../components/handle-categories/handle-categories.component';
import * as categoriactions from '../actions/category.actions';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
@Component({
  selector: 'leo-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./../styles/inventary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InventaryComponent implements OnInit {
  categories = ['gaseosas', 'inergumenos', 'lacteos'];

  constructor(private modal: NzModalService, private store: Store<State>) {
    this.store.dispatch(categoriactions.loadCategories({ query: '' }));
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
}
