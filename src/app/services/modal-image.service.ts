import { EventEmitter, Injectable } from '@angular/core';

import { CollectionType } from '../types/collection.type';
import { environment } from '../../environments/environment';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  private _hideModal = true;
  public imgUrl !: string;
  public id!: string;
  public type!: CollectionType;

  public imageUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hideModal(): boolean {
    return this._hideModal;
  }

  openModal(type: CollectionType, id: string, img: string = 'no-img') {
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
