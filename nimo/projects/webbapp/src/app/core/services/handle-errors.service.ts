import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { get, isArray, isObject, isUndefined, isNull } from 'lodash';
import { LoadingService } from '../ui/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {
  constructor(
    private modalService: NzModalService,
    private loading: LoadingService
  ) {}
  private prepareError(source: unknown) {
    const defaultError = 'Error desconocido';
    let allErrors = [];
    if (typeof source == 'string') {
      allErrors.push(source);
    }
    if (isArray(source)) {
      allErrors.push(...source);
    } else if (isObject(source)) {
      Object.keys(source).forEach(key => {
        allErrors.push(`${get(source, key)}`);
      });
    }

    if (allErrors.length == 0) {
      allErrors = [defaultError];
    }
    return `
       ${allErrors.join('\n')}
    `;
  }

  public manageErrors(errorResponse: HttpErrorResponse) {
    this.loading.hide();
    let error = get(errorResponse, 'error');
    const status = get(errorResponse, 'status', -1);
    const is500 = status == 500;
    let header = 'Error';
    switch (status) {
      case 401:
        header = 'Acceso denegado';
        break;
      case 500:
        header = 'Error de sistema';
        break;
      case 400:
        header = 'Error';
    }

    this.modalService.error({
      nzTitle: header,
      nzContent: is500 ? '<p>Error de sistema</p>' : this.prepareError(error),
      nzCentered: true
    });
    window.dispatchEvent(new Event('resize'));
  }
}
