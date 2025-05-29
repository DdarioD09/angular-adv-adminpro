import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: ``
})
export class DoctorComponent implements OnInit {
  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public doctorSelected !: Doctor;
  public hospitalSelected!: Hospital;
  public isLoading = true;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalImageService: ModalImageService
  ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.activatedRoute.params.subscribe(({ id }) => this.loadDoctor(id));
    this.loadHospitals();
    this.getHospitalSelected();
    this.modalImageService.imageUpdated.subscribe(img => img && (this.doctorSelected.img = img));
  }

  loadDoctor(id: string) {
    if (id === 'new') {
      this.isLoading = false;
      return;
    }

    this.doctorService.getDoctorById(id)
      .pipe(delay(100))
      .subscribe({
        next: (doctor) => {
          const { name, hospital } = doctor
          this.doctorForm.setValue({ name, hospital: hospital?._id });
          this.doctorSelected = doctor
          this.isLoading = false;
        },
        error: () => this.router.navigateByUrl('dashboard/doctors')
      })
  }

  loadHospitals() {
    this.hospitalService.getHospitals()
      .subscribe((hospitals: Hospital[]) => this.hospitals = hospitals)
  }

  getHospitalSelected() {
    const hospital = this.doctorForm.get('hospital');
    if (hospital) {
      hospital.valueChanges.subscribe(hospitalId => {
        this.hospitalSelected = this.hospitals.find(h => h._id === hospitalId) as Hospital;
      })
    }

  }

  saveDoctor() {
    if (this.doctorSelected) {
      const data = { _id: this.doctorSelected._id, ...this.doctorForm.value }
      this.doctorService.updateDoctor(data)
        .subscribe(doctor => {
          Swal.fire('Doctor Updated', `The doctor ${doctor.name} has been updated`, 'success')
          this.router.navigateByUrl(`/dashboard/doctor/${doctor._id}`)
        })
    } else {
      this.doctorService.createDoctor(this.doctorForm.value)
        .subscribe(doctor => {
          Swal.fire('Doctor Created', `The doctor ${doctor.name} has been created successfully`, 'success')
          this.router.navigateByUrl(`/dashboard/doctor/${doctor._id}`)
        })
    }
  }

  openImageModal() {
    const { _id, img } = this.doctorSelected;
    this.modalImageService.openModal('doctors', _id as string, img)
  }

}
