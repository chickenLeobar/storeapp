import {
  Component,
  OnInit,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';
import { cx } from '@emotion/css';
@Component({
  selector: 'leo-base',
  templateUrl: './base.component.html',
  styleUrls: ['../../styles/base.styles.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit {
  constructor() {}

  @HostBinding('class') classContainer!: string;
  ngOnInit(): void {
    this.classContainer = this.resolveClasseContainer();
  }

  private resolveClasseContainer() {
    return cx({ container: true });
  }
}
