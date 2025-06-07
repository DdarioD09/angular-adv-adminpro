import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private menu = new BehaviorSubject<any[]>([]);

  get menu$() {
    return this.menu.asObservable();
  }

  loadMenu() {
    const menu = localStorage.getItem('menu')
    if (menu) {
      this.menu.next(JSON.parse(menu));
    }
  }
}
