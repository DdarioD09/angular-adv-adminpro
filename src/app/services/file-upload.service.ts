import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CollectionType } from '../types/collection.type';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})


export class FileUploadService {

  constructor() { }

  async updatePicture(file: File, type: CollectionType, id: string) {
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
