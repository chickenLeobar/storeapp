import { MyCustomValidators } from './../../../../core/helpers/Validators';
import { IUser } from './../../models';
import {
  Component,
  OnInit,
  HostBinding,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as authActions from '../../actions/auth.actions';
import { LoadingService } from '../../../../core/ui/loading/loading.service';
import { NzMessageService } from 'ng-zorro-antd/message';
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
    private loading: LoadingService,
    private message: NzMessageService
  ) {}

  public confirmValidator = (control: AbstractControl): ValidationErrors => {
    if (!control.value) {
      return {
        error: true,
        required: true
      };
    } else if (control.value != this.form?.get('password')?.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  public form: FormGroup = new FormGroup({
    nombres: this.fb.control('', [Validators.required]),
    apellidos: this.fb.control('', [Validators.required]),
    celular: this.fb.control('', [
      Validators.pattern(
        new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      )
    ]),
    email: this.fb.control('', Validators.email),
    password: this.fb.control('', [MyCustomValidators.verifyPassword()]),
    verifyPassword: this.fb.control('', [this.confirmValidator])
  });

  @HostBinding('class') class_ = 'box';

  ngOnInit(): void {
    this.form.patchValue({
      nombres: 'Elmer Joselito',
      apellidos: 'León Barboza',
      celular: '987654321',
      email: 'usatloqueando@gmail.com',
      password: 'alfk3458',
      verifyPassword: 'alfk3458'
    });
  }

  public register() {
    let user = this.form.value as IUser;
    if (this.form.valid) {
      this.loading.show('Cargando...');
      this.store.dispatch(authActions.register({ user: user }));
    } else {
      console.log('here');
      this.message.error('Ingrese Correctamente los datos');
    }
  }
}
