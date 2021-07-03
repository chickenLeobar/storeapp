// get current bussiness of localStorage
import { InjectionToken } from '@angular/core';

export const CURRENTBUSINESS = new InjectionToken('BUSINESS', {
  providedIn: 'root',
  factory: () => {
    const business = localStorage.getItem('business');

    return business ? Number(business) : -1;
  }
});
