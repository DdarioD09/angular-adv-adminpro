import { Pipe, PipeTransform } from '@angular/core';

import { CollectionType } from '../types/collection.type';
import { environment } from 'src/environments/environment';

const base_url = environment.apiUrl;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string = '', type: CollectionType): string {
    if (!img) {
      return `${base_url}/upload/${type}/no-image`;
    }
    return `${base_url}/upload/${type}/${img}`;
  }

}
