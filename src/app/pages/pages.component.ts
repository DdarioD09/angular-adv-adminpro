import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  year = new Date().getFullYear();

  constructor(private settingsServices: SettingsService, private sidebarService: SidebarService) { }

  ngOnInit() {
    customInitFunctions();
    this.sidebarService.loadMenu();
  }

}
