import { take } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectRawBusiness } from '../../reducers';
import { FormBuilder } from '@angular/forms';
import * as businessActions from '../../actions/business.actions';
import { loadAll } from '../../actions/router.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectedWorkingBusiness } from '../../reducers';
import { CURRENTBUSINESS } from '../../libs/tokens';
import { ChangeDetectorRef } from '@angular/core';
import { TokenService } from '../../../auth/services/token.service';
@Component({
  selector: 'leo-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class BaseComponent implements OnInit {
  business$ = this.store.select(selectRawBusiness);

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    @Inject(CURRENTBUSINESS) private business: number,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService
  ) {}
  selectBusinessControl = this.fb.control('');
  ngOnInit(): void {
    this.prepareBusiness();
    this.store
      .select(selectedWorkingBusiness)
      .pipe(take(1))
      .subscribe(d => {
        this.selectBusinessControl.setValue(d);
        this.cdr.markForCheck();
      });
    this.selectBusinessControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(val => {
        this.store.dispatch(
          businessActions.selectedWorkingBusiness({ id: val })
        );
        this.store.dispatch(loadAll());
      });
  }

  public logout() {
    this.tokenService.logout();
  }
  public prepareBusiness() {
    this.store.dispatch(businessActions.loadAllBusiness());
    if (this.business != -1) {
      this.store.dispatch(
        businessActions.selectedWorkingBusiness({ id: this.business })
      );
      this.store.dispatch(loadAll());
    }
  }
}
