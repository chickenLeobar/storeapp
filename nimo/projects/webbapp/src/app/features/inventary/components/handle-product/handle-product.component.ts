import { FormControl } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { State, selectAndSearchCategories, selectBrands } from '../../reducers';
import { AvalibleModes, HandleCountMode, IInterfaz } from '../../libs';

interface InitialState {
  interfaz?: IInterfaz;
}

@Component({
  selector: 'leo-handle-product',
  templateUrl: './handle-product.component.html',
  styles: [],
  providers: [ComponentStore, HandleCountMode]
})
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

  controlMethodChangue: FormControl = new FormControl();

  changueEvaluateMethod$ = this.componentStore.effect(
    ($trigger: Observable<{ mode: AvalibleModes }>) => {
      return $trigger.pipe(
        switchMap(mod => {
          this.resultMode.changueMode(mod.mode);
          return this.resultMode.value.pipe(
            tap(data => {
              console.log('changue state', data);
              this.componentStore.patchState({
                interfaz: data
              });
            })
          );
        })
      );
    }
  );

  constructor(
    private readonly componentStore: ComponentStore<InitialState>,
    private store: Store<State>,
    private resultMode: HandleCountMode
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
    // listen chngue of value method
    this.controlMethodChangue.patchValue('MONT');
    this.controlMethodChangue.valueChanges.subscribe(val => {
      this.changueEvaluateMethod$({ mode: val });
    });
  }
  public $vm = this.componentStore.select(
    this.$categories,
    this.$brands,
    this.$selectInterfaz,
    (categories, brands, interfaz) => {
      return {
        categories: categories,
        brands: brands,
        interface: interfaz
      };
    }
  );
}
