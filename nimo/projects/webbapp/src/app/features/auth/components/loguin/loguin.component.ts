import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'leo-loguin',
  templateUrl: './loguin.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoguinComponent implements OnInit {
  constructor() {}
  @HostBinding('class') class_ = 'box';

  ngOnInit(): void {}
}
