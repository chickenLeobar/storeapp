import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostBinding
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

  @HostBinding('class') class: string = css`
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100vw;
  `;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { mode } = changes;
    this.applySizeOnContainer(mode.currentValue);
  }

  private applySizeOnContainer(mode: ContainerMode) {
    this.className$.next(cx(this.resolveSizeOnContainer(mode), 'container'));
  }
  private resolveSizeOnContainer(mode: ContainerMode) {
    switch (mode) {
      case 'large':
        return css`
          max-width: 1600px !important;
          width: 1600px;
        `;
      case 'normal':
        return css`
          max-width: 1400px !important;
          width: 1400px;
        `;
      case 'small':
        return css`
          max-width: 1200px !important;
          width: 1200px;
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
