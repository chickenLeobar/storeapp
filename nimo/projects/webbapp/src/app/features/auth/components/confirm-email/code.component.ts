import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  forwardRef,
  NgZone,
  Inject,
  AfterViewInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, fromEvent } from 'rxjs';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'leo-code',
  template: `
    <div nz-form nzLayout="inline">
      <nz-form-item>
        <nz-form-control>
          <input
            type="text"
            nz-input
            class="input_confirm"
            min="0"
            placeholder="0"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <input
            type="text"
            nz-input
            class="input_confirm"
            min="0"
            placeholder="0"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <input
            type="text"
            nz-input
            class="input_confirm"
            min="0"
            placeholder="0"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <input
            type="text"
            nz-input
            class="input_confirm"
            min="0"
            placeholder="0"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <input
            type="text"
            nz-input
            class="input_confirm"
            min="0"
            placeholder="0"
          />
        </nz-form-control>
      </nz-form-item>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeComponent),
      multi: true
    }
  ]
})
@UntilDestroy()
export class CodeComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone
  ) {}

  private onChangue!: (obj: string) => void;
  private onTouched!: () => void;
  writeValue(obj: any): void {}
  registerOnChange(fn: NzSafeAny): void {
    console.log('register');

    this.onChangue = fn;
  }
  registerOnTouched(fn: NzSafeAny): void {
    this.onTouched = fn;
  }
  private onlyNumbersPrevention() {
    this.zone.runOutsideAngular(() => {
      let elements = Object.assign(
        [] as HTMLInputElement[],
        this.document.getElementsByClassName('input_confirm')
      );
      const elementsWIthId = elements.map((el, i) => {
        el.dataset.id = `${i}`;
        return el;
      });
      const getValue = () => {
        return elementsWIthId.map(d => d.value).join('');
      };

      const obs = elementsWIthId.map(el => fromEvent(el, 'input'));
      merge(...obs)
        .pipe(untilDestroyed(this))
        .subscribe(event => {
          const isDelete =
            (event as NzSafeAny).inputType == 'deleteContentBackward';
          const target = event.target as NzSafeAny;
          const val = (target as NzSafeAny).value;
          let id = Number(target.dataset.id);
          const regex = new RegExp('^[0-9]$');
          if (isDelete) {
            const prevEl = elements[--id];
            if (prevEl) {
              prevEl.focus();
            }
          }
          if (regex.test(val)) {
            target.value = val;
            const nextEl = elements[++id];
            if (nextEl) {
              nextEl.focus();
            } else {
              console.log(getValue());

              if (this.onChangue) {
                this.onChangue(getValue());
              }
            }
          } else {
            target.value = (val as string).substr(0, val.length - 1);
          }
        });
    });
  }

  ngAfterViewInit(): void {
    this.onlyNumbersPrevention();
  }

  ngOnInit(): void {}
}
