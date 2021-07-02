import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectRawBusiness } from '../../reducers';
import { FormBuilder } from '@angular/forms';
import { selectedWorkingBusiness } from '../../actions/business.actions';
import { loadAll } from '../../actions/router.actions';
@Component({
  selector: 'leo-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.style.scss']
})
export class BaseComponent implements OnInit {
  business$ = this.store.select(selectRawBusiness);

  constructor(private store: Store<State>, private fb: FormBuilder) {}

  selectBusinessControl = this.fb.control('');

  ngOnInit(): void {
    this.selectBusinessControl.valueChanges.subscribe(val => {
      this.store.dispatch(selectedWorkingBusiness({ id: val }));
      this.store.dispatch(loadAll());
    });
  }
}
