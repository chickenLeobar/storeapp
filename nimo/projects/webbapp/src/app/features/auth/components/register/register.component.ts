import {
  Component,
  OnInit,
  HostBinding,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'leo-register',
  templateUrl: './register.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  constructor() {}

  @HostBinding('class') class_ = 'box';

  ngOnInit(): void {}
}
