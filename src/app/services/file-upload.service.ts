import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CollectionTypeEnum } from '../enums/collection-type.enum';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})


export class FileUploadService {

  constructor() { }

  async updatePicture(file: File, type: CollectionTypeEnum, id: string) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      })
      const data = await resp.json();

      if (data.ok) {
        return data.fileName;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
