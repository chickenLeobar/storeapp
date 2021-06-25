import { debounceTime, map } from 'rxjs/operators';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@Component({
  selector: 'leo-search',
  template: `
    <nz-form-item>
      <nz-form-control>
        <nz-input-group nzSuffixIcon="search">
          <input
            type="text"
            [formControl]="inputSearch"
            nz-input
            placeholder="Buscar.."
          />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class SearchComponent implements OnInit {
  public inputSearch: FormControl = new FormControl('');

  @Output() onSearch = new EventEmitter<{ query: string }>();

  constructor() {}

  ngOnInit(): void {
    this.inputSearch.valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(150),
        map((value: string) => value.trim())
      )
      .subscribe(val => this.onSearch.emit({ query: val }));
  }
}
