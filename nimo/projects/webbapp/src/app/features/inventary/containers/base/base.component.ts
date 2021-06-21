import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectRawBusiness } from '../../reducers';
@Component({
  selector: 'leo-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.style.scss']
})
export class BaseComponent implements OnInit {
  business$ = this.store.select(selectRawBusiness);
  constructor(private store: Store<State>) {}
  ngOnInit(): void {}
}
