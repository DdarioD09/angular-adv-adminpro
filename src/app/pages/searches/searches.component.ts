import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searchs',
  templateUrl: './searches.component.html',
  styles: ``
})
export class SearchesComponent implements OnInit {
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];
  public users: User[] = [];

  constructor(private activatedRoute: ActivatedRoute, private searchService: SearchService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ value }) => {
        this.searchAll(value)
      })

  }

  searchAll(value: string) {
    this.searchService.searchAll(value)
      .subscribe((resp: any) => {
        console.log(resp)
        this.doctors = resp.doctors;
        this.hospitals = resp.hospitals;
        this.users = resp.users;
      });
  }

}
