import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import ValidePassword from 'password-validator';

const schema = new ValidePassword();

schema.is().max(100);
// .is()
// .min(8)
// .has()
// .uppercase()
// .has()
// .not()
// .spaces();

export class MyCustomValidators {
  static verifyPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const value = control.value;
      const respPassord: string[] = schema.validate(value, {
        list: true
      }) as string[];
      if (respPassord.length === 0) {
        return {};
      }
      const error = respPassord.shift();
      switch (error) {
        case 'min': {
          return { password: 'Se deben ingresar minimo 8 caracteres' };
        }
        case 'uppercase': {
          return { password: 'Debe incluir al menos una mayúscula' };
        }
        case 'spaces': {
          return { password: 'No puede incluir espacios' };
        }
      }
      return {};
    };
  }
}
