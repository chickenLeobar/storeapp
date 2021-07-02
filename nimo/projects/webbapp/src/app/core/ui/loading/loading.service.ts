import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Injectable, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Subject } from 'rxjs';
export type MessageType = string | TemplateRef<NzSafeAny>;

@Injectable()
export class LoadingService {
  private message$ = new BehaviorSubject<MessageType>('Cargando...');

  private visble: boolean = false;

  public message = this.message$.asObservable();

  constructor(private internalLoading: NgxSpinnerService) {}

  public get isVisible() {
    return this.visble;
  }

  // show
  public show(message?: MessageType): void {
    if (message) {
      this.message$.next(message);
    }
    this.internalLoading.show();
    this.visble = true;
  }
  // hide
  public hide() {
    this.visble = false;
    this.internalLoading.hide();
  }
}
