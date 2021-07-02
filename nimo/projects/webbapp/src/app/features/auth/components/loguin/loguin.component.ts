import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as authActions from '../../actions/auth.actions';
import { Validators } from '@angular/forms';

@Component({
  selector: 'leo-loguin',
  templateUrl: './loguin.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoguinComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required])
  });
  constructor(private fb: FormBuilder, private store: Store<State>) {}
  @HostBinding('class') class_ = 'box';

  ngOnInit(): void {}

  public loguin() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.store.dispatch(authActions.loguin({ email, password }));
    }
  }
}
