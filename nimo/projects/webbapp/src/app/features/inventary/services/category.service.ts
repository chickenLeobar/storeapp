import { map, tap } from 'rxjs/operators';
import { IBrand, ICategory } from './../models/index';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
  private apiurl = environment.apiUrl.concat('api/category/');
  constructor(private http: HttpClient) {}
  // create category
  public createCategory(category: ICategory): Observable<ICategory> {
    let url = this.apiurl;
    // FIXME: temporal id  for every categories, until ready business CRUD
    category = {
      ...category,
      business: 8
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
    // FIXME: temporal id  for every categories, until ready business CRUD
    category = {
      ...category,
      business: 8
    };
    return this.http.put(url, category) as Observable<ICategory>;
  }
}
