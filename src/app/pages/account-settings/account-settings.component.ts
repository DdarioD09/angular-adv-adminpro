import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: ``
})
export class AccountSettingsComponent implements OnInit {
  links!: NodeListOf<Element>;

  constructor(private settingsServices: SettingsService) { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.settingsServices.checkCurrentTheme(this.links);
  }

  changeTheme(theme: string): void {
    this.settingsServices.changeTheme(theme);
    this.settingsServices.checkCurrentTheme(this.links);
  }
}
