import { TypeContact } from './../../models/index';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'leo-menu-contact',
  template: `
    <ul nz-menu nzMode="horizontal">
      <li nz-menu-item>
        <a [routerLink]="[]" [queryParams]="{ type: 'client' }">Clientes </a>
      </li>
      <li nz-menu-item>
        <a [routerLink]="[]" [queryParams]="{ type: 'provider' }">
          Proveedores
        </a>
      </li>
    </ul>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class MenuContactComponent implements OnInit {
  @Output() onTypeContact = new EventEmitter<TypeContact>();

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params: Params) => {
        const { type } = params;
        console.log(type);
        const source: TypeContact = type == 'provider' ? 'PROVIDER' : 'CLIENT';
        this.onTypeContact.emit(source);
      });
  }
}
