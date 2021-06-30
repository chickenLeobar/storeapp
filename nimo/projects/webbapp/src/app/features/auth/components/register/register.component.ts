import { IUser } from './../../models';
import {
  Component,
  OnInit,
  HostBinding,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as authActions from '../../actions/auth.actions';
import { LoadingService } from '../../../../core/ui/loading/loading.service';
@Component({
  selector: 'leo-register',
  templateUrl: './register.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private loading: LoadingService
  ) {}
  public form: FormGroup = new FormGroup({
    nombres: this.fb.control(''),
    apellidos: this.fb.control(''),
    celular: this.fb.control(''),
    email: this.fb.control(''),
    password: this.fb.control('')
  });

  @HostBinding('class') class_ = 'box';

  ngOnInit(): void {
    // this.form.patchValue({
    //   nombres: 'Elmer Joselito',
    //   apellidos: 'León Barboza',
    //   celular: '987654321',
    //   email: 'usatloqueando@gmail.com',
    //   password: 'alfk3458'
    // });
  }

  public register() {
    let user = this.form.value as IUser;
    this.loading.show('Cargando...');
    this.store.dispatch(authActions.register({ user: user }));
  }
}
