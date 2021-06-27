import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { css, cx } from '@emotion/css';

export type ContainerMode = 'small' | 'large' | 'normal';

import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'leo-container',
  template: `
    <div [class]="className$ | async">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['../styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit, OnChanges {
  @Input() mode!: ContainerMode;

  public className$ = new BehaviorSubject<string>('container');

  // @HostBinding('class') class!: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { mode } = changes;
    this.applySizeOnContainer(mode.currentValue);
  }

  private applySizeOnContainer(mode: ContainerMode) {
    console.log('resolve');

    this.className$.next(cx(this.resolveSizeOnContainer(mode), 'container'));
  }
  private resolveSizeOnContainer(mode: ContainerMode) {
    switch (mode) {
      case 'large':
        return css`
          max-width: 1600px !important;
        `;
      case 'normal':
        return css`
          max-width: 1400px !important;
        `;
      case 'small':
        return css`
          max-width: 1200px !important;
        `;
      default:
        break;
    }
    return css``;
  }

  ngOnInit(): void {
    // this.applySizeOnContainer('normal');
  }
}
