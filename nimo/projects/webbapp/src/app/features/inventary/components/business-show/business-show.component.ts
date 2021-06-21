import { INegocio } from './../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'leo-business-show',
  template: `
    <div fxLayout="row wrap">
      <leo-business-card
        [negocio]="item"
        *ngFor="let item of business"
      ></leo-business-card>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessShowComponent implements OnInit {
  @Input() business!: INegocio[];

  constructor() {}
  ngOnInit(): void {}
}
