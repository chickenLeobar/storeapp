import {
  Component,
  OnInit,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import { get } from 'lodash';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

const colors = {
  primary: '#096dd9',
  secondary: '#262626'
};

@Component({
  selector: 'sta-badge',
  templateUrl: './badgenums.component.html',
  styleUrls: ['./badge.styles.scss']
})
export class BadgenumsComponent implements OnInit, OnChanges {
  _color!: string;

  @Input() title: string | TemplateRef<NzSafeAny> = '';

  @Input() content: string | TemplateRef<NzSafeAny> = '';

  @HostBinding('style.--bg') private bgColor = this._color;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    const { color } = changes;
    if (color && color.currentValue) {
      this.bgColor = this.color;
    }
  }

  @Input() set color(v: string) {
    if (typeof v == 'string' && v.substr(0) == '#') {
      this._color = v;
    } else {
      const color = get(colors, v);
      this._color = color;
    }
  }
  get color() {
    return this._color;
  }

  ngOnInit(): void {}
}
