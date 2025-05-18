import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CollectionTypeEnum } from '../enums/collection-type.enum';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token }
    }
  }

  private mapToUsers(result: any[]): User[] {
    return result.map((user: User) => {
      return new User(user.name, user.email, '', user.img, user.role, user.google, user.uid)
    });
  }

  searchByType(type: CollectionTypeEnum, value: string) {
    const url = `${base_url}/all/collection/${type}/${value}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (type) {
            case CollectionTypeEnum.Users:
              return this.mapToUsers(resp.result);

            case CollectionTypeEnum.Hospitals:
              return [];
              break;

            case CollectionTypeEnum.Doctors:
              return [];
              break;

            default:
              return [];
          }

        })
      )
  }

}
