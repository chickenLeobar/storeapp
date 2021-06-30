import {
  Component,
  OnInit,
  HostBinding,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import { cx, css } from '@emotion/css';
@Component({
  selector: 'leo-base-auth',
  templateUrl: './base.component.html',
  styleUrls: ['../../styles/base.styles.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit, OnDestroy {
  constructor() {}

  classContainer!: string;
  ngOnInit(): void {
    this.classContainer = this.resolveClasseContainer();
  }
  private resolveClasseContainer() {
    return cx({ container: true });
  }
  ngOnDestroy(): void {
    // this.classContainer = css`
    //   position: initial;
    //   width: initial;
    //   height: initial;
    // `;
  }
}
