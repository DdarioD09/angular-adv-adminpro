import { EventEmitter, Injectable } from '@angular/core';

import { CollectionTypeEnum } from '../enums/collection-type.enum';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  private _hideModal = true;
  public imgUrl !: string;
  public id!: string;
  public type!: CollectionTypeEnum;

  public imageUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  get hideModal(): boolean {
    return this._hideModal;
  }

  openModal(type: CollectionTypeEnum, id: string, img: string = 'no-img') {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    if (img.includes('http')) {
      this.imgUrl = img;
    } else {
      this.imgUrl = `${base_url}/upload/${this.type}/${img}`;
    }
  }

  closeModal() {
    this._hideModal = true;
  }

}
