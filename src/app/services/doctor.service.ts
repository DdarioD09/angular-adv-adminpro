import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token }
    }
  }

  getDoctors() {
    return this.http.get<{ ok: boolean, doctors: Doctor[] }>(`${base_url}/doctors`, this.headers)
      .pipe(
        map((resp) => resp.doctors)
      )
  }

  getDoctorById(id: string) {
    const url = `${base_url}/doctors/${id}`
    return this.http.get<{ ok: boolean, doctor: Doctor }>(url, this.headers)
      .pipe(
        map((resp) => resp.doctor)
      )
  }

  createDoctor(doctor: { name: string, hospital: string }) {
    const url = `${base_url}/doctors`;
    return this.http.post<{ ok: boolean, doctor: Doctor }>(url, doctor, this.headers)
      .pipe(map(resp => resp.doctor));
  }

  updateDoctor(doctor: Doctor) {
    const url = `${base_url}/doctors/${doctor._id}`
    return this.http.put<{ ok: boolean, updatedDoctor: Doctor }>(url, doctor, this.headers)
      .pipe(
        map((resp) => resp.updatedDoctor)
      );
  }

  deleteDoctor(_id: string) {
    return this.http.delete(`${base_url}/doctors/${_id}`, this.headers);
  }
}
