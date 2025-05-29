import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token }
    }
  }

  getHospitals() {
    return this.http.get<{ ok: boolean, hospitals: Hospital[] }>(`${base_url}/hospitals`, this.headers)
      .pipe(
        map((resp) => {
          return resp.hospitals
        })
      )
  }

  createHospital(name: string) {
    return this.http.post<{ ok: boolean, hospital: Hospital }>(`${base_url}/hospitals`, { name }, this.headers)
      .pipe(
        map(resp => resp.hospital)
      );
  }

  updateHospital(hospital: Hospital) {
    return this.http.put<{ ok: boolean, hospital: Hospital }>(`${base_url}/hospitals/${hospital._id}`, hospital, this.headers)
      .pipe(
        map((resp) => resp.hospital)
      );
  }

  deleteHospital(_id: string) {
    return this.http.delete(`${base_url}/hospitals/${_id}`, this.headers);
  }
}
