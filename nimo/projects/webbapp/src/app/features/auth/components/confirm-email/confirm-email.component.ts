import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  Component,
  OnInit,
  HostBinding,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as authActions from '../../actions/auth.actions';
import { LoadingService } from '../../../../core/ui/loading/loading.service';
@Component({
  selector: 'leo-confirm-email',
  templateUrl: './confirm-email.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
@UntilDestroy()
export class ConfirmEmailComponent implements OnInit {
  @HostBinding('class') class_ = 'box';
  code: FormControl = new FormControl('');
  constructor(private store: Store<State>, private loading: LoadingService) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.code.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      this.loading.show('Cargando...');
      this.store.dispatch(authActions.comproateCode({ code: val }));
    });
  }
}
