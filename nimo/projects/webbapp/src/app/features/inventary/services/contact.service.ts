import { Observable } from 'rxjs';
import { IProduct, IContact } from './../models/index';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CURRENTBUSINESS } from '../libs/tokens';

@Injectable()
export class ContactService {
  private readonly apiurl = environment.apiUrl.concat('api/contact/');
  constructor(
    private http: HttpClient,
    @Inject(CURRENTBUSINESS) private business: number
  ) {}
  public createContact(contact: Partial<IContact>) {
    let url = this.apiurl;
    contact = {
      ...contact,
      business: this.business
    };
    return this.http.post(url, contact) as Observable<IContact>;
  }
  public editContact(contact: IContact) {
    let url = this.apiurl.concat(`${contact.id}/`);

    return this.http.put(url, contact) as Observable<IContact>;
  }
  public getContacts() {
    let url = this.apiurl;

    return this.http.get(url) as Observable<IContact[]>;
  }
  public deleteContact(contact: IContact) {
    let url = this.apiurl.concat(`${contact.id}/`);
    return this.http.delete(url);
  }
}
