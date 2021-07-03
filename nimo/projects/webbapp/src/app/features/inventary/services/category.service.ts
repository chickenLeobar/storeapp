import { IBrand, ICategory } from './../models/index';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CURRENTBUSINESS } from '../libs/tokens';

@Injectable()
export class CategoryService {
  private apiurl = environment.apiUrl.concat('api/category/');
  constructor(
    private http: HttpClient,
    @Inject(CURRENTBUSINESS) private business: number
  ) {}
  // create category
  public createCategory(category: ICategory): Observable<ICategory> {
    let url = this.apiurl;
    category = {
      ...category,
      business: this.business
    };
    return this.http.post(url, category) as Observable<ICategory>;
  }
  // get category
  public getCategories(query: string): Observable<ICategory[]> {
    let url = this.apiurl;
    let params = new HttpParams().set('keyword', query);
    return this.http.get(url, { params }) as Observable<ICategory[]>;
  }
  // delete category
  public deleteCategory(id: number) {
    let url = this.apiurl.concat(`${id}/`);
    return this.http.delete(url);
  }
  // edit category
  public editCategorie(category: ICategory): Observable<ICategory> {
    let url = this.apiurl.concat(`${category.id}/`);
    category = {
      ...category,
      business: this.business
    };
    return this.http.put(url, category) as Observable<ICategory>;
  }
}
