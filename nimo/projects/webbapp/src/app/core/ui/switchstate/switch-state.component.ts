import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  Component,
  OnInit,
  forwardRef,
  Input,
  NgZone,
  Inject,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  HostBinding,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, merge } from 'rxjs';
enum Side {
  LEFT = 'left',
  RIGHT = 'right'
}
@Component({
  selector: 'switch-state',
  templateUrl: './switch-state.component.html',
  styleUrls: ['./styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SwitchStateComponent)
    }
  ]
})
/**
 * left
 */
@UntilDestroy()
export class SwitchStateComponent
  implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges {
  private onChange!: (value: NzSafeAny) => void;
  private onTouched!: () => void;

  @Input() @InputBoolean() @HostBinding('class.small') LeSmall!: boolean;

  checked: boolean = true;
  constructor(private renderer: Renderer2, private element: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { LeSmall } = changes;
    if (LeSmall.currentValue != LeSmall) {
      this.LeSmall = LeSmall.currentValue;
    }
  }
  ngAfterViewInit(): void {
    this.handleState();
  }
  private handleState() {
    const els = Object.assign(
      [],
      this.element.nativeElement.querySelectorAll('.box')
    ) as HTMLSpanElement[];
    const refreshItems = (els: HTMLElement[]) => {
      els.forEach(el => {
        this.renderer.removeClass(el, 'selected');
        const side = el.dataset.side as Side;
        if (this.checked && side == Side.RIGHT) {
          this.renderer.addClass(el, 'selected');
        }
        if (!this.checked && side == Side.LEFT) {
          this.renderer.addClass(el, 'selected');
        }
      });
    };
    refreshItems(els);
    const obs = els.map(el => fromEvent(el, 'click'));
    merge(...obs)
      .pipe(untilDestroyed(this))
      .subscribe(even => {
        const side = (even.target as NzSafeAny).dataset.side as Side;
        this.checked = side == Side.RIGHT;
        if (this.onChange) {
          this.onTouched();
          this.onChange(this.checked);
        }
        refreshItems(els);
      });
  }

  writeValue(obj: boolean | unknown): void {
    if (typeof obj == 'boolean') {
      this.checked = obj;
    } else {
      throw new Error('Hey not valid value passed');
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {}
}
