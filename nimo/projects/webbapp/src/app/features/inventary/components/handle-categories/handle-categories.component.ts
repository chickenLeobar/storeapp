import { tap, debounceTime } from 'rxjs/operators';
import { ICategory } from './../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { selectAndSearchCategories } from '../../reducers';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as categoryActions from '../../actions/category.actions';
import { selectCurrentCategory } from '../../reducers';
@Component({
  selector: 'le-create-categorie',
  template: `
    <form action="" nz-form [formGroup]="form">
      <nz-input-group>
        <nz-form-control>
          <nz-form-label>
            Nombre
          </nz-form-label>
          <input nz-input formControlName="name" />
        </nz-form-control>
      </nz-input-group>
      <!-- decripcion -->
      <nz-input-group>
        <nz-form-control>
          <nz-form-label>
            Descripción
          </nz-form-label>
          <textarea nz-input formControlName="description"> </textarea>
        </nz-form-control>
      </nz-input-group>
      <ng-template [nzModalFooter]>
        <button nz-button nzDanger>
          cancelar
        </button>
        <button nz-button (click)="submit()" nzType="primary">
          {{ isEdit ? 'Editar' : ' Guardar' }}
        </button>
      </ng-template>
    </form>
  `,
  styleUrls: []
})
export class CreateCategorieComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    name: this.fb.control([]),
    description: this.fb.control([])
  });

  @Output() onCategorie = new EventEmitter<{
    name: string;
    description: string;
  }>();
  private _cateogorie!: ICategory;
  @Input() public set categorie(v: ICategory) {
    this._cateogorie = v;
    this.form.patchValue({
      name: v.name,
      description: v.description
    });
  }
  public get categorie() {
    return this._cateogorie;
  }

  get isEdit() {
    return this.categorie != null;
  }
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private store: Store<State>
  ) {}
  $categories = this.store
    .select(selectCurrentCategory)
    .pipe(
      tap(categorie => {
        if (categorie) {
          this.categorie = categorie;
        }
      })
    )
    .subscribe();

  ngOnInit(): void {}

  public closeModal() {
    this.modalRef.close();
  }

  public submit() {
    if (this.form.valid) {
      this.onCategorie.emit({
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value
      });
    }
  }
}
@Component({
  selector: 'leo-handle-categories',
  templateUrl: './handle-categories.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HandleCategoriesComponent implements OnInit {
  categories$ = this.store.select(selectAndSearchCategories);

  searchInput: FormControl = new FormControl([]);

  constructor(
    private store: Store<State>,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(debounceTime(50)).subscribe(val => {
      this.store.dispatch(categoryActions.searchCategorie({ query: val }));
    });
  }

  /*=============================================
  =            DOM EVENTS            =
  =============================================*/

  public createCategorieModalForm(category: ICategory | null) {
    const isCategory = category != null;
    const refModal = this.modalService.create({
      nzTitle: isCategory ? 'Editar Categoria' : 'Crear Categoria',
      nzContent: CreateCategorieComponent
    });
    const instance = refModal.componentInstance;
    if (category && category.id) {
      this.store.dispatch(categoryActions.selectCategory({ id: category.id }));
    }
    const subEvent = instance?.onCategorie.subscribe(val => {
      if (isCategory) {
        this.store.dispatch(
          categoryActions.editCategorie({
            category: {
              name: val.name,
              description: val.description,
              id: category?.id
            }
          })
        );
      } else {
        this.store.dispatch(
          categoryActions.addCategory({
            category: {
              name: val.name,
              description: val.description
            }
          })
        );
      }
      refModal.close();
      subEvent?.unsubscribe();
    });
  }

  public deleteCategorie(category: ICategory) {
    this.modalService.confirm({
      nzTitle: 'Aviso',
      nzContent: '¿Esta seguro que desea eliminar esta categoria?',
      nzOnOk: () => {
        this.store.dispatch(
          categoryActions.removeCategory({ category: category })
        );
      }
    });
  }
}
