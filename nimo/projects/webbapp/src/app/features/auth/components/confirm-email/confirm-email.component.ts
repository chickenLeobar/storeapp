import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  Component,
  OnInit,
  HostBinding,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  AfterViewInit,
  NgZone
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { merge, fromEvent } from 'rxjs';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
@Component({
  selector: 'leo-confirm-email',
  templateUrl: './confirm-email.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
@UntilDestroy()
export class ConfirmEmailComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class_ = 'box';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone
  ) {}
  ngAfterViewInit(): void {
    this.onlyNumbersPrevention();
  }

  ngOnInit(): void {}

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
            }
          } else {
            target.value = (val as string).substr(0, val.length - 1);
          }
        });
    });
  }
}
